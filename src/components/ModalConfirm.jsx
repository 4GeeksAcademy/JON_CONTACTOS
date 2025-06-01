// src/components/ModalConfirm.jsx
import React from "react";

export default function ModalConfirm({ 
  show, 
  title = "Atención", 
  message = "¿Estás seguro?", 
  onCancel, 
  onConfirm 
}) {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onCancel}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <p>{message}</p>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
