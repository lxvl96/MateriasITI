const { pool } = require('../Configs/Psql/Connections')
const keys = require('../Models/Keys')
//Methods Query Get Materias de PSQL
const getMaterias = async (req, res, next) => {
    try {
        //5ed1d6c15532d18f00e3ad99
        let keyInput = req.params.apikey;
        console.log(keyInput);
        
        // const keyBD = await keys.findById(keyInput)
        // if (keyInput = keyBD) {
            //getMaterias
            let ncontrol = req.params.ncontrol;
            const queryMaterias = await pool.query(`select materia.nombre as materia,
        creditos.credito , CONCAT(periodos.periodo_corto,'/',c.año) as periodo,
        c.calificacion, 
        evaluacion.nombre_corto as oportunidad 
        FROM (SELECT left(periodo_cursado,4) as año,unnest(string_to_array(right(periodo_cursado, length(periodo_cursado)-4) ,NULL)) as tipo ,periodo_cursado, clave_materia , ncontrol ,oportunidad, calificacion FROM control order by periodo_cursado , clave_materia) as c
        INNER JOIN Materia ON materia.clave = c.clave_materia 
        INNER JOIN creditos ON materia.clave = creditos.clave_materia 
        INNER JOIN periodos ON c.tipo = periodos.tipo
        INNER JOIN evaluacion on c.oportunidad = evaluacion.clave and c.ncontrol ='${ncontrol}'`)

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

            //get Response to clients
            res.json({
                nControl: ncontrol,
                promedioGeneral: queryPromGeneral.rows[0].promgen,
                creditosAcumulados: queryCreditos.rows[0].sum,
                porcentajeAvance: queryPorcentajeAvance.rows[0].porcentaje,
                materiasInfo: queryMaterias.rows
            })

        // } else {
        //     res.json({ msg: 'Error , No Tienes Accesso a La API' })
        // }
        //res.json({ nControl: ncontrol, porcentajeAvance: porcentaje.rows[0].porcentaje + '%', promedioGeneral: parseInt(promedio.rows[0].avg).toString(), creditosAcumulados: creditos.rows[0].sum, materiasInfo: materias.rows })
    } catch (error) {
        res.json({ msg: 'Error Database Connection' })
    }
}

//exports
module.exports = {
    getMaterias
}