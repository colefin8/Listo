const bcrypt = require("bcryptjs");

module.exports = {
  //REGISTER FUNCTION WORKING AND RETURNING OBJECT WITH ALL 4 KEY VALUE PAIRS
  register: async (req, res) => {
    //see register function of Auth.js, ~line 22
    const { emailInput, passwordInput } = req.body;
    const db = req.app.get("db");
    //function to check for pre-existing user
    let foundUser = await db.find_email(emailInput);
    foundUser = foundUser[0];
    //IF A USER IS RETURNED FROM THE DATABASE QUERY ABOVE
    if (foundUser) {
      res.status(409).send("User already exists");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(passwordInput, salt);
      //NEED TO ADD FUNCTIONALITY FOR PROFILE PIC
      const newUser = await db.add_user(emailInput, hash);
      req.session.user = newUser;
      res.status(201).send(newUser[0]);
    }
  },

  //LOGIN FUNCTION WORKING AND RETURNING OBJECT WITH ALL 4 KEY VALUE PAIRS
  login: async (req, res) => {
    //see login function of Auth.js, ~line 31
    const { emailInput, passwordInput } = req.body;
    const db = req.app.get("db");
    //function to check for user
    let foundUser = await db.find_email(emailInput);
    foundUser = foundUser[0];
    if (foundUser) {
      const comparePassword = foundUser.password;
      const authenticated = bcrypt.compareSync(passwordInput, comparePassword);
      if (authenticated) {
        delete foundUser.password;
        req.session.user = foundUser;
        res.status(202).send(foundUser);
      }
    } else {
      res.status(401).send("Email or password incorrect");
    }
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.status(200).send(req.session);
  },
  getUser: async (req, res) => {
    if (!req.session.user) {
      res.status(200).send({ email: "guest", profile_pic: "none", user_id: 0 });
    } else {
      res.status(200).send(req.session.user);
    }
  }
};
