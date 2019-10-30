require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  amazon = require("amazon-product-api"),
  { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env,
  authCtrl = require("./authController"),
  listCtrl = require("./listController"),
  app = express();

const client = amazon.createClient({});
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

//AUTH ENDPOINTS
app.post("/api/auth/register", authCtrl.register);
app.post("/api/auth/login", authCtrl.login);
app.post("/api/auth/logout", authCtrl.logout);
app.get("/api/auth/user", authCtrl.getUser);

//LIST ENDPOINTS
app.post("/api/list/add", listCtrl.add);
app.post("/api/list/addguest", listCtrl.addGuest);
app.get("/api/list/:id", listCtrl.getList);

//USER ENDPOINTS

const port = SERVER_PORT || 4040;
app.listen(port, () => console.log(`Server running on port ${port}`));
