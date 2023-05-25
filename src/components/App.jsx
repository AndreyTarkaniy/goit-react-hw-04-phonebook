import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Container } from 'components/container/container';
import Form from 'components/form/form';
import ContactsList from 'components/contactsList/contactsList';
import Filter from 'components/filter/filter';
import ContactsData from 'components/data/contacts.json';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contactsList')) ?? ContactsData
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (setContacts !== contacts) {
      window.localStorage.setItem('contactsList', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = contactDataForm => {
    const { name, number } = contactDataForm;

    const existContact = contacts.find(
      contact => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (existContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const filterContact = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contactId !== contact.id)
    );
  };

  const contactsFilter = filterContact();

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmitForm={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactsList contacts={contactsFilter} onDelete={deleteContact} />
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     contacts: ContactsData,
//     filter: '',
//   };

//   componentDidMount() {
//     const localData = localStorage.getItem('contactsList');
//     if (localData) {
//       this.setState({ contacts: JSON.parse(localData) });
//     }
//   }

//   componentDidUpdate(prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contactsList', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = contactDataForm => {
//     const { name, number } = contactDataForm;

//     const existContact = this.state.contacts.find(
//       contact => name.toLowerCase() === contact.name.toLowerCase()
//     );

//     if (existContact) {
//       alert(`${name} is already in contacts.`);
//       return;
//     }

//     const newContact = {
//       id: nanoid(),
//       name: name,
//       number: number,
//     };

//     this.setState(prevState => ({
//       contacts: [newContact, ...prevState.contacts],
//     }));
//   };

//   changeFilter = event => {
//     const { value } = event.target;

//     this.setState({ filter: value });
//   };

//   filterContact = () => {
//     const { contacts, filter } = this.state;

//     const normalizeFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeFilter)
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contactId !== contact.id),
//     }));
//   };

//   render() {
//     const { filter } = this.state;
//     const contacts = this.filterContact();

//     return (
//       <Container>
//         <h1>Phonebook</h1>
//         <Form onSubmitForm={this.addContact} />

//         <h2>Contacts</h2>
//         <Filter value={filter} onChangeFilter={this.changeFilter} />
//         <ContactsList contacts={contacts} onDelete={this.deleteContact} />
//       </Container>
//     );
//   }
// }
