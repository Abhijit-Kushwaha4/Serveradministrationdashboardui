
// This file will contain the WebSocket client for persistent AI API connections.

let socket: WebSocket | null = null;

export const connectWebSocket = (url: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    return socket;
  }

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    console.log('WebSocket message received:', event.data);
    // In a real application, you would parse the message and update the UI accordingly.
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
    socket = null;
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return socket;
};

export const sendWebSocketMessage = (message: any) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not connected.');
  }
};
