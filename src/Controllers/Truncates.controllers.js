const { pool } = require('../Configs/Psql/Connections')

//Methods for Truncates Tables PSQL
const truncateMaterias = (req, res, next) => {
    pool.query("TRUNCATE TABLE materia RESTART IDENTITY")
    next()
}

const truncateCreditos = (req, res, next) => {
    pool.query("TRUNCATE TABLE creditos RESTART IDENTITY")
    next()
}

const truncateControl = (req, res, next) => {
    pool.query("TRUNCATE TABLE control RESTART IDENTITY")
    next()
}

const truncateEvaluacion = (req, res, next) => {
    pool.query("TRUNCATE TABLE evaluacion RESTART IDENTITY")
    next()
}

const truncateIngreso = (req, res, next) => {
    pool.query("TRUNCATE TABLE periodo_iniciales RESTART IDENTITY")
    next()
}

module.exports = {
    truncateMaterias,
    truncateCreditos,
    truncateEvaluacion,
    truncateControl,
    truncateIngreso
}