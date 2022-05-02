import React from "react";
import PropTypes from "prop-types";
import ContactItem from "../ContactItem";
import { List, Button, Notification, ContactListStyles } from "./ContactList.styled";

 const ContactList = ({ contacts, filter, deleteContact }) => {
  
  const filteredContacts = () => {
       if (contacts) {
      const normalizedFilter = filter.toLowerCase();
      const getFilteredContacts = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(normalizedFilter) ||
          contact.phone.includes(normalizedFilter)
      );
      return getFilteredContacts;
    }
  };

  const getFilteredContacts = filteredContacts();
   
  return (
    <ContactListStyles>
      {contacts.length === 0 ? (
        <Notification>No contacts added yet</Notification>
      ) : (
        <List>
          {getFilteredContacts.length === 0 ? (
            <p>Contact not found</p>
          ) : (
            getFilteredContacts.map((contact) => (
              <ContactItem key={contact.id} {...contact}>
               <span>
               {contact.name}: {contact.phone}
                 </span> 
              <Button onClick={() => deleteContact(contact.id)}>
                Delete
                </Button>
              </ContactItem>
            ))
          )}


          
        </List>
      )}
    </ContactListStyles>
  );
};


ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList ;
