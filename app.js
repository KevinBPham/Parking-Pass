const mysql = require('mysql');
const express = require("express");
const app = express();
const dotenv = require('dotenv');
var url = require('url')
const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

// To use data from HTML forms
app.use(express.urlencoded({ extended: false }));

// Be able to parse JSON data
app.use(express.json());

// Original was port 8888, I changed to 3000
app.listen(3000, () => {
  console.log("Initiated on port 3000");
});

// Change user and password according to localdb
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'kevin1995',
database: 'userdb'
});

db.connect( (error) => {
if(error) {
  console.log(error)
} else {
  console.log("Connected to the mySQL database!")
}
});

app.get('/', (req, res) => {
    res.render('index');
  });

app.get('/login.html', (req, res) => {
  res.render('login');
});

app.get('/register.html', (req, res) => {
  res.render('register');
});

app.get('/registerpass.html', (req, res) => {
  res.render('registerpass');
});

app.get('/home.html', (req, res) => {
  res.render('home');
});

app.get('/userhome.html', (req, res) => {
  res.render('userhome');
});

app.get('/userfines.html', (req, res) => {
  res.render('userfines');
});

app.get('/adminhome.html', (req, res) => {
  res.render('adminhome');
});

app.get('/announcements.html', (req, res) => {
  res.render('announcements');
});

app.get('/userinfo.html', (req, res) => {
  res.render('userinfo');
});

app.get('/adminhome.html', (req, res) => {
  res.render('adminhome');
});

app.get('/assignfine.html', (req, res) => {
  res.render('assignfine');
});

app.get('/payment.html', (req, res) =>{
  res.render('payment');
})

app.delete('/logout.html', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Cannot log out!')
      } else {
        res.send('Logout successful')
      }
    });
  } else {
    res.end()
  }
})

app.use('/auth', require('./routes/auth'));


