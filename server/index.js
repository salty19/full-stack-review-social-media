//TODO Basic express setup
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./authController')
const postCtrl = require('./controller')
const verifyUser = require('./middlewares/verifyUser')


const app = express()
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env  


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { massAge: 1000 * 60 * 60 * 24 * 365 }, 
  })
)


//#auth endpoints
//TODO login, register, logout, getUser
app.post('/auth/register', verifyUser, authCtrl.register)
app.post('/auth/login', verifyUser, authCtrl.login)
app.delete('/auth/logout', verifyUser, authCtrl.logout)
app.get('/auth/user', verifyUser, authCtrl.getUser) 


//#posts endpoints
//TODO get post put delete posts
app.get('/api/posts', postCtrl.getPosts)
app.post('/api/posts', postCtrl.addPost)
app.put('/api/posts/:post_id', postCtrl.editPost)
app.delete('/api/posts/:post_id', postCtrl.deletePost)


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log("DB is connect cap'n")
    app.listen(SERVER_PORT, () => console.log(`Crunchatize me on port ${SERVER_PORT}!!!`))
})
