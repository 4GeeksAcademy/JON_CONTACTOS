// src/components/ContactCard.jsx
import React, { useContext } from 'react';
import { ContactContext } from '../context/ContactContext.jsx';
import { Link } from 'react-router-dom';

// Importamos los iconos que usaremos desde react-icons
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

export default function ContactCard({ contact }) {
  const { deleteContact } = useContext(ContactContext);

  return (
    <div className="contact-card">
      {/* Contenedor de la foto (avatar) */}
      <div className="card-avatar">
        {/* Si tu API tuviera URL de imagen, la colocarías aquí. 
            Por simplicidad, vamos a usar una imagen de ejemplo fija. */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
          alt="Avatar"
        />
      </div>

      {/* Contenedor de la información textual */}
      <div className="card-info">
        <h3 className="contact-name">{contact.name}</h3>

        {contact.address && (
          <div className="contact-line">
            <FaMapMarkerAlt className="icon" />
            <span className="info-text">{contact.address}</span>
          </div>
        )}

        {contact.phone && (
          <div className="contact-line">
            <FaPhoneAlt className="icon" />
            <span className="info-text">{contact.phone}</span>
          </div>
        )}

        {contact.email && (
          <div className="contact-line">
            <FaEnvelope className="icon" />
            <span className="info-text">{contact.email}</span>
          </div>
        )}
      </div>

      {/* Contenedor de los botones de acción (editar / borrar) */}
      <div className="card-actions">
        <Link to={`/edit/${contact.id}`} className="action-btn edit-btn" title="Editar">
          <FaPencilAlt />
        </Link>
        <button
          className="action-btn delete-btn"
          onClick={() => deleteContact(contact.id)}
          title="Eliminar"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}
