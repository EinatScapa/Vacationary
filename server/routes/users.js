const router = require ('express').Router()
const {myQuery} = require('../data_base/db')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

require('dotenv').config()

// register
router.post('/register', async (req,res) => {
  try {
    const { Fname, Lname, username, password } = req.body
    // check missing info
    if (!Fname || !Lname || !username || !password) {
        return res.status(400).send({err:"missing some info"});
    }
    // check if username taken
    const users = await myQuery ('SELECT * FROM users')
    if (users.some((user) => user.username === username)) {
        return res.status(401).send({err:"username is taken"});
    }
    // encrypt the password
    const hashedPass = await bcrypt.hash(password, 10);
    // save to data base
    await myQuery (`
    INSERT INTO users (Fname, Lname, username, password)
    VALUES ('${Fname}', '${Lname}','${username}', '${hashedPass}');
    `)
    res.status(201).send()
  } catch (error) {
    res.status(500).send(error)
  }
})

// log-in
router.post('/login', async (req,res) => {
  try {
    const { username, password } = req.body
    // check missing info
    if (!username || !password) {
        return res.status(400).send({err:"missing some info"})
    }
    // check if username exists
    const users = await myQuery ('SELECT * FROM users')
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(401).send({err:"user not found"});
    }
    // check if password correct
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(402).send({err:"wrong password"});
    }
    // save token
    const token = jwt.sign(
      {
        id: user.id,
        Fname: user.Fname,
        Lname: user.Lname,
        role: user.role
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn:'1h',
      }
    );
    res.json({token})
  } catch (error) {
    res.status(500).send(error)
  }
})
   
module.exports = router