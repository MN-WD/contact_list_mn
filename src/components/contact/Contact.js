import DB from '../../DB';
import getTemplate from './template';

export default class Contact {
  constructor (data) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.domElt = null;
  }
  render (elmt) {
    const template = document.createElement('template');
    template.innerHTML = getTemplate(this);
    this.domElt = template.content.firstElementChild;
    elmt.append(this.domElt);
    this.initEvents();
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
    this.domElt.querySelector('.btn-delete').addEventListener('click', (e) => {
      // Remplace window.ContactList par this.fct dans le document concerné
      this.deleteOneById(this.id);
    });
  }
}