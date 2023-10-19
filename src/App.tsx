import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import PokeDex from "./pages/PokeDex";
import PokeVersus from "./pages/PokeVersus";
import Connect from "./pages/Connect";
import About from "./pages/About";
import PokemonPage from "./pages/PokemonPage";

/**
 * Renders the App component.
 * @returns JSX elements representing the UI of the app.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokedex" element={<PokeDex />} />
      <Route path="/pokedex/:id" element={<PokemonPage />} />
      <Route path="/pokeversus" element={<PokeVersus />} />
      <Route path="/about" element={<About />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
