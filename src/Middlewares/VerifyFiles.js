const verifyMateria = async (req, res, next) => {
    if (!req.files) {
        req.flash('noSuccess', 'No Se Ha Seleccionado CSV');
        res.redirect('/dashboard')
    }
    if (!req.files.csvMaterias) {
        req.flash('noSuccess', 'No Se Ha Subido Satisfactoriamente');
        res.redirect('/dashboard')
    }
    if (req.files.csvMaterias.mimetype != "text/csv") {
        req.flash('noSuccess', 'Formato No Soportado , Solo Formatos CSV');
        res.redirect('/dashboard')
    }
    next()
}

const verifyCreditos = async (req, res, next) => {
    if (!req.files) {
        req.flash('noSuccess', 'No Se Ha Seleccionado CSV');
        res.redirect('/dashboard')
    }
    if (!req.files.csvCreditos) {
        req.flash('noSuccess', 'No Se Ha Subido Satisfactoriamente');
        res.redirect('/dashboard')
    }
    if (req.files.csvCreditos.mimetype != "text/csv") {
        req.flash('noSuccess', 'Formato No Soportado , Solo Formatos CSV');
        res.redirect('/dashboard')
    }
    next()
}

const verifyControl = async (req, res, next) => {
    if (!req.files) {
        req.flash('noSuccess', 'No Se Ha Seleccionado CSV');
        res.redirect('/dashboard')
    }
    if (!req.files.csvControl) {
        req.flash('noSuccess', 'No Se Ha Subido Satisfactoriamente');
        res.redirect('/dashboard')
    }
    if (req.files.csvControl.mimetype != "text/csv") {
        req.flash('noSuccess', 'Formato No Soportado , Solo Formatos CSV');
        res.redirect('/dashboard')
    }
    next()
}

const verifyEvaluacion = async (req, res, next) => {
    if (!req.files) {
        req.flash('noSuccess', 'No Se Ha Seleccionado CSV');
        res.redirect('/dashboard')
    }
    if (!req.files.csvEvaluacion) {
        req.flash('noSuccess', 'No Se Ha Subido Satisfactoriamente');
        res.redirect('/dashboard')
    }
    if (req.files.csvEvaluacion.mimetype != "text/csv") {
        req.flash('noSuccess', 'Formato No Soportado , Solo Formatos CSV');
        res.redirect('/dashboard')
    }
    next()
}

module.exports = {
    verifyMateria,
    verifyCreditos,
    verifyEvaluacion,
    verifyControl
}