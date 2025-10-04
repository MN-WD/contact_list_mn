import './styles.css';
import ContactList from './components/contactList/ContactList';

// Création de la propriété ContactList de l'objet window + assignation du new ContactList
// Réutilisation du ContactList partout => haute hiérarchie
window.ContactList = new ContactList ({
  elt: "#app",
  apiURL: "https://68d958d390a75154f0da2bbb.mockapi.io/"
});