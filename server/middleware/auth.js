const jwt = require('jsonwebtoken')
require('dotenv').config()


const verify_login = (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).send("You're not a user")
      } else {
        next();
      }
    } catch (error) {
      res.status(401).send(error)
    }
}

const verify_admin = (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        const role = decodedToken.role
        if (role !== "admin") {
          return res.status(401).send("Unauthorized")
        } else {
          next()
        }
    } catch (error) {
      res.status(401).send(error)
    }
}


module.exports = { verify_admin, verify_login }
