import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/contacts">Contactos</Link>
        <Link to="/add">Añadir</Link>
      </nav>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        Made with ❤️ by 4Geeks Academy
      </footer>
    </>
  );
}
