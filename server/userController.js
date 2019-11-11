module.exports = {
  editUser: async (req, res) => {
    const { id } = req.params;
    const { email, image } = req.body;
    const db = req.app.get("db");

    await db
      .edit_user([id, email, image])
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err));
  },

  getUsers: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    console.log(id);
    let data = await db
      .get_users(+id)
      .then(response => response)
      .catch(err => console.log(err));

    res.status(200).send(data);
  },

  addListUser: async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    const db = req.app.get("db");
    let data = await db
      .add_list_user([id, email])
      .then(res => res)
      .catch(err => console.log(err));
    console.log(data);
    res.status(200).send(data);
  }
};
