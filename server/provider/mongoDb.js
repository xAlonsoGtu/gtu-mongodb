// Importamos libreria de mongodb
import { MongoClient, ServerApiVersion } from 'mongodb';

// CONSTANTES
// Nombre de tus Bases de datos
const BD_E1 = "ejemplo1";

// Nombre de colecciones
const COLL_MOVIES = "movies";
const COLL_PIZZAS = "pizzas";

// Definimos uri de conexión de acceso a la BD
const uri = "mongodb+srv://alonsogonzalez_db_user:PEvTL6274nXC1vAv@gtu.5jdljfh.mongodb.net/?appName=GTU";
// const uri = "mongodb://localhost:27017/mydb";

// Creamos un cliente de mongoDb para ejecutar la conexión
const client = new MongoClient(uri);

// CLASE
// Definimos la clase del proveedor con sus funciones
class MongoService{
    // Prueba de conexión
    // Si usas Atlas, verificar que la IP de tu equipo este registrada en "IP Access List" dentro de SECURITY -> NETWORK ACCESS
    async probarConexion() {
        try {
            // Conecta el cliente al servidor, opcional
            await client.connect();

            // Enviamos ping a una base de datos
            await client.db(BD_E1).command({ ping: 1 });
            console.log("Pin logrado. Conexión correcta a MongoDB!");
        }
        catch(e){
            console.log(e);
        } 
        finally {
            // Nos aseguramos de cerrar la conexión al final
            await client.close();
        }
    }

    async crearCollection() {
        try {
            // Conecta el cliente al servidor
            await client.connect();
            
            // Indicamos sobre que BD trabajaremos
            const database = client.db(BD_E1);

            // Creamos nueva colección
            const createColl = await database.createCollection('coleccionParaBorrar');
            
            // Obtenemos coleciones actuales, nos devuelve un apuntador
            const colls = database.listCollections();

            // Iteramos apuntador
            for await (const doc of colls) {
                // Mostramos nombre de la colección
                console.log(doc);
            }            

            // Podemos borrar colecciones
            // Obtenemos la colección
            const collectionToDelete = database.collection('coleccionParaBorrar');

            // Ejecutamos acción de eliminar
            await collectionToDelete.drop();

        }
        catch(e){
            console.log(e);
        } 
        finally {
            // Nos aseguramos de cerrar la conexión al final
            await client.close();
        }
    }    

    async addSimple() {
        try {
            // Conecta el cliente al servidor
            await client.connect();            

            // Indicamos sobre que BD trabajaremos
            const database = client.db(BD_E1);

            // Indicamos sobre que colección trabajaremos
            const pizzas = database.collection(COLL_PIZZAS);

            // Creamos un documento para guardar en la BD
            const doc = { name: "Neapolitan pizza", shape: "round" };

            // Insertamos el documento en la colección
            const result = await pizzas.insertOne(doc);
            
            // Mostramos el id generado
            console.log(`Nuevo documento generado con el _id: ${result.insertedId}`);

            // Podemos insertgar varias registros al mismo tiempo
            // Definimos un arreglo de documentos
            const docs = [
                { name: "Sicilian pizza", shape: "square" },
                { name: "New York pizza", shape: "round" },
                { name: "Grandma pizza", shape: "square" }
            ];

            // Insertamos los documentos en la colección
            const insertManyresult = await pizzas.insertMany(docs);

            // Obtenemos los id generados
            let ids = insertManyresult.insertedIds;

            // Mostramos el número de ids generados
            console.log(`${insertManyresult.insertedCount} documentos fueron generados.`);
        }
        catch(e){
            console.log(e);
        } 
        finally {
            // Nos aseguramos de cerrar la conexión al final
            await client.close();
        }
    }      
    
    async addComplex() {
        try {
            // Conecta el cliente al servidor
            await client.connect();

            // Indicamos sobre que BD trabajaremos
            const database = client.db(BD_E1);

            // Indicamos sobre que colección trabajaremos
            const movies = database.collection(COLL_MOVIES);
            
            // Definimos un arreglo de documentos
            const newMovies = [
                { title: "Arsenic and Old Lace", genres: ["Comedy", "Romance"], year: 1944, cast: ["Cary Grant", "Priscilla Lane", "Raymond Massey"], imdb: { rating: 6, votes: 25673, id: 368226 } },
                { title: "Ball of Fire", genres: ["Comedy", "Romance"], year: 1941, cast: ["Gary Cooper", "Barbara Stanwyck", "Oskar Homolka"], imdb: { rating: 3.5, votes: 15673, id: 368227 } },
                { title: "I Married a Witch", genres: ["Comedy", "Fantasy", "Romance"], year: 1942, cast: ["Veronica Lake", "Fredric March", "Susan Hayward"], imdb: { rating: 8.5, votes: 35673, id: 368228 } },
            ];

            // Opciones de configuración al momento de guardar objeto, ordered: previene que documentos adicionales sean agregados si uno falla.
            const options = { ordered: true };

            // Insertamos los documentos en la colección
            const insertManyresult = await movies.insertMany(newMovies, options);
        
            // Mostramos el número de ids generados
            console.log(`${insertManyresult.insertedCount} documentos fueron generados.`);
        } finally {
            // Nos aseguramos de cerrar la conexión al final
            await client.close();
        }
    }    


    async findOne() {
        try {    
            // Conecta el cliente al servidor
            await client.connect();

            // Indicamos sobre que BD trabajaremos
            const database = client.db(BD_E1);

            // Indicamos sobre que colección trabajaremos
            const movies = database.collection(COLL_MOVIES);

            // Query de búsqueda
            const query = { title: "Ball of Fire" };

            // Opciones de búsqueda
            const options = {
                // Ordenamiento por year descendente
                sort: { "year": -1 },
                // Incluir los siguientes campos
                projection: { _id: 0, title: 1, genres: 1 },
            };

            // Ejecutamos query, esperamos a que la promesa nos devuelva un objeto
            // El método findOne() devuelve una instancia Promise
            const movie = await movies.findOne(query, options);

            // Mostramos resultado
            console.log(movie);
        } finally {
            // Nos aseguramos de cerrar la conexión al final
            await client.close();
        }
    }

    async find() {
        try {            
            // Conecta el cliente al servidor
            await client.connect();
            
            // Indicamos sobre que BD trabajaremos
            const database = client.db(BD_E1);

            // Indicamos sobre que colección trabajaremos
            const movies = database.collection(COLL_MOVIES);      
            
            // Query de películas antes del año 1942
            const query = { year: { $lt: 1945 } };

            // Ordenamiento por titulo y año ascendente
            const sortFields = { title: 1, year: 1 };

            // Campos a mostrar
            const projectFields = { _id: 0, title: 1, genres: 1, year: 1 };

            // Ejecutamos query 
            // El método find() devuelve una instancia Cursor desde la cual se puede acceder a los documentos.
            const cursor = movies.find(query).sort(sortFields).project(projectFields);

            // Validar que haya docuementos
            if ((await movies.countDocuments(query)) === 0) {
                console.log("Sin documentos!");
            }

            // Iteramos sobre el cursos
            for await (const doc of cursor) {
                // Mostramos documento
                console.dir(doc);
            }

            // OTRAS CONFIGURACIONES
            // Puedes buscar por fecha
            // const findResult = movies.find({
            //   name: "Lemony Snicket",
            //   date: {
            //     $gte: new Date(new Date().setHours(00, 00, 00)),
            //     $lt: new Date(new Date().setHours(23, 59, 59)),
            //   },
            // });            

            // Usar skip y limit para crear paginator
            //const cursor = movies.find(query).sort({ title: 1 }).skip(1).limit(1);
            
            // Validar cantidades
            //const query = { qty: { $not: { $gt: 5 }}};

            // Especificar que no queremos valore repetidos
            //const cursor = movies.distinct("borough");

            // Crear index para mejorar busquedas
            //await db.movies.createIndex({ title: "text" });
            //await db.movies.createIndex({ title: "text", plot: "text" });            

            // Crear un query que busque un string que contenga "trek"
            //const query = { $text: { $search: "trek" } };                        
        } finally {
            // Nos aseguramos de cerrar la conexión al final
            await client.close();
        }
    }    
    
    async update() {
        try {       
            // Conecta el cliente al servidor
            await client.connect();
                 
            // Indicamos sobre que BD trabajaremos
            const database = client.db(BD_E1);

            // Indicamos sobre que colección trabajaremos
            const movies = database.collection(COLL_MOVIES);    

            // Query para identificar que documento actualizar
            const filter = { title: "Arsenic and Old Lace" };
            
            // Docuemento con atributos a actualizar
            const updateDocument = {
                $set: {
                    year: 1955,
                }
            };

            // Actualizamos documento
            const result = await movies.updateOne(filter, updateDocument);
            
            // Mostramos resultado
            console.log(
                `${result.matchedCount} documento(s) encontrados en el filter, ${result.modifiedCount} documento(s) actualizados`,
            );

        } finally {
            // Nos aseguramos de cerrar la conexión al final
            await client.close();
        }
    }    

    async updateMany() {
        try {
            // Conecta el cliente al servidor
            await client.connect();
            
            // Indicamos sobre que BD trabajaremos
            const database = client.db(BD_E1);

            // Indicamos sobre que colección trabajaremos
            const movies = database.collection(COLL_MOVIES);   

            // Query para identificar que documento actualizar
            const filter = { year: 1941 };

            // Docuemento con atributos a actualizar
            const updateDoc = {
                $set: {
                    random_review: `After viewing I am ${
                    100 * Math.random()
                    }% more satisfied with life.`,
                },
            };

            // Actualizamos documentos
            const result = await movies.updateMany(filter, updateDoc);
                     
            // Mostramos resultado
            console.log(`${result.modifiedCount} documento(s) actualizados`);
        } finally {
            // Nos aseguramos de cerrar la conexión al final
            await client.close();
        }
    }

    async delete() {
        try {
            // Conecta el cliente al servidor
            await client.connect();
            
            // Indicamos sobre que BD trabajaremos
            const database = client.db(BD_E1);

            // Indicamos sobre que colección trabajaremos
            const movies = database.collection(COLL_MOVIES);   

            // Query para identificar el documento a borrar
            const query = { title: "Arsenic and Old Lace" };

            // Ejecutamos borrado
            const result = await movies.deleteOne(query);

            // Validamos resultado
            if (result.deletedCount === 1) {
                console.log("Se borró documento.");
            } else {
                console.log("No se borró el documento.");
            }
        } finally {
            // Nos aseguramos de cerrar la conexión al final
            await client.close();
        }
    }   

    async deleteMany() {
        try {
            // Conecta el cliente al servidor
            await client.connect();
            
            // Indicamos sobre que BD trabajaremos
            const database = client.db(BD_E1);

            // Indicamos sobre que colección trabajaremos
            const movies = database.collection(COLL_MOVIES);   

            // Query para identificar el documento a borrar
            const query = { title: { $regex: "Arsenic" } };

            // Ejecutamos borrado
            const result = await movies.deleteMany(query);
            
            // Mostramos resultado
            console.log("Deleted " + result.deletedCount + " documento(s)");
        } finally {
            // Nos aseguramos de cerrar la conexión al final
            await client.close();
        }
    }    
}

export default new MongoService();