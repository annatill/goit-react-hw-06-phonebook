import { Container, Title, TitleSection } from './App.styled';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';

export const App = () => {
  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm />
      <TitleSection>Contacts</TitleSection>
      <Filter />
      <ContactList />
    </Container>
  );
};
