module.exports = {
  addPrivate: async (req, res) => {
    //req.body should contain list name, creator email, shared boolean, and budget
    //steps: check for email, get user_id off of email user
    //add to list table with all 4 data pieces of data, not email but user_id
    const { listName, shared, budget, email } = req.body;
    console.log([listName, budget, shared, email]);
    const db = req.app.get("db");
    let newListId = await db
      .add_private_list([listName, budget, shared, email])
      .catch(err => console.log(err));
    newListId = newListId[0];
    console.log(`newListId: ${newListId}`);
    res.status(200).send(newListId);
  },
  addPublic: async (req, res) => {
    const { listName, shared, budget, email } = req.body;
    console.log([listName, budget, shared, email]);
    const db = req.app.get("db");
    let newListId = await db
      .add_public_list([listName, budget, shared, email])
      .catch(err => console.log(err));
    newListId = newListId[0];
    console.log(`newListId: ${newListId}`);
    res.status(200).send(newListId);
  },
  addGuest: async (req, res) => {
    //req.body should contain list name, and budget
    const { listName, budget } = req.body;
    const db = req.app.get("db");
    let newListId = await db
      .add_list_guest([listName, +budget])
      // .then(res => console.log(res))
      .catch(err => err);
    // console.log(newListId);
    newListId = newListId[0];
    res.status(200).send(newListId);
  },
  getList: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    let list = await db.get_list(id).catch(err => console.log(err));
    list = list[0];
    res.status(200).send(list);
  },
  getPrivateLists: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    let lists = await db.get_private_lists(id).catch(err => console.log(err));
    res.status(200).send(lists);
  },
  getPublicLists: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const db = req.app.get("db");
    let lists = await db.get_public_lists(id).catch(err => console.log(err));
    res.status(200).send(lists);
  },
  getAllLists: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    let lists = await db.get_all_lists(id).catch(err => console.log(err));
    console.log(lists);
    res.status(200).send(lists);
  }
};
