require("dotenv").config();
const path = require("path");
const express = require("express"),
  cors = require("cors"),
  AWS = require("aws-sdk"),
  massive = require("massive"),
  session = require("express-session"),
  { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env,
  storeCtrl = require("./storageController"),
  authCtrl = require("./authController"),
  listCtrl = require("./listController"),
  itemCtrl = require("./itemController"),
  userCtrl = require("./userController"),
  app = express();

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
app.use(cors());
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      //max age 1 hr
      maxAge: 100 * 60 * 60
    }
  })
);

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("database connected");
  })
  .catch(err => console.log(`Database error: ${err}`));

//STORAGE ENDPOINTS
app.get("/api/signs3", storeCtrl.signs3);

//AUTH ENDPOINTS
app.post("/api/auth/register", authCtrl.register);
app.post("/api/auth/login", authCtrl.login);
app.post("/api/auth/logout", authCtrl.logout);
app.get("/api/auth/user", authCtrl.getUser);

//LIST ENDPOINTS
app.post("/api/list/addprivate", listCtrl.addPrivate);
app.post("/api/list/addpublic", listCtrl.addPublic);
app.post("/api/list/addguest", listCtrl.addGuest);
app.get("/api/list/:id", listCtrl.getList);
app.get("/api/lists/:id", listCtrl.getAllLists);
app.get("/api/lists/private/:id", listCtrl.getPrivateLists);
app.get("/api/lists/public/:id", listCtrl.getPublicLists);

//ITEM ENDPOINTS
app.post("/api/item/add", itemCtrl.add);
app.get("/api/items/:id", itemCtrl.getItems);
app.get("/api/item/:id", itemCtrl.getItem);
app.put("/api/item/:id", itemCtrl.editItem);
app.delete("/api/item/:id", itemCtrl.deleteItem);

//USER ENDPOINTS
app.put("/api/user/:id", userCtrl.editUser);
app.get("/api/users/:id", userCtrl.getUsers);
app.post("/api/listusers/:id", userCtrl.addListUser);

const port = SERVER_PORT || 4040;
app.listen(port, () => console.log(`Server running on port ${port}`));
