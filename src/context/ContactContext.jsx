// src/context/ContactContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ContactContext = createContext();

// Pon aquí el slug EXACTO que tú creaste en Playground.
// Ejemplo: si en Playground usaste POST /agendas/agenda, entonces 'agenda' es el slug.
// Si lo llamaste "JON_AGENDA", ponlo tal cual aquí:
const AGENDA_SLUG = 'agenda';

// VITE redirige '/api/contact' ⇒ 'https://playground.4geeks.com/contact'
const BASE_URL = `/api/contact/agendas/${AGENDA_SLUG}/contacts`;

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  // 1) Leer todos los contactos de la agenda
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(BASE_URL, {
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();

      // Extraer un array de datos (puede venir como [] directo, o bien data.contacts, o data.data)
      let arr = [];
      if (Array.isArray(data)) {
        // Si devolvió un array puro
        arr = data;
      } else if (Array.isArray(data.contacts)) {
        // Si devolvió { contacts: [ ... ] }
        arr = data.contacts;
      } else if (Array.isArray(data.data)) {
        // Si devolvió { data: [ ... ] }
        arr = data.data;
      }
      // Si hay otro envoltorio distinto, añádelo aquí

      setContacts(arr);
    } catch {
      setError('No se pudieron cargar los contactos');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // 2) Crear un nuevo contacto (POST)
  const addContact = async (contact) => {
    setLoading(true);
    setError(null);
    try {
      // La API espera { name, email, phone?, address? } (nunca full_name)
      const payload = {
        name:  contact.full_name,
        email: contact.email
      };
      if (contact.phone && contact.phone.trim() !== '') {
        payload.phone = contact.phone;
      }
      if (contact.address && contact.address.trim() !== '') {
        payload.address = contact.address;
      }

      console.log('>> Payload que se envía al servidor:', payload);

      const res = await fetch(BASE_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      });

      if (res.status === 422) {
        const errData = await res.json();
        console.warn(
          'Detalle exacto que devuelve la API (422):',
          JSON.stringify(errData.detail, null, 2)
        );
        throw new Error('Datos de contacto inválidos (422)');
      }
      if (!res.ok) throw new Error(res.statusText);

      // Si el POST funcionó, recargamos la lista
      await fetchContacts();
    } catch (e) {
      console.error(e);
      setError('No se pudo crear el contacto');
      // Lanzamos de nuevo para que quien llamó a addContact pueda capturarlo
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // 3) Actualizar un contacto (PUT)
  const updateContact = async (id, contact) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name:  contact.full_name,
        email: contact.email
      };
      if (contact.phone && contact.phone.trim() !== '') {
        payload.phone = contact.phone;
      }
      if (contact.address && contact.address.trim() !== '') {
        payload.address = contact.address;
      }

      console.log('>> Payload de actualización:', payload);

      const res = await fetch(`${BASE_URL}/${id}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      });

      if (res.status === 422) {
        const errData = await res.json();
        console.warn(
          'Detalle exacto que devuelve la API (PUT 422):',
          JSON.stringify(errData.detail, null, 2)
        );
        throw new Error('Datos inválidos al actualizar (422)');
      }
      if (!res.ok) throw new Error(res.statusText);

      await fetchContacts();
    } catch (e) {
      console.error(e);
      setError('No se pudo actualizar el contacto');
      throw new Error('Error al actualizar contacto');
    } finally {
      setLoading(false);
    }
  };

  // 4) Eliminar un contacto (DELETE)
  const deleteContact = async (id) => {
    if (!window.confirm('¿Estás seguro de borrar este contacto?')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(res.statusText);
      // Removemos localmente
      setContacts(prev => prev.filter(c => c.id !== id));
    } catch {
      setError('No se pudo borrar el contacto');
    } finally {
      setLoading(false);
    }
  };

  // Efecto inicial: leer la lista apenas se monte el Provider
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider value={{
      contacts,
      loading,
      error,
      addContact,
      updateContact,
      deleteContact
    }}>
      {children}
    </ContactContext.Provider>
  );
}
