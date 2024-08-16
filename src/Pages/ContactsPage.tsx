import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { addContact, deleteContact } from "../store/contactsSlice";
import { Contact } from "../types/contact";
import { RootStore } from "../store";
import ContactDetailPage from "../Components/ContactDetailPage";

const ContactsPage: React.FC = () => {
  const contacts = useSelector((state: RootStore) => state.contacts);
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.email && newContact.phone) {
      dispatch(addContact({ id: contacts.length + 1, ...newContact }));
      setNewContact({ name: "", email: "", phone: "" });
      setIsAdding(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Contacts</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
        onClick={() => setIsAdding(true)}
      >
        Add New Contact
      </button>
      {isAdding && (
        <div className="mb-6 bg-gray-100 p-4 rounded">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 mr-2 rounded"
            value={newContact.name}
            onChange={(e) =>
              setNewContact({ ...newContact, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 mr-2 rounded"
            value={newContact.email}
            onChange={(e) =>
              setNewContact({ ...newContact, email: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Phone"
            className="border p-2 mr-2 rounded"
            value={newContact.phone}
            onChange={(e) =>
              setNewContact({ ...newContact, phone: e.target.value })
            }
          />
          <button
            className="bg-green-500 ml-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddContact}
          >
            Save
          </button>
          <button
            className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact: Contact) => (
          <div key={contact.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{contact.name}</h2>
            <p className="text-gray-600 mb-1">{contact.email}</p>
            <p className="text-gray-600 mb-4">{contact.phone}</p>
            <div className="flex justify-end">
              <Link
                to={`/contacts/${contact.id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              >
                View Details
              </Link>
              <button
                type="button"
                onClick={() => dispatch(deleteContact(contact.id))}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Delete Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
