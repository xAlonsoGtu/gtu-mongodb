
// Importamos libreria de mongoose
import mongoose from 'mongoose';

//Definimos schema sencillo
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 100 },
  genres: [String],
  year: Number,
  cast: [String],
  imdb: {
    rating: Number,
    votes: Number,
    id: Number
  }
});

// Exportamos schema
//module.exports = movieSchema;

// Exporamos modelo
export default mongoose.model('Movie', movieSchema);
//title: "Arsenic and Old Lace", genres: ["Comedy", "Romance"], year: 1944, cast: ["Cary Grant", "Priscilla Lane", "Raymond Massey"], imdb: { rating: 6, votes: 25673, id: 368226 } 