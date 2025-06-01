import React from "react";

export default function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message}</p>
        <button onClick={onConfirm}>Sí, borrar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
