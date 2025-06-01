// src/components/ContactCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContactContext } from '../context/ContactContext.jsx';

export default function ContactCard({ contact }) {
  const { deleteContact } = useContext(ContactContext);

  return (
    <div className="card">
      <h2>{contact.full_name}</h2>
      <p>✉️ {contact.email}</p>
      {contact.phone   && <p>📞 {contact.phone}</p>}
      {contact.address && <p>🏠 {contact.address}</p>}

      <div className="actions">
        <Link to={`/edit/${contact.id}`} className="btn small">✏️</Link>
        <button
          className="btn small danger"
          onClick={() => deleteContact(contact.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
