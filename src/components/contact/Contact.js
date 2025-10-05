import DB from '../../DB';
import getTemplate from './template';

export default class Contact {
  constructor (data) {
    // Création d'objets avec ces propriétés
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.domElt = null;
  }
  render (elmt) {
    // Affichage contact
    const template = document.createElement('template');
    // Récup affichage contact
    template.innerHTML = getTemplate(this);
    this.domElt = template.content.firstElementChild;
    // elmt récupère la liste et ajoute dans la contact list
    elmt.append(this.domElt);
    this.initEvents();
  }

  async update (data) {
    // Capture de l'index dans le tableau pour catch l'id
    const response = window.ContactList.contacts.findIndex(contact => contact.id == data.id);
    // Simplification écriture
    const contact = window.ContactList.contacts[response];
    // Modifier les propriétés de l'objet sur base de son index
    contact.firstname = data.firstname;
    contact.lastname = data.lastname;
    contact.email = data.email;

    // Modif dans le DOM
    this.domElt.querySelector('.firstname').innerText = data.firstname;
    this.domElt.querySelector('.lastname').innerText = data.lastname;
    this.domElt.querySelector('.email').innerText = data.email;

    // Modif dans la DB
    return await DB.updateOne(data);
  }

  async deleteOneById (id) {
    // Supprimer de la DB
    const resp = await DB.deleteOneById(id);

    // Supprimer des contacts
    window.ContactList.contacts.splice(
      window.ContactList.contacts.findIndex(contact => contact.id == id), 1
    );

    // Supprimer du DOM
    this.domElt.remove();

    // Relander le renderContactCount()
    window.ContactList.renderContactCount();
  }

  initEvents () {
    // Valeurs par défaut inputs
    this.inputFirstname = this.domElt.querySelector('.input-firstname').value;
    this.inputLastname = this.domElt.querySelector('.input-lastname').value;
    this.inputEmail = this.domElt.querySelector('.input-email').value;

    // Capture button delete
    this.domElt.querySelector('.btn-delete').addEventListener('click', (e) => {
      // Remplace window.ContactList par this.fct dans le document concerné
      this.deleteOneById(this.id);
    });

    // Capture button edit + ajout class isEditing dans domElt
    this.domElt.querySelector('.btn-edit').addEventListener('click', () => {
      this.domElt.classList.toggle('isEditing');
    });

    // Capture input firstname : edit
    this.domElt.querySelector('.input-firstname').addEventListener('input', (e) => {
      this.inputFirstname = e.target.value;
    });

    // Capture input lastname : edit
    this.domElt.querySelector('.input-lastname').addEventListener('input', (e) => {
      this.inputLastname = e.target.value;
    });

    // Capture input email : edit
    this.domElt.querySelector('.input-email').addEventListener('input', (e) => {
      this.inputEmail = e.target.value;
    });

    // Capture button check + remove isEditing de domElt
    this.domElt.querySelector('.btn-check').addEventListener('click', () => {
      const contactID = this.domElt.dataset.id;
      // Création de propriétés et assignation des valeurs dans un objet litéral
      this.update({firstname: this.inputFirstname, lastname: this.inputLastname, email: this.inputEmail, id: contactID});
      this.domElt.classList.toggle('isEditing');
    });
  }
}