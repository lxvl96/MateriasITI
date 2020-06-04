const { pool } = require('../Configs/Psql/Connections')
const keys = require('../Models/Keys')
const fetch = require('node-fetch')
//Methods Query Get Materias de PSQL
const getMaterias = async (req, res, next) => {
    try {
        //5ed1d6c15532d18f00e3ad99
        let keyInput = req.params.apikey;
        console.log(keyInput);

        const keyBD = await keys.findById(keyInput)
        if (keyInput = keyBD) {
            //getMaterias
            let ncontrol = req.params.ncontrol;
            const queryMaterias = await pool.query(`select materia.nombre as materia, c.clave_materia,
            creditos.credito ,
            CONCAT(periodos.periodo_corto,'/',c.año) as periodo,
            c.calificacion,s.semestre, 
            evaluacion.nombre_corto as oportunidad
            FROM (SELECT left(periodo_cursado,4) as año,unnest(string_to_array(right(periodo_cursado, length(periodo_cursado)-4) ,
            NULL)) as tipo,
            id ,periodo_cursado, periodo_acreditado,clave_materia , ncontrol ,oportunidad, calificacion FROM control 
            order by periodo_cursado , clave_materia) as c
            INNER JOIN Materia ON materia.clave = c.clave_materia
            INNER JOIN periodo_iniciales as pi ON pi.ncontrol = c.ncontrol 
            INNER JOIN creditos ON materia.clave = creditos.clave_materia 
            INNER JOIN periodos ON c.tipo = periodos.tipo
            INNER JOIN semestre as s ON s.comparador = CAST( c.periodo_cursado AS INTEGER) - CAST(pi.periodo_ingreso AS INTEGER)
            INNER JOIN evaluacion on c.oportunidad = evaluacion.clave and c.ncontrol ='${ncontrol}' order by c.id`)

            //getPromedioGeneral
            // const queryPromGeneral = await pool.query(`select trunc(AVG(cast(calificacion as INTEGER)),2) from control where calificacion != 'AC' and ncontrol ='${ncontrol}'`)
            let queryPromGeneral = await pool.query(`select trunc(AVG(cast(calificacion as INTEGER)),2) as promgen  from control as c where calificacion != '0' and calificacion != 'AC' and calificacion != 'NA' and ncontrol='${ncontrol}'`)

            //getCreditosAcumulados
            let queryCreditos = await pool.query(`select sum(creditos.credito) FROM (select * from control where calificacion != 'NA') as c 
        INNER JOIN Materia ON materia.clave = c.clave_materia 
        INNER JOIN creditos ON materia.clave = creditos.clave_materia where c.ncontrol= '${ncontrol}'`)

            //get Porcentaje de Avance de Creditos
            let queryPorcentajeAvance = await pool.query(`select sum(creditos.credito) * 100 / 260 as porcentaje FROM (select * from control where calificacion != 'NA') as c 
        INNER JOIN Materia ON materia.clave = c.clave_materia 
        INNER JOIN creditos ON materia.clave = creditos.clave_materia where c.ncontrol= '${ncontrol}'`)
            //quedo
            //get Response to clients
            res.json({
                nControl: ncontrol,
                promedioGeneral: queryPromGeneral.rows[0].promgen,
                creditosAcumulados: queryCreditos.rows[0].sum,
                porcentajeAvance: queryPorcentajeAvance.rows[0].porcentaje,
                materiasInfo: queryMaterias.rows
            })

        } else {
            res.json({ msg: 'Error , No Tienes Accesso a La API' })
        }
        //res.json({ nControl: ncontrol, porcentajeAvance: porcentaje.rows[0].porcentaje + '%', promedioGeneral: parseInt(promedio.rows[0].avg).toString(), creditosAcumulados: creditos.rows[0].sum, materiasInfo: materias.rows })
    } catch (error) {
        res.json({ msg: 'Database Connection Eroor or Server Connections Error }' })
    }
}

//getSemestreActual
const getData = async url => {
    try {
        const controller = new AbortController();
        const signal = controller.signal

        setTimeout(() => {
            controller.abort()
        }, 1000)

        const response = await fetch(url, { signal });
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};


const getSemestreActual = async (req, res, next) => {

    let sem = req.params.semestre;
    let nc = req.params.ncontrol
    let keyInput = req.params.apikey;
    console.log(nc);

    // const keyBD = await keys.findById(keyInput)
    // if (keyInput = keyBD) {
    const url = `https://mat.istmo.tecnm.mx/materias/${nc}/${keyInput}`;
    // const url = `https://127.0.0.1/materias/${nc}/${keyInput}`;
    console.log(url);

    let mats = await getData(url);
    let nControl = mats.nControl;
    let porcentajeAvance = mats.porcentajeAvance;
    let promedioGeneral = mats.promedioGeneral;
    let creditosAcumulados = mats.creditosAcumulados;
    let materiasInf = mats.materiasInfo;
    let materiasInfo = materiasInf.filter(materiasInf => materiasInf.semestre == sem);

    res.json({ nControl, porcentajeAvance, promedioGeneral, creditosAcumulados, materiasInfo })
    // res.json({keyInput})
};

const getSemestre = async (req, res, next) => {

    try {
        //5ed1d6c15532d18f00e3ad99
        let keyInput = req.params.apikey;
        let sem = req.params.semestre;
        console.log(keyInput);

        const keyBD = await keys.findById(keyInput)
        if (keyInput = keyBD) {
            //getMaterias
            let ncontrol = req.params.ncontrol;
            const queryMaterias = await pool.query(`select materia.nombre as materia, c.clave_materia,
            creditos.credito ,
            CONCAT(periodos.periodo_corto,'/',c.año) as periodo,
            c.calificacion,s.semestre, 
            evaluacion.nombre_corto as oportunidad
            FROM (SELECT left(periodo_cursado,4) as año,unnest(string_to_array(right(periodo_cursado, length(periodo_cursado)-4) ,
            NULL)) as tipo,
            id ,periodo_cursado, periodo_acreditado,clave_materia , ncontrol ,oportunidad, calificacion FROM control 
            order by periodo_cursado , clave_materia) as c
            INNER JOIN Materia ON materia.clave = c.clave_materia
            INNER JOIN periodo_iniciales as pi ON pi.ncontrol = c.ncontrol 
            INNER JOIN creditos ON materia.clave = creditos.clave_materia 
            INNER JOIN periodos ON c.tipo = periodos.tipo
            INNER JOIN semestre as s ON s.comparador = CAST( c.periodo_cursado AS INTEGER) - CAST(pi.periodo_ingreso AS INTEGER)
            INNER JOIN evaluacion on c.oportunidad = evaluacion.clave and c.ncontrol ='${ncontrol}' order by c.id`)

            //getPromedioGeneral
            // const queryPromGeneral = await pool.query(`select trunc(AVG(cast(calificacion as INTEGER)),2) from control where calificacion != 'AC' and ncontrol ='${ncontrol}'`)
            let queryPromGeneral = await pool.query(`select trunc(AVG(cast(calificacion as INTEGER)),2) as promgen  from control as c where calificacion != '0' and calificacion != 'AC' and calificacion != 'NA' and ncontrol='${ncontrol}'`)

            //getCreditosAcumulados
            let queryCreditos = await pool.query(`select sum(creditos.credito) FROM (select * from control where calificacion != 'NA') as c 
        INNER JOIN Materia ON materia.clave = c.clave_materia 
        INNER JOIN creditos ON materia.clave = creditos.clave_materia where c.ncontrol= '${ncontrol}'`)

            //get Porcentaje de Avance de Creditos
            let queryPorcentajeAvance = await pool.query(`select sum(creditos.credito) * 100 / 260 as porcentaje FROM (select * from control where calificacion != 'NA') as c 
        INNER JOIN Materia ON materia.clave = c.clave_materia 
        INNER JOIN creditos ON materia.clave = creditos.clave_materia where c.ncontrol= '${ncontrol}'`)
            //quedo
            //get Response to clients
            let queryMats = queryMaterias.rows;
            let matsData = queryMats.filter(queryMats => queryMats.semestre == sem);
            res.json({
                nControl: ncontrol,
                promedioGeneral: queryPromGeneral.rows[0].promgen,
                creditosAcumulados: queryCreditos.rows[0].sum,
                porcentajeAvance: queryPorcentajeAvance.rows[0].porcentaje,
                materiasInfo: matsData
            })

        } else {
            res.json({ msg: 'Error , No Tienes Accesso a La API' })
        }
        //res.json({ nControl: ncontrol, porcentajeAvance: porcentaje.rows[0].porcentaje + '%', promedioGeneral: parseInt(promedio.rows[0].avg).toString(), creditosAcumulados: creditos.rows[0].sum, materiasInfo: materias.rows })
    } catch (error) {
        res.json({ msg: 'Database Connection Eroor or Server Connections Error }' })
    }
}




//exports
module.exports = {
    getMaterias, getSemestreActual,getSemestre
}