module.exports = {
  editUser: async (req, res) => {
    const { id } = req.params;
    const { email, image } = req.body;
    const db = req.app.get("db");

    await db
      .edit_user([id, email, image])
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err));
  }
};
