export default class DB {
  static setApiURL (data) {
    this.apiURL = data;
  }
  
  static async findAll() {
    const response = await fetch(this.apiURL + "contact");
    return response.json();
  }

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

  static async deleteOneById (id) {
    const response = await fetch(this.apiURL + "contact/" + id, {
      method: "DELETE",
    });
    return response.json();
  }
}