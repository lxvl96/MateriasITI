const verifyMateria = async (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({
            status: "false",
            message: "No Se Subio Ningun Archivo"
        });
    }
    if (!req.files.csvMaterias) {
        return res.status(400).json({
            status: "false",
            message: "No Se Subio CSV de Materias"
        });
    }
    if (req.files.csvMaterias.mimetype != "text/csv") {
        return res.status(400).json({
            status: "false",
            message: "Formato No Soportado , Solo Formatos CSV"
        });
    }
    next()
}

const verifyCreditos = async (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({
            status: "false",
            message: "No Se Subio Ningun Archivo"
        });
    }
    if (!req.files.csvCreditos) {
        return res.status(400).json({
            status: "false",
            message: "No Se Subio CSV de Creditos"
        });
    }
    if (req.files.csvCreditos.mimetype != "text/csv") {
        return res.status(400).json({
            status: "false",
            message: "Formato No Soportado , Solo Formatos CSV"
        });
    }
    next()
}

const verifyControl = async (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({
            status: "false",
            message: "No Se Subio Ningun Archivo"
        });
    }
    if (!req.files.csvcontrol) {
        return res.status(400).json({
            status: "false",
            message: "No Se Subio CSV de Control"
        });
    }
    if (req.files.csvcontrol.mimetype != "text/csv") {
        return res.status(400).json({
            status: "false",
            message: "Formato No Soportado , Solo Formatos CSV"
        });
    }
    next()
}

const verifyEvaluacion = async (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({
            status: "false",
            message: "No Se Subio Ningun Archivo"
        });
    }
    if (!req.files.csvEvaluacion) {
        return res.status(400).json({
            status: "false",
            message: "No Se Subio CSV de Evaluacion"
        });
    }
    if (req.files.csvEvaluacion.mimetype != "text/csv") {
        return res.status(400).json({
            status: "false",
            message: "Formato No Soportado , Solo Formatos CSV"
        });
    }
    next()
}

module.exports = {
    verifyMateria,
    verifyCreditos,
    verifyEvaluacion,
    verifyControl
}