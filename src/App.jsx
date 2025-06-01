import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ContactProvider } from './context/ContactContext';
import Contacts     from './pages/Contacts';
import AddContact   from './pages/AddContact';

export default function App() {
  return (
    <ContactProvider>
      <BrowserRouter>
        <nav>
          <Link to="/contacts">Contactos</Link> | 
          <Link to="/add">Añadir</Link>
        </nav>
        <Routes>
          <Route path="/"         element={<Navigate to="/contacts" replace />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/add"      element={<AddContact />} />
          <Route path="/edit/:id" element={<AddContact />} />
          <Route path="*"         element={<h2>404</h2>} />
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  );
}
