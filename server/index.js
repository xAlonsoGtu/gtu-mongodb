// Importamos librerias
import express, { json, urlencoded, static as static_ } from 'express'; //rest api
import cors from 'cors'; //envio de peticiones dentro del servidor
//import router from './routes/index.routes.js'; //cargamos archivo de rutas principal
import dotenv from 'dotenv'; //para usar variables de entorno
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import mongoService from './provider/mongoDb.js'

// Obtenemmos url actual y directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inciamos configuracion de archivo .env para guardar claves secretas
dotenv.config();

// Obtenemos el ambiente(pruebas o producción)
const nodeEnv = process.env.NODE_ENV || 'development';
console.log(`Running in ${nodeEnv} mode`);

// Indicamos el puerto de escucha del servidor
const PORT = process.env.PORT || 3001;

// Iniciamos objeto express para crear el servidor api rest
const app = express();

// Configuramos servidor express
app.use(cors()) //Indicamos uso de cors (Cross-Origin Resource Sharing) - origen cruzado de datos
app.use(json()); //Indicamos uso de json para convertir peticiones en JSON
app.use(urlencoded({ extended: true })); //Indicamos uso de urlencoded para convertir form-data en JSON

// Indicamos uso de rutas
//app.use('/api', router);


// Probamos proveedor
//await mongoService.probarConexion();

// Creamos collecion
//await mongoService.crearCollection();

// C = creamos documento
//await mongoService.addSimple();
//await mongoService.addComplex();

// R = leemos documento
//await mongoService.findOne();
//await mongoService.find();

// U = actualizamos documento
//await mongoService.update();
//await mongoService.updateMany();

// D = borramos documento
//await mongoService.delete();
//await mongoService.deleteMany();

app.get('/', (req, res) => {
  res.send('Hola!');
});


// Iniciamos servidor en PORT
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
