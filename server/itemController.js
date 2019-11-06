module.exports = {
  add: async (req, res) => {
    const { list_id, added_by_id, name, price, notes, image, link } = req.body;
    const db = req.app.get("db");
    await db
      .add_item([list_id, added_by_id, name, price, notes, image, link])
      .then(res.sendStatus(200))
      .catch(err => console.log(err));
  },
  getItems: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const items = await db.get_items(id).catch(err => console.log(err));
    res.status(200).send(items);
  },

  getItem: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    let item = await db.get_item(id).catch(err => console.log(err));
    item = item[0];
    res.status(200).send(item);
  },

  editItem: async (req, res) => {
    const { id } = req.params;
    const { name, price, notes, image, link } = req.body;
    const db = req.app.get("db");
    db.edit_item([id, name, price, notes, image, link]);
    res.sendStatus(200);
  },

  deleteItem: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.delete_item(id).then(() => {
      res.sendStatus(200);
    });
  }
};
