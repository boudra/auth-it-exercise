const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const create = async (req, res) => {

  const {email, password, firstName, lastName} = req.body;
  let hashedPassword ;

  await User.find({email})
    .then(user => {
      res.status(400);
      res.json(`Email ${email} already exists. Please choose another email id`);
    }).catch(err => res.json(err.message));

  hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({email, password: hashedPassword, firstName, lastName});
  req.session.email = newUser.email;
  res.json(newUser);

};

const login = async (req, res) => {
  const {password} = req.body;

};

const profile = async (req, res) => {
  // await User.find
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send();
    }
    res.clearCookies();

  });
};

module.exports = { create, login, profile, logout };
