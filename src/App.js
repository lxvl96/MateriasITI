const express = require('express')
const efile = require('express-fileupload')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const engine = require('ejs-mate')
const path = require('path')
const https = require('https')
const fs = require('fs')

//inits
const app = express()
require('./Configs/mdb/Connections')
require('./Configs/passport/local-auth')

//settings
app.set('port', process.env.PORT || 8080)
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')

//Middlewares
app.use(express.static(__dirname + '/Public'))
app.use(efile({ createParentPath: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'm@t3r1@$Ap1',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    app.locals.signinMsg = req.flash('signinMsg')
    app.locals.signupMsg = req.flash('signupMsg')
    app.locals.user = req.user
    app.locals.createSuccess = req.flash('createSuccess')
    app.locals.noSuccess = req.flash('noSuccess')
    //console.log(app.locals);
    next()

})

//Routes
app.use(require('./Routes/Index.Routes'))

//Startings
/**https.createServer({
    key: fs.readFileSync('src/privates/key.pem'),
    cert: fs.readFileSync('src/privates/cert.pem'),
    passphrase: 'adiosamor96'
}, app).listen(app.get('port'), () => {
    console.log(`Server Running on Port ${app.get('port')}`);
});*/

app.listen(app.get('port'),()=>{
  console.log('Server Running on Port',app.get('port'));
});