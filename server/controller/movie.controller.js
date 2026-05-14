// Definimos objeto controlador
const movieCtrl = {}

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