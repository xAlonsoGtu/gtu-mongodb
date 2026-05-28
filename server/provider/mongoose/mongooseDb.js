// Instalamos mongoose
// npm install mongoose

// Importamos libreria de mongoose
import mongoose from 'mongoose';

// CONSTANTES
// Nombre de tus Bases de datos
const BD_E1 = "ejemplo1";

// Nombre de colecciones
const COLL_MOVIES = "movies";
const COLL_PIZZAS = "pizzas";

// Definimos uri de conexión de acceso a la BD
const URI = "mongodb+srv://alonsogonzalez_db_user:qmZl9VpNAvqX9kKh@gtu.5jdljfh.mongodb.net/?appName=GTU";
     
// const uri = "mongodb://localhost:27017/mydb";

//Importamos modelos
import Movie  from './schema/movie.scheme.js';
//var Movie = require('./schema/movie.scheme.js')

// CLASE
// Definimos la clase del proveedor con sus funciones
class MongooseService{
    // Prueba de conexión
    // Si usas Atlas, verificar que la IP de tu equipo este registrada en "IP Access List" dentro de SECURITY -> NETWORK ACCESS
    async probarConexion() {
        try {
            // Conecta el cliente al servidor, opcional           
            await mongoose.connect(URI,  {dbName: BD_E1});
            await mongoose.connection.db.command({ ping: 1 });
            console.log("Pin logrado. Conexión correcta a MongoDB por Mongoose!");
        }
        catch(e){
            console.log(e);
        } 
        finally {
            // Nos aseguramos de cerrar la conexión al final
            //await client.close();
        }
    }

    async addSimple() {
        try {
            // Nos conectamos a nuestra BD
            await mongoose.connect(URI,  {dbName: BD_E1});

            //Definimos el objeto
            const obj = { title: "I Married a Witch 2", 
                genres: ["Comedy", "Fantasy", "Romance"], 
                year: 1942, 
                cast: ["Veronica Lake", "Fredric March", "Susan Hayward"], 
                imdb: { rating: 8.5, votes: 35673, id: 368228 } };
        
            // OPCION 1
            // Creamos el modelo
            const nMovie = new Movie(obj);

            // Guardamos el modelo
            var res = await nMovie.save();

            // OPCION 2
            //var res = await Movie.create(obj);
            
            // Mostramos resultado
            console.log(res);
        }
        catch(e){
            console.log(e);
        } 
        finally {
            // Nos aseguramos de cerrar la conexión al final
            await mongoose.disconnect();
        }
    }    

    async addMultiple() {
        try {
            // Nos conectamos a nuestra BD
            await mongoose.connect(URI,  {dbName: BD_E1});

            //Definimos el objeto
            const newMovies = [
                { title: "Arsenic and Old Lace 1", genres: ["Comedy", "Romance"], year: 1944, cast: ["Cary Grant", "Priscilla Lane", "Raymond Massey"], imdb: { rating: 6, votes: 25673, id: 368226 } },
                { title: "Ball of Fire 1", genres: ["Comedy", "Romance"], year: 1941, cast: ["Gary Cooper", "Barbara Stanwyck", "Oskar Homolka"], imdb: { rating: 3.5, votes: 15673, id: 368227 } },
                { title: "I Married a Witch 1", genres: ["Comedy", "Fantasy", "Romance"], year: 1942, cast: ["Veronica Lake", "Fredric March", "Susan Hayward"], imdb: { rating: 8.5, votes: 35673, id: 368228 } },
            ];
            
            // Insertamos multiples registros
            var res = await Movie.insertMany(newMovies);
            
            // Mostramos resultado
            console.log(res);
        }
        catch(e){
            console.log(e);
        } 
        finally {
            // Nos aseguramos de cerrar la conexión al final
            await mongoose.disconnect();
        }
    }    
    
    async find() {
        try {
            // Nos conectamos a nuestra BD
            await mongoose.connect(URI,  {dbName: BD_E1});

            // Iniciamos query, title LIKE
            const query = Movie.find({  title: /Fire/i });

            // Seleccionamos que campos usar
            query.select("title genres");

            // Limitamos los resultados
            query.limit(3);

            // Ordenamos
            query.sort({ title: -1 });

            // Ejecutamos query
            var res = await query.exec();

            // Mostramos resultado
            console.log(res);
        }
        catch(e){
            console.log(e);
        } 
        finally {
            // Nos aseguramos de cerrar la conexión al final
            await mongoose.disconnect();
        }
    }     

    async findById() {
        try {
            // Nos conectamos a nuestra BD
            await mongoose.connect(URI,  {dbName: BD_E1});

            // Iniciamos query, title LIKE
            const query = Movie.findById('6a040e1c62478c131a1a9c2a');

            // Seleccionamos que campos usar
            query.select("title genres");

            // Ejecutamos query
            var res = await query.exec();`^`

            // Mostramos resultado
            console.log(res);
        }
        catch(e){
            console.log(e);
        } 
        finally {
            // Nos aseguramos de cerrar la conexión al final
            await mongoose.disconnect();
        }
    }    

    async update() {
        try {
            // Nos conectamos a nuestra BD
            await mongoose.connect(URI,  {dbName: BD_E1});

            // Actualizamos valor que coincida con el filtro
            var res = await Movie.updateOne({ _id: '6a040e1c62478c131a1a9c2a' }, { title: 'Película 1' });
            
            // Mostramos resultado
            console.log(res);
        }
        catch(e){
            console.log(e);
        } 
        finally {
            // Nos aseguramos de cerrar la conexión al final
            await mongoose.disconnect();
        }
    }
        
    async delete() {
        try {
            // Nos conectamos a nuestra BD
            await mongoose.connect(URI,  {dbName: BD_E1});
            
            // Actualizamos valor que coincida con el filtro
            var res = await Movie.deleteOne({ _id: '6a0b5d2f1efd3eac34d65da5' });

            // Mostramos resultado
            console.log(res);
        }
        catch(e){
            console.log(e);
        } 
        finally {
            // Nos aseguramos de cerrar la conexión al final
            await mongoose.disconnect();
        }
    }
    
}

export default new MongooseService();