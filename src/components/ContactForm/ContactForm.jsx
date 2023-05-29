import { useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import {
  Form,
  ContainerInput,
  Input,
  Label,
  Button,
  Message,
} from './ContactForm.styled.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice.js';
import { getContacts } from 'redux/contactsSlice.js';

const FormError = ({ message }) => {
  return <Message>{message}</Message>;
};

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nameError, setNameError] = useState(null);
  const [numberError, setNumberError] = useState(null);

  const nameInputId = nanoid();
  const telInputId = nanoid();
  const submitButton = useRef();

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        setNameError(null);
        break;

      case 'number':
        setNumber(value);
        setNumberError(null);
        break;

      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!name || !number) {
      setNameError('Please fill in all fields');
      return;
    }

    const isValidName = /^[\p{L}\s]+$/u;
    if (!isValidName.test(name)) {
      setNameError('Please enter a valid name');
      return;
    }

    const isValidNumber = /^[0-9\s-]+$/;
    if (!isValidNumber.test(number)) {
      setNumberError('Please enter a valid number');
      return;
    }

    const isContactExistName = isContactExist(name);
    if (isContactExistName) {
      setNameError('Already exists!');
      return;
    }

    dispatch(addContact(name, number));
    reset();
    submitButton.current.focus();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const isContactExist = name => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    return isExist;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ContainerInput>
        <Label htmlFor={nameInputId}>
          Name
          <Input
            className="input"
            type="text"
            name="name"
            placeholder="Enter name"
            id={nameInputId}
            value={name}
            onChange={handleChange}
          />
        </Label>
        <>{nameError && <FormError name="name" message={nameError} />}</>
      </ContainerInput>
      <ContainerInput>
        <Label htmlFor={telInputId}>
          Phone
          <Input
            className="input"
            type="tel"
            name="number"
            placeholder="Enter phone number"
            id={telInputId}
            value={number}
            onChange={handleChange}
          />
        </Label>
        <>{numberError && <FormError name="number" message={numberError} />}</>
      </ContainerInput>
      <Button type="submit" ref={submitButton}>
        Add contact
      </Button>
    </Form>
  );
};
