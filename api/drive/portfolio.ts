import type { IncomingMessage, ServerResponse } from 'http';
import { syncDrivePortfolio } from '../../src/utils/driveSync.ts';

interface VercelRequest extends IncomingMessage {
  query: Record<string, string | string[] | undefined>;
  method?: string;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (data: any) => void;
  send: (data: any) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // Parse query parameter refresh
  let forceRefresh = false;
  if (req.query) {
    const refreshVal = req.query.refresh;
    forceRefresh = refreshVal === '1' || refreshVal === 'true';
  } else if (req.url) {
    const url = new URL(req.url, 'http://localhost');
    forceRefresh = url.searchParams.get('refresh') === '1' || url.searchParams.get('refresh') === 'true';
  }

  try {
    const data = await syncDrivePortfolio(forceRefresh);

    // Cache at Vercel Edge for 60s, stale-while-revalidate for 300s
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    if (typeof res.json === 'function') {
      res.status(200).json(data);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    }
  } catch (error: any) {
    const errorPayload = { error: error?.message || 'Failed to fetch Drive portfolio' };
    if (typeof res.json === 'function') {
      res.status(500).json(errorPayload);
    } else {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(errorPayload));
    }
  }
}
