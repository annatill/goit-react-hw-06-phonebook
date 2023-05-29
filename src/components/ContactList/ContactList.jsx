import { ContactListItem } from '../ContactListItem/ContactListItem';

import { ListContacts, Contact } from './ContactList.styled.jsx';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/contactsSlice';
import { getFilter } from 'redux/filterSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  return (
    <ListContacts>
      {getVisibleContacts().map(contact => {
        return (
          <Contact key={contact.id}>
            <ContactListItem contact={contact} />
          </Contact>
        );
      })}
    </ListContacts>
  );
};
