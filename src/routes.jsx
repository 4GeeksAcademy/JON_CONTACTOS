import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';

import Layout     from './pages/Layout.jsx';
import Home       from './pages/Home.jsx';
import Contact    from './pages/ContactList.jsx';
import AddContact from './pages/AddContact.jsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>404: No encontrado</h1>}>
      <Route index element={<Home />} />
      <Route path="contacts" element={<Contact />} />
      <Route path="add"      element={<AddContact />} />
      <Route path="edit/:id" element={<AddContact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);
