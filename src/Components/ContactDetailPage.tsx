import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../store";
import { updateContact, deleteContact } from "../store/contactsSlice";
import { Contact } from "../types/contact";

const ContactDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contact = useSelector((state: RootStore) =>
    state.contacts.find((c) => c.id === Number(id))
  );
  const [editedContact, setEditedContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (contact) {
      setEditedContact(contact);
    }
  }, [contact]);

  if (!editedContact) {
    return (
      <div className="container mx-auto p-4 bg-black text-white">
        Contact not found
      </div>
    );
  }

  const handleUpdate = () => {
    if (editedContact) {
      dispatch(updateContact(editedContact));
      navigate("/contacts");
    }
  };

  const handleDelete = () => {
    dispatch(deleteContact(editedContact.id));
    navigate("/contacts");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={editedContact.name}
            onChange={(e) =>
              setEditedContact({ ...editedContact, name: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={editedContact.email}
            onChange={(e) =>
              setEditedContact({ ...editedContact, email: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            value={editedContact.phone}
            onChange={(e) =>
              setEditedContact({ ...editedContact, phone: e.target.value })
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleUpdate}
          >
            Update Contact
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleDelete}
          >
            Delete Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;
