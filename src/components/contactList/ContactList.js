import DB from '../../DB';
import Contact from '../contact/Contact';
import getTemplate from './template';

export default class ContactList {
  constructor (data) {
    // Assignation de #app dans domElt
    this.domElt = document.querySelector(data.elt);
    // Initialisation de listDomElt utilisé dans le render
    this.listDomElt = null;
    // Set l'url de l'API
    DB.setApiURL(data.apiURL);
    // Initialisation du tableau des contacts
    this.contacts = [];
    // Lance fonction pour charger contacts dans notre tableau
    this.loadContacts();
  }

  async loadContacts () {
    // Attente du chargement des éléments de la DB dans tableau contacts (loadContacts)
    const contacts = await DB.findAll();
    // Transforme les éléments de contacts(loadContacts) en new Contact et on les mets dans contacts (constructor)
    this.contacts = contacts.map((contact) => new Contact(contact));
    // Appel fonction render pour afficher contacts
    this.render();
  }

  renderContactCount () {
    // Affichage nombre de contacts
    this.domElt.querySelector(".contact-count").innerText = this.contacts.length;
  }

  render () {
    // Récupération du template de la Contact List
    this.domElt.innerHTML = getTemplate();
    // Propriété raccourcie pour sélectionner la liste de contact
    this.listDomElt = this.domElt.querySelector(".contact-body");
    // Affichage de chaque élément du contact dans une rangée de la liste
    this.contacts.forEach((contact) => 
      contact.render(this.listDomElt)
    );
    // Lancement affichage nombre de contacts
    this.renderContactCount();
    // Lancement des évènements
    this.initEvents();
  }

  async addContact (formFirstname, formLastname, formEmail) {
    // Ajouter éléments dans la DB
    const contact = await DB.create(formFirstname, formLastname, formEmail);

    // Ajouter à this.contacts
    const newContact = new Contact(contact);
    this.contacts.push(newContact);

    // Ajouter dans le DOM
    newContact.render(this.listDomElt);

    // Relander renderContactCount()
    this.renderContactCount();
  }

  initEvents () {
    // Event add contact : capture chaque élément du form
    this.domElt.querySelector('.new-contact').addEventListener("click", () => {
      this.addContact(this.domElt.querySelector(".formFirstname").value, this.domElt.querySelector(".formLastname").value, this.domElt.querySelector(".formEmail").value);
      this.resetForm();
    });
  }

  resetForm () {
    // Réinitialise les cases du formulaire d'ajout
    this.domElt.querySelector(".formFirstname").value="";
    this.domElt.querySelector(".formLastname").value="";
    this.domElt.querySelector(".formEmail").value="";
  }
}