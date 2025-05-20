import { broadcast } from './websocket.js';

export async function runTrace(config: any): Promise<string> {
  // Fake trace logic
  const traceResult = `Trace completed at ${new Date().toISOString()} with config: ${JSON.stringify(config)}`;

  console.log(traceResult);

  // Push to WebSocket
  broadcast({ type: 'trace', payload: traceResult });

  return traceResult;
}