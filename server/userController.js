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

    await db
      .get_users(id)
      .then(response => res.status(200).send(response.data))
      .catch(err => console.log(err));
  }
};
