require("dotenv").config();
const express = require("express"),
  cors = require("cors"),
  AWS = require("aws-sdk"),
  massive = require("massive"),
  session = require("express-session"),
  {
    SERVER_PORT,
    SESSION_SECRET,
    CONNECTION_STRING,
    BUCKET_NAME,
    AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID
  } = process.env,
  storeCtrl = require("./storageController"),
  authCtrl = require("./authController"),
  listCtrl = require("./listController"),
  itemCtrl = require("./itemController"),
  app = express();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

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
app.post("/api/photo/add", storeCtrl.add);
app.post("/api/photo/", storeCtrl.getImage);
app.get("/api/signs3", storeCtrl.signs3);

//AUTH ENDPOINTS
app.post("/api/auth/register", authCtrl.register);
app.post("/api/auth/login", authCtrl.login);
app.post("/api/auth/logout", authCtrl.logout);
app.get("/api/auth/user", authCtrl.getUser);

//LIST ENDPOINTS
app.post("/api/list/add", listCtrl.add);
app.post("/api/list/addguest", listCtrl.addGuest);
app.get("/api/list/:id", listCtrl.getList);
app.get("/api/lists/private/:id", listCtrl.getPrivateLists);
app.get("/api/lists/public/:id", listCtrl.getPublicLists);

//ITEM ENDPOINTS
app.post("/api/item/add", itemCtrl.add);
app.get("/api/items/:id", itemCtrl.getItems);
app.get("/api/item/:id", itemCtrl.getItem);
app.put("/api/item/:id", itemCtrl.editItem);

//USER ENDPOINTS

const port = SERVER_PORT || 4040;
app.listen(port, () => console.log(`Server running on port ${port}`));
