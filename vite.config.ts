import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import { syncDrivePortfolio, getDriveStatus } from './src/utils/driveSync.ts';

// Local Vite dev middleware plugin to handle /api routes without requiring a separate server process
function localApiPlugin(): Plugin {
  return {
    name: 'local-api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/drive/portfolio', async (req, res) => {
        try {
          const url = new URL(req.url || '', 'http://localhost');
          const refresh = url.searchParams.get('refresh') === '1' || url.searchParams.get('refresh') === 'true';
          const data = await syncDrivePortfolio(refresh);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err?.message || 'Drive sync failed' }));
        }
      });

      server.middlewares.use('/api/drive/status', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(getDriveStatus()));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localApiPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  define: {
    'process.env': {},
  },
});
