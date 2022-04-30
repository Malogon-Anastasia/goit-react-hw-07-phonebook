import PropTypes from "prop-types";
import { ContactButton } from "./ContactItem.styled";
import { useRemoveContactMutation } from "redux/contactsSlice";

const ContactItem = ({ name, number, id }) => {
 const [deleteContact, {isLoading}] = useRemoveContactMutation();
  <>
    <span>
      {name} : {number}
    </span>
    <ContactButton
      onClick={() => {
        deleteContact(id);
        // const notify = () => toast.success(`${name} has succesfully deleted from the phonebook`);
        // notify();
    }}>{isLoading ? 'Deleting...' : 'delete'}
    </ContactButton>
  </>

}
 

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default ContactItem;
