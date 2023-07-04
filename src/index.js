import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WebSocketProvider } from './context/webSocketContext'
import { ModalProvider } from './context/modalContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WebSocketProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </WebSocketProvider>
);
