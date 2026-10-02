import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { dbService } from './services/db';

// Migrate any plain-text admin PIN to SHA-256 hash on app start
dbService.migrateAdminPin();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
