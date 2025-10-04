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
  }
}