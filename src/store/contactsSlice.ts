import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../types/contact";

// Define the initial state
const initialState: Contact[] = JSON.parse(
  localStorage.getItem("contacts") || "[]"
);

// Create the contacts slice
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    //Actions to add new contacts
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
      localStorage.setItem("contacts", JSON.stringify(state));
    },

    //Actions to update existing contacts
    updateContact: (state, action: PayloadAction<Contact>) => {
      const { id, name, email, phone } = action.payload;
      const existingContact = state.find((contact) => contact.id === id);
      if (existingContact) {
        existingContact.name = name;
        existingContact.email = email;
        existingContact.phone = phone;
      }
      localStorage.setItem("contacts", JSON.stringify(state));
    },

    //Actions to delete contacts
    deleteContact: (state, action: PayloadAction<number>) => {
      const newState = state.filter((contact) => contact.id !== action.payload);
      localStorage.setItem("contacts", JSON.stringify(newState));
      return newState;
    },
  },
});

// Export the action creators
export const { addContact, updateContact, deleteContact } =
  contactsSlice.actions;

// Export the reducer
export default contactsSlice.reducer;
