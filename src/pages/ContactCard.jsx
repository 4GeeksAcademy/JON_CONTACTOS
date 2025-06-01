// src/pages/ContactCard.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ContactContext } from "../context/ContactContext.jsx";
import Modal from "../components/Modal.jsx";

// Iconos de FontAwesome (importando desde CDN en index.html ya existía)
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export default function ContactCard({ contact }) {
  const { deleteContact } = useContext(ContactContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Construimos la URL para el avatar circular. 
  // Puedes reemplazar esta URL por otra, o usar tu propia API de imágenes:
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    contact.name
  )}&background=random&rounded=true&size=80`;

  // Cuando el usuario confirma en el modal, borramos y cerramos el modal
  const handleConfirmDelete = () => {
    deleteContact(contact.id);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card mb-3 shadow-sm">
        <div className="row g-0 align-items-center">
          {/* Columna de la foto */}
          <div className="col-auto ps-3 pe-0">
            <img
              src={avatarUrl}
              className="rounded-circle"
              alt={`Avatar de ${contact.name}`}
              style={{ width: "64px", height: "64px", objectFit: "cover" }}
            />
          </div>

          {/* Columna de la información */}
          <div className="col">
            <div className="card-body py-2">
              <h5 className="card-title mb-1">{contact.name}</h5>

              {contact.address && (
                <p className="card-text mb-1 text-muted small d-flex align-items-center">
                  <FaMapMarkerAlt className="me-2" />
                  <span>{contact.address}</span>
                </p>
              )}

              {contact.phone && (
                <p className="card-text mb-1 text-muted small d-flex align-items-center">
                  <FaPhoneAlt className="me-2" />
                  <span>{contact.phone}</span>
                </p>
              )}

              {contact.email && (
                <p className="card-text mb-0 text-muted small d-flex align-items-center">
                  <FaEnvelope className="me-2" />
                  <span>{contact.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Columna de los botones de acción */}
          <div className="col-auto pe-3">
            <div className="d-flex flex-column align-items-center">
              <Link
                to={`/edit/${contact.id}`}
                className="btn btn-outline-secondary btn-sm mb-2"
                title="Editar contacto"
              >
                <FaPencilAlt />
              </Link>

              {/* En vez de disparar deleteContact directamente, abrimos el modal */}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => setIsModalOpen(true)}
                title="Eliminar contacto"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar eliminación"
      >
        <p className="mb-0" style={{ fontSize: "1rem" }}>
          ¿Estás seguro de que quieres <strong>eliminar</strong> a <em>{contact.name}</em>?
        </p>
      </Modal>
    </>
  );
}
