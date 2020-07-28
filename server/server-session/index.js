const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const User = require('./models/user.js');
const bcrypt = require('bcrypt');

const router = require('./router');

const corsConfig = {

};

app.use(cors());
app.use(express.json());


app.use(session({
  secret: 'ManUnited',
  resave: false,
  saveUninitialized: false,
  cookie : {
    maxAge: 1000*60*60,
    name:'myCookie'
  }
}));

app.post('/register', async (req, res) => {

  const {email, password, firstName, lastName} = req.body;
  let hashedPassword ;

  const exists = await User.find({email:email});
  if (exists) {
    res.status(400);
    res.json(`Email ${email} already exists. Please choose another email id`);
  }

  hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({email, password, firstName, lastName});
  // res.session.email = newUser.email;
  res.json(newUser);

});

// app.use(router);

app.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`); // eslint-disable-line no-console
  } else {
    console.log(`🚀 Server (sessions) is listening on port ${SERVER_PORT}!`); // eslint-disable-line no-console
  }
});
