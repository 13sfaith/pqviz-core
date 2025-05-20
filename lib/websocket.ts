import { WebSocketServer }  from 'ws';

let wss: WebSocketServer | null = null;

export function startWebSocketServer(port = 8080): void {
  wss = new WebSocketServer({ port });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.send(JSON.stringify({ type: 'hello', message: 'Connected to WebSocket server' }));
  });

  console.log(`WebSocket server listening on ws://localhost:${port}`);
}

export function broadcast(message: any): void {
  if (!wss) return;

  const data = typeof message === 'string' ? message : JSON.stringify(message);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
