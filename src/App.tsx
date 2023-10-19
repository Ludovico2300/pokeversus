import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Pokedex from "./pages/Pokedex";
import PokeVersus from "./pages/PokeVersus";
import Connect from "./pages/Connect";
import About from "./pages/About";

/**
 * Renders the App component.
 * @returns JSX elements representing the UI of the app.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokedex" element={<Pokedex />} />
      <Route path="/pokeversus" element={<PokeVersus />} />
      <Route path="/about" element={<About />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
