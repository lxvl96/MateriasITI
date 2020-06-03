const fs = require('fs')
const csv = require('fast-csv')
const { pool } = require('../Configs/Psql/Connections')


//Method for Add Register Materias
const addMaterias = (req, res, next) => {
    let csvMat = req.files.csvMaterias;
    let matPath = `${__dirname}/../Public/` + csvMat.name;
    csvMat.mv(matPath);
    let stream = fs.createReadStream(matPath);
    let csvData = [];
    let csvStream = csv.parse()
        .on("data", function (record) {
            csvStream.pause();
            for (var key in record) {
                record[key] = record[key].replace(/['"]+/g, '').trim()
            }
            let clave = record[0];
            let materia = record[1];
            pool.query("INSERT INTO materia (clave, nombre) \
            VALUES($1, $2)", [clave, materia], function (err) {
                if (err) {
                    console.log(err);
                }
            });
            csvStream.resume();
        }).on("end", function () {
            console.log("Successfully Registered Subjects!");
            fs.unlinkSync(matPath)
        }).on("error", function (err) {
            console.log(err);
        });
    stream.pipe(csvStream)
    // res.json({ msg: 'Successfully Registered Subjects!' })
    req.flash('createSuccess', 'Subido Satisfactoriamente');
    res.redirect('/dashboard')
}

const addEvaluacion = (req, res, next) => {
    let csvEval = req.files.csvEvaluacion;
    let evalPath = `${__dirname}/../Public/` + csvEval.name;
    csvEval.mv(evalPath);
    let stream = fs.createReadStream(evalPath);
    let csvData = [];
    let csvStream = csv.parse()
        .on("data", function (record) {
            csvStream.pause();
            for (var key in record) {
                record[key] = record[key].replace(/['"]+/g, '').trim()
            }
            let plan_estudio = record[0];
            let clave = record[1];
            let nombre_corto = record[2];
            let calificacion_aprobmini = record[3];
            pool.query("INSERT INTO evaluacion (plan_estudio, clave,nombre_corto,calificacion_aprobmini) \
            VALUES($1,$2,$3,$4)", [plan_estudio, clave, nombre_corto, calificacion_aprobmini], function (err) {
                if (err) {
                    console.log(err);
                }
            });
            csvStream.resume();
        }).on("end", function () {
            console.log("Successfully Registered Evaluacion!");
            fs.unlinkSync(evalPath)
        }).on("error", function (err) {
            console.log(err);
        });
    stream.pipe(csvStream)
    // next()
    req.flash('createSuccess', 'Subido Satisfactoriamente');
    res.redirect('/dashboard')
    // res.json({ msg: 'Successfully Registered Evaluacion!' })
}

const addCreditos = (req, res, next) => {
    let csvCred = req.files.csvCreditos;
    let credPath = `${__dirname}/../Public/` + csvCred.name;
    csvCred.mv(credPath);
    let stream = fs.createReadStream(credPath);
    let csvData = [];
    let csvStream = csv.parse()
        .on("data", function (record) {
            csvStream.pause();
            for (var key in record) {
                record[key] = record[key].replace(/['"]+/g, '').trim()
            }
            let clave = record[0];
            let materia = record[1];
            let credito = record[2];
            pool.query("INSERT INTO creditos (clave_especialidad,clave_materia,credito) \
            VALUES($1,$2,$3)", [clave, materia, credito], function (err) {
                if (err) {
                    console.log(err);
                }
            });
            csvStream.resume();
        }).on("end", function () {
            console.log("Successfully Registered Credits!");
            fs.unlinkSync(credPath)
        }).on("error", function (err) {
            console.log(err);
        });
    stream.pipe(csvStream)
    // next()
    req.flash('createSuccess', 'Subido Satisfactoriamente');
    res.redirect('/dashboard')
    //res.json({ msg: 'Successfully Registered Credits!' })
}

const addControl = (req, res, next) => {
    let csvCont = req.files.csvControl;
    let contrPath = `${__dirname}/../Public/` + csvCont.name;
    csvCont.mv(contrPath)
    let stream = fs.createReadStream(contrPath);
    let csvData = [];
    let csvStream = csv.parse()
        .on("data", function (record) {
            csvStream.pause();
            for (var key in record) {
                record[key] = record[key].replace(/['"]+/g, '').trim()
            }
            let ncontrol = record[0];
            let clave_materia = record[1];
            let periodCursad = record[2];
            let periodAcred = record[3];
            let calificacion = record[4];
            let oportunidad = record[5];
            pool.query("INSERT INTO control (ncontrol , clave_materia , periodo_cursado, periodo_acreditado , calificacion ,oportunidad) \
            VALUES($1,$2,$3,$4,$5,$6)", [ncontrol, clave_materia, periodCursad, periodAcred, calificacion, oportunidad], function (err) {
                if (err) {
                    console.log(err);
                }
            });
            csvStream.resume();
        }).on("end", function () {
            console.log("Successfully Registered Control!");
            fs.unlinkSync(contrPath)
        }).on("error", function (err) {
            console.log(err);
        });
    stream.pipe(csvStream)
    // next()
    req.flash('createSuccess', 'Subido Satisfactoriamente');
    res.redirect('/dashboard')
    // res.json({ msg: 'Successfully Registered Control!' })
}


const addIngreso = (req, res, next) => {
    let csvIngres = req.files.csvIngreso;
    let ingrPath = `${__dirname}/../Public/` + csvIngres.name;
    csvIngres.mv(ingrPath)
    let stream = fs.createReadStream(ingrPath);
    let csvData = [];
    let csvStream = csv.parse()
        .on("data", function (record) {
            csvStream.pause();
            for (var key in record) {
                record[key] = record[key].replace(/['"]+/g, '').trim()
            }
            let ncontrol = record[0];
            let periodoIngreso = record[1];
            pool.query("INSERT INTO periodo_iniciales (ncontrol ,periodo_ingreso) \
            VALUES($1,$2)", [ncontrol, periodoIngreso], function (err) {
                if (err) {
                    console.log(err);
                }
            });
            csvStream.resume();
        }).on("end", function () {
            console.log("Successfully Registered Control!");
            fs.unlinkSync(ingrPath)
        }).on("error", function (err) {
            console.log(err);
        });
    stream.pipe(csvStream)
    // next()
    req.flash('createSuccess', 'Subido Satisfactoriamente');
    res.redirect('/dashboard')
    // res.json({ msg: 'Successfully Registered Control!' })
}

module.exports = {
    addMaterias,
    addEvaluacion,
    addCreditos,
    addControl,
    addIngreso
}