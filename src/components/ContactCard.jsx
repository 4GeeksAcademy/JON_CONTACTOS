// src/components/ContactCard.jsx
import React, { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext.jsx";

// IMPORTA AQUÍ tu avatar genérico desde assets/img
import DefaultAvatar from "../assets/img/default-avatar.png";

// Importa el modal de confirmación
import ModalConfirm from "./ModalConfirm.jsx";

export default function ContactCard({ contact }) {
  const { deleteContact } = useContext(ContactContext);
  const [showModal, setShowModal] = useState(false);

  // Abre el modal
  const openModal = () => setShowModal(true);

  // Cierra el modal
  const closeModal = () => setShowModal(false);

  // Si confirman, llama a la función de borrar y cierra el modal
  const handleConfirmDelete = async () => {
    try {
      await deleteContact(contact.id);
    } catch (error) {
      console.error("Error al borrar contacto:", error);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      {/* --- Tarjeta de Contacto --- */}
      <div className="card mb-3 shadow-sm">
        <div className="row g-0 align-items-center">
          {/* Avatar genérico */}
          <div className="col-auto ps-3 pe-0">
            <img
              src={DefaultAvatar}
              className="rounded-circle"
              alt="Avatar de contacto"
              style={{ width: "64px", height: "64px", objectFit: "cover" }}
            />
          </div>

          {/* Información del contacto */}
          <div className="col">
            <div className="card-body py-2">
              <h5 className="card-title mb-1">{contact.name}</h5>

              <p className="card-text mb-1 text-muted small d-flex align-items-center">
                <i className="fas fa-envelope me-2"></i>
                <span>{contact.email}</span>
              </p>

              {contact.phone && (
                <p className="card-text mb-1 text-muted small d-flex align-items-center">
                  <i className="fas fa-phone me-2"></i>
                  <span>{contact.phone}</span>
                </p>
              )}

              {contact.address && (
                <p className="card-text mb-0 text-muted small d-flex align-items-center">
                  <i className="fas fa-home me-2"></i>
                  <span>{contact.address}</span>
                </p>
              )}
            </div>
          </div>

          {/* Botones de acción: Editar y Eliminar */}
          <div className="col-auto pe-3">
            <div className="d-flex flex-column align-items-center">
              {/* Aquí podrías poner un Link a “/edit/{contact.id}” si tienes esa ruta */}
              <button
                className="btn btn-outline-secondary btn-sm mb-2"
                title="Editar"
              >
                <i className="fas fa-pen"></i>
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={openModal}
                title="Eliminar"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modal de Confirmación --- */}
      <ModalConfirm
        show={showModal}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que quieres eliminar a "${contact.name}"?`}
        onCancel={closeModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
