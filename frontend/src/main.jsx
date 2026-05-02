import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'rgba(5,13,26,0.95)',
            color: '#f0f4ff',
            border: '1px solid rgba(99,179,255,0.25)',
            backdropFilter: 'blur(20px)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.875rem',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#030712' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#030712' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
