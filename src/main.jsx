import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.jsx';
import { ContactProvider } from './context/ContactContext.jsx';
import './index.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <ContactProvider>
        <RouterProvider router={router} />
      </ContactProvider>
    </React.StrictMode>
  );
