const { Router } = require('express')
const passport = require('passport')

const { verifyMateria, verifyCreditos, verifyControl, verifyEvaluacion } = require('../Middlewares/VerifyFiles')
const { truncateMaterias, truncateCreditos, truncateControl, truncateEvaluacion, truncateIngreso } = require('../Controllers/Truncates.controllers')
const { addMaterias, addCreditos, addControl, addEvaluacion, addIngreso } = require('../Controllers/Adds.Controllers')
const { getMaterias ,getSemestreActual } = require('../Controllers/Gets.Controllers')
const { genKeys, verifyKey } = require('../Middlewares/APIKeys')
const r = Router()


r.route('/materias/:ncontrol/:apikey')
    .get(getMaterias)

r.route('/materias/:ncontrol/:semestre/:apikey')
    .get(getSemestreActual)

r.route('/materias')
    .post(/* verifyMateria */ truncateMaterias, addMaterias)

r.route('/creditos')
    .post(/* verifyCreditos */ truncateCreditos, addCreditos)

r.route('/controles')
    .post(/* verifyControl */truncateControl, addControl)

r.route('/evaluaciones')
    .post(/* verifyEvaluacion */ truncateEvaluacion, addEvaluacion)

r.route('/ingreso')
    .post(/* verifyControl */truncateIngreso, addIngreso)

    .post(/*verifyMateria, */ truncateMaterias, addMaterias)

r.route('/creditos')
    .post(/*verifyCreditos, */ truncateCreditos, addCreditos)

r.route('/controles')
    .post(/* verifyControl , */ truncateControl, addControl)

r.route('/evaluaciones')
    .post(/* verifyEvaluacion  ,*/ truncateEvaluacion, addEvaluacion)


r.get('/', (req, res, next) => {

    if (req.isAuthenticated()) {
        res.redirect('/dashboard')
    }

    //res.redirect('/')
    res.render('login')
})

r.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}));

r.get('/dashboard', isAuthenticated, (req, res, next) => {
    res.render('dashboard');
});


r.get('/register', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard')
    }

    res.render('register');
});

r.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/register',
    failureFlash: true
}));

r.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

r.route('/keys')
    .get(function (req, res) {
        res.render('keys')
    })

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/')
}

module.exports = r