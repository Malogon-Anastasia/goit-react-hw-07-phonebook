// import React, { useState, useEffect } from "react";
import Section from "./Components/Section";
import ContactForm from "./Components/ContactForm";
import ContactList from "./Components/ContactList";
import { nanoid } from "nanoid";
import toast, { Toaster } from "react-hot-toast";
import Filter from "./Components/Filter";
import { useSelector, useDispatch } from "react-redux";
// import { addContact, deleteContact } from "./redux/sliceContacts";
import { changeFilter } from "./redux/sliceFilter";
import { useFetchContactsQuery, useCreateContactMutation, useRemoveContactMutation } from "./redux/sliceContacts";

export const App = () => {
  const contacts = useSelector((state) => state.items);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { data } = useFetchContactsQuery();
  const [createContact] = useCreateContactMutation();
  const [onRemoveContact] = useRemoveContactMutation();
  

  const onHandleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const contactName = event.target.elements.name.value;
    const contactPhone = event.target.elements.number.value;
    const isNameInContacts = data.find(
      (element) => element.name === contactName
    );

    if (isNameInContacts) {
      const notify = () => toast.error(`${contactName} has been added already`);

      notify();
      form.reset();
      return;
    }

    const newContact = {
      id: nanoid(),
      name: contactName,
      number: contactPhone,
    };
    createContact(newContact);
    // dispatch(addContact(newContact));
    form.reset();
  };

  const onSearchInput = (event) => {
    const inputValue = event.target.value;

    dispatch(changeFilter(inputValue));
  };

  const filteredContacts = getFilteredContacts();
  function getFilteredContacts() {
    const normalizedFilter = filter.toLowerCase();
    const flatContacts = contacts.flat(Infinity);

    const filteredContacts = flatContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );

    return filteredContacts;
  }


  const contactId = nanoid();
  const numberId = nanoid();

  // const deletedContact = (id) => {
  //   dispatch(deleteContact(id));
  // };
  return (
    <>
      <Section title="Phonebook">
        <ContactForm
          contactId={contactId}
          numberId={numberId}
          handleSubmit={onHandleSubmit}
        />
      </Section>

      <Section title="Contacts">
        <Filter onSearchInput={onSearchInput} value={filter} />
        <ContactList
          contacts={data}
          filteredContacts={filteredContacts}
          deleteContact={onRemoveContact}
        />
      </Section>
      <Toaster />
    </>
  );
};

export default App;
