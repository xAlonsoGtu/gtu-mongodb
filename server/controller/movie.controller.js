import XlsService from "../provider/exceljs/xls.service.js";

// Definimos objeto controlador
const movieCtrl = {}

// Función para importar - CREATE
movieCtrl.importar = async (req, res) => {
    // Generalmente obtenemos valores de req.body
    try{
        // Declaramos nombre del archivo
        let filename = "";

        // Validamos si hay archivo guardado
        if(req.file != null && req.file != undefined && req.file.filename != null){
            filename = req.file.filename;
        }         

        // Obtenemos datos del archivo excel
        var rDatos = await XlsService.importar(filename);
        if(rDatos == null) res.status(400).send({ success: false, error: "No hay datos"});

        // Declaramos lista de peliculas
        var aMovies = new Array();

        // Iteramos sobre los datos para ir creando las peliculas
        rDatos.forEach((row, rowNumber) => {
            // No agregamos la primer fila correspondiente a los títulos
            if(rowNumber != 1){
                // Creamos nuevo objeto
                var nMovie =  { title: row[1], year: row[2]};
                
                // Lo agregamos a la lista
                aMovies.push(nMovie);
            }
        });

        // Guardamos datos en BD

        // Podemos eliminar archivo

        // Devolvemos success
        return res.status(200).send({ success: true, payload: aMovies });
    }
    catch(e){
        // Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
        return res.status(400).send({ success: false, error: e.message});
    }
}

// Función para agregar - CREATE
movieCtrl.agregar = async (req, res) => {
    // Generalmente obtenemos valores de req.body
    try{
        // Devolvemos success
        res.status(200).send("");
    }
    catch(e){
        // Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
    }
}

// Función para buscar - READ
movieCtrl.buscar = async(req, res) => {
    // Generalmente obtenemos valores de req.query
    try{
        // Devolvemos success
        res.status(200).send("");
    }
    catch(e){
        // Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
    }
}

// Función para editar - UPDATE
movieCtrl.editar = async (req, res) => {
    // Generalmente obtenemos valores de req.body
    try{
        // Devolvemos success
        res.status(200).send("");
    }
    catch(e){
        // Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
    }
}

// Función para eliminar - DELETE
movieCtrl.eliminar = async (req, res) => {
    // Generalmente obtenemos valores de req.params
    try{
        // Devolvemos success
        res.status(200).send("");
    }
    catch(e){
        // Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
    }
}

// Función para obtener - READ GET
movieCtrl.obtener = async (req, res) => {
    // Generalmente obtenemos valores de req.params
    try{
        // Devolvemos success
        res.status(200).send("");
    }
    catch(e){
        // Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
    }
}

export default movieCtrl;