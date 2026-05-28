import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeReactPage from './components/HomeReact.page';
import MovieImportarPage from './components/Movie/MovieImportar.page';

function App() {
  return (
    // Definimos rutas
      <Routes>
        {/* Ruta padre auth */}
        <Route path="/" element={<HomeReactPage/>}>
        </Route>

        <Route path="/movie">
          <Route path="importar" element={<MovieImportarPage/>}/>
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<HomeReactPage />} />
      </Routes> 
  );
}

export default App;
