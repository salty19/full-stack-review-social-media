const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    //TODO Register new user
    /*
      TODO - Get email, password from req.body
      TODO - Check if user already exists. If they do, reject the request
      TODO - Salt & hash password
      TODO - Create the user in the DB
      TODO - Put user on session
      TODO - Send results/confirmation
    */

  },

  login: () => {
    //TODO Login existing user
  },

  logout: () => {
    //TODO Logout user
  },

  getUser: () => {
    //TODO Get user from session
  },
}
