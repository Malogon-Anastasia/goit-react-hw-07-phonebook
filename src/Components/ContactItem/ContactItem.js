import PropTypes from "prop-types";
import {ListItem, ContactButton } from "./ContactItem.styled";
import { useRemoveContactMutation } from "../../redux/sliceContacts";

const ContactItem = ({ name, phone, id }) => {
 const [deleteContact, {isLoading}] = useRemoveContactMutation();

 return (
  <ListItem>
    <span>
      {name} : {phone}
    </span>
    <ContactButton
      onClick={() => {deleteContact(id)}}>{isLoading ? 'Deleting...' : 'delete'}
    </ContactButton>
  </ListItem>

 )
  }
 

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  
};

export default ContactItem;
