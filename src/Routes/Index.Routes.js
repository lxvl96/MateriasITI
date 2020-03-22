const { Router } = require('express')
const { verifyMateria, verifyCreditos, verifyControl, verifyEvaluacion } = require('../Middlewares/VerifyFiles')
const { truncateMaterias, truncateCreditos, truncateControl, truncateEvaluacion } = require('../Controllers/Truncates.controllers')
const { addMaterias, addCreditos, addControl, addEvaluacion } = require('../Controllers/Adds.Controllers')
const { getMaterias } = require('../Controllers/Gets.Controllers')

const r = Router()

r.route('/materias/:ncontrol')
    .get(getMaterias)

r.route('/materias')
    .post(verifyMateria, truncateMaterias, addMaterias)

r.route('/creditos')
    .post(verifyCreditos, truncateCreditos, addCreditos)

r.route('/control')
    .post(verifyControl/* , truncateControl */, addControl)

r.route('/evaluacion')
    .post(verifyEvaluacion, truncateEvaluacion, addEvaluacion)

// r.route('/login')
//     .post(authLogin)

// r.route('/home')
//     .post(home)

module.exports = r