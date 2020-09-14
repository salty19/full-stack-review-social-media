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

    const db = req.app.get('db')
    //Desctructure values from body
    const {email, password} = req.body

    //Check if user already exists
    const [user] = await db.check_user([email])

    //If they exist, reject the request
    if(user){
      return res.status(409).send('User already exsists')
    }

    //Salt and hash password, when user is ready to be created
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    //Create the user in the DB
    const [newUser] = await db.register_user([email, hash])

    //Put the new user on session
    req.session.user = newUser

    //? Send confirmation email

    //Send confirmation
    res.status(200).send(req.session.user)

  },


  login: async (req, res) => {
    //TODO Login existing user

    /*
 TODO - GET EMAIL AND APSSWORD FROM REQ.BODY
 TODO - Compare password and has. If there is a mismatch, reject the request
 TODO - Put the user on session
 TODO - Send confirmation
*/

const db = req.app.get('db')
//Get email and password from body
const {email, password} = req.body

//Check if user exists
const [existingUser] = await db.check_user([email])

//If they don't reject the request
if(!existingUser) {
  return res.status(404).send('User not found')
}

//Compare password & hash
const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)

if(!isAuthenticated) {
  return res.status(403).send('Incorrect email or password')
}

delete existingUser.hash

req.session.user = existingUser

res.status(200).send(req.session.user)
  },


  logout: (req, res) => {
    //TODO Logout user

    req.session.destory()
    req.sendStatus(200)
  },


  getUser: (req, res) => {
    //TODO Get user from session

    if(req.session.user){
      res.status(200).send(req.session.user)
    } else {
      res.status(404).send('No session found')
    }
  },

}
