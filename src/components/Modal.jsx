// src/components/Modal.jsx
import React from "react";
import ReactDOM from "react-dom";
import "../index.css"; // Asegúrate de que tus estilos globales estén importados

export default function Modal({ isOpen, onClose, onConfirm, title, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {title && <h3 className="modal-title">{title}</h3>}
        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          <button className="btn-modal cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-modal confirm-btn" onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
