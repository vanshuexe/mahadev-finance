import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { dbService } from './services/db';

// Pages read site data synchronously, so load it from Supabase before the first render.
dbService.ready.finally(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
