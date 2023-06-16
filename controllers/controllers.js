const mysql = require("mysql");
const { request, response } = require("../routes/auth");
const express = require("express");
const app = express();
const session = require('express-session');
const e = require("express");
let userId = 0;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kevin1995',
    database: 'userdb'
  });

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

  exports.register = (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    db.query('SELECT email FROM usertable WHERE email = ?', [email], (error, results) => {  
        
        
        db.query('INSERT INTO usertable SET ?',  {user: username, email: email, password: password}, (error, results) => {
            if (error) {
                console.log(error);
            }   else{
                console.log(results); 
            }
        })
    })

    res.redirect("../userhome.html");
  }

  exports.login = (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if (username && password){
        db.query('SELECT * FROM usertable WHERE user = ? AND password = ?', [username, password], (error, results) => {
            if (error) {
                console.log(error);
            }   else{
                console.log(results);
            }
            if (results.length > 0) {
                db.query('SELECT userId FROM usertable WHERE user =?', [username], (error, rows) => {
                    if (error) {
                        console.log(error);
                    }   else{
                        setName(rows);
                    }
                })
                return res.redirect('../userhome.html');
            }   else{
                res.send('Please reenter your information!');
                res.end();
            }
            res.end();
        })
}}

exports.registerpass = (req,res) => {
    console.log(req.body);
    const {fname, lname, address, phone, license, model, year, state, color} = req.body;
    db.query('INSERT INTO passtable SET ?', {firstName: fname, lastName: lname, address: address, license: license, model: model, year: year, state: state, color: color, phone: phone}, (error, results) => {
        if (error) {
            console.log(error);
        }   else{
            console.log(results);
        }
    })

   return res.redirect("../payment.html");
}

exports.assignfine = (req,res) => {
    console.log(req.body);
    const {license, fee, violation} = req.body;
    db.query('INSERT INTO finestable SET ?', {license: license, fee: fee, violation: violation}, (error, results) => {
        if (error) {
            console.log(error);
        }   else{
            console.log(results);
        }
    })
}


function setName(value) {
    userId = value;
    console.log(userId);
}

