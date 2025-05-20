import express from 'express';
import { runTrace } from './runner.js';

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to trigger a trace run
app.post('/run', async (req, res) => {
  console.log('Received /run request with config:', req.body);

  try {
    const traceResult = await runTrace(req.body);
    res.json({ success: true, result: traceResult });
  } catch (error: any) {
    console.error('Error running trace:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export function startServer(): void {
  app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
  });
}
