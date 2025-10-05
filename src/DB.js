export default class DB {
  // url new Contact => constructor (data) => récup de l'API findAll
  static setApiURL (data) {
    this.apiURL = data;
  }
  
  // Transaction vers l'API avec l'url
  static async findAll() {
    const response = await fetch(this.apiURL + "contact");
    return response.json();
  }

  // Ajout d'un contact dans la DB / l'API
  static async create (formFirstname, formLastname, formEmail) {
    const response = await fetch(this.apiURL + "contact", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        firstname: formFirstname,
        lastname: formLastname,
        email: formEmail
      }),
    });
    return response.json();
  }

  // Update d'un contact dans la DB / l'API
  static async updateOne (contact) {
    const response = await fetch(this.apiURL + "contact/" + contact.id, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        firstname: contact.firstname,
        lastname: contact.lastname,
        email: contact.email
      }),
    });
    return response.json();
  }

  // Delete d'un contact de la DB / l'API
  static async deleteOneById (id) {
    const response = await fetch(this.apiURL + "contact/" + id, {
      method: "DELETE",
    });
    return response.json();
  }
}