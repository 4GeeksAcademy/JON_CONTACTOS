// src/pages/Contact.jsx
import React, { useContext } from 'react';
import { ContactContext } from '../context/ContactContext.jsx';
import ContactCard from '../components/ContactCard.jsx';

export default function Contact() {
  const { contacts, loading, error } = useContext(ContactContext);

  if (loading) return <p>Cargando contactos…</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="contacts-page">
      <h2>Lista de Contactos</h2>
      {contacts.length === 0 ? (
        <p>No hay contactos.</p>
      ) : (
        <div className="cards-container">
          {contacts.map(c => (
            <ContactCard key={c.id} contact={c} />
          ))}
        </div>
      )}
    </div>
  );
}
