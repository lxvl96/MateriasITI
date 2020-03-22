const express = require('express')
const efile = require('express-fileupload')

//inits
const app = express()

//settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(express.static(__dirname + '/Public'))
app.use(efile({ createParentPath: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Routes
app.use('/api/v1',require('./Routes/Index.Routes'))

//Startings
app.listen(app.get('port'), () => {
    console.log(`Server Running on Port ${app.get('port')}`);
})