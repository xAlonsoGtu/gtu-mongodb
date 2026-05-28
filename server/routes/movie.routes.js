//Importamos librerias
import { Router } from 'express';
const routerMovie = Router();

//Importamos controllador
import movieCtrl from '../controller/movie.controller.js';
import { upload_temporal_xls } from '../midleware/multer.js';

//Indicamos rutas
//Si la ruta es POST con la URL /add, entonces ejecutamos el método 'add' del controlador
//Ejecutamos las funciones middleware antes de la función del controlador
routerMovie.post('/agregar', movieCtrl.agregar);
routerMovie.post('/importar', upload_temporal_xls.single('file'), movieCtrl.importar);

//Rutas con PUT
routerMovie.put('/editar', movieCtrl.editar);

//Ruta con DELETE
routerMovie.delete('/eliminar/:id', movieCtrl.eliminar);

//Ruta con GET
routerMovie.get('/buscar', movieCtrl.buscar);
routerMovie.get('/:id', movieCtrl.obtener);

//Exportamos las nuevas rutas creadas para que puedan ser usadas por index.routes
export default routerMovie;