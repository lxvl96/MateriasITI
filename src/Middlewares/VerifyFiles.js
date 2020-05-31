const verifyMateria = async (req, res, next) => {
    if (!req.files) {
        req.flash('noSuccess', 'No Se Ha Seleccionado CSV');
        res.redirect('/dashboard')
    }
    if (!req.files.csvMaterias) {
        req.flash('noSuccess', 'No Se Ha Subido Satisfactoriamente');
        res.redirect('/dashboard')
    }
    /*
    if (req.files.csvMaterias.mimetype != "text/csv" || req.files.csvMaterias.mimetype != "application/csv" || req.files.csvMaterias.minetype != "application/x-csv" || req.files.csvMaterias.mimetype != "text/coma-separated-values" || req.files.csvMaterias.mimetype != "text/x-coma-separated-values") {
        req.flash('noSuccess', 'Formato No Soportado , Solo Formatos CSV');
        res.redirect('/dashboard')
    }*/
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
    } /*
    if (req.files.csvCreditos.mimetype != "text/csv" || req.files.csvCreditos.mimetype != "application/csv" || req.files.csvCreditos.minetype != "application/x-csv" || req.files.csvCreditos.mimetype != "text/coma-separated-values" || req.files.csvCreditos.mimetype != "text/x-coma-separated-values") {
        req.flash('noSuccess', 'Formato No Soportado , Solo Formatos CSV');
        res.redirect('/dashboard')
    }*/
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
    /*
    if (req.files.csvControl.mimetype != "text/csv" || req.files.csvControl.mimetype != "application/csv" || req.files.csvControl.minetype != "application/x-csv" || req.files.csvControl.mimetype != "text/coma-separated-values" || req.files.csvControl.mimetype != "text/x-coma-separated-values") {
        req.flash('noSuccess', 'Formato No Soportado , Solo Formatos CSV');
        res.redirect('/dashboard')
    }*/
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
    /*
    if (req.files.csvEvaluacion.mimetype != "text/csv" || req.files.csvEvaluacion.mimetype != "application/csv" || req.files.csvEvaluacion.minetype != "application/x-csv" || req.files.csvEvaluacion.mimetype != "text/coma-separated-values" || req.files.csvEvaluacion.mimetype != "text/x-coma-separated-values") {
        req.flash('noSuccess', 'Formato No Soportado , Solo Formatos CSV');
        res.redirect('/dashboard')
    }*/
    next()
}

module.exports = {
    verifyMateria,
    verifyCreditos,
    verifyEvaluacion,
    verifyControl
}