import './styles.css';
import ContactList from './components/contactList/ContactList';

new ContactList ({
  elt: "#app",
  apiURL: "https://68d958d390a75154f0da2bbb.mockapi.io/"
});