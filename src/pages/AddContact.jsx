// src/pages/AddContact.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContactContext } from '../context/ContactContext.jsx';

export default function AddContact() {
  const { contacts, addContact, updateContact } = useContext(ContactContext);
  const [form, setForm] = useState({
    full_name: '',
    email:     '',
    phone:     '',
    address:   ''
  });
  const { id } = useParams();      // si existe, estamos en modo edición
  const navigate = useNavigate();

  // Precargar datos si estamos editando
  useEffect(() => {
    if (id) {
      // Localizamos el contacto cuya id coincide
      const existing = contacts.find(c => String(c.id) === id);
      if (existing) {
        setForm({
          full_name: existing.name || '',
          email:     existing.email || '',
          phone:     existing.phone || '',
          address:   existing.address || ''
        });
      }
    }
  }, [id, contacts]);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) Validaciones mínimas
    if (!form.full_name.trim()) {
      alert('El nombre completo es obligatorio');
      return;
    }
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(form.email)) {
      alert('Introduce un email válido');
      return;
    }

    try {
      if (id) {
        // Modo edición
        await updateContact(id, form);
      } else {
        // Modo creación
        await addContact(form);
      }
      // Volvemos a la lista
      navigate('/contacts');
    } catch (err) {
      console.error('handleSubmit detectó un error:', err);
      // El mensaje de error ya se está seteando en ContactContext (setError)
      // Aquí podrías mostrar alguna alerta si lo deseas.
    }
  };

  return (
    <div className="add-edit-page">
      <h2>{id ? 'Editar Contacto' : 'Añadir Contacto'}</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Dirección"
        />
        <button type="submit" className="btn-save">
          {id ? 'Guardar Cambios' : 'Guardar Contacto'}
        </button>
      </form>
    </div>
  );
}
