import propTypes from 'prop-types';
import { InfoContact, Button } from './ContactListItem.styled.jsx';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

export const ContactListItem = ({ contact }) => {
  const dispatch = useDispatch();
  return (
    <>
      <InfoContact>{contact.name}</InfoContact>
      <InfoContact>{contact.number}</InfoContact>
      <Button type="button" onClick={() => dispatch(deleteContact(contact.id))}>
        Delete
      </Button>
    </>
  );
};

ContactListItem.propTypes = {
  contact: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    number: propTypes.string.isRequired,
  }),
};
