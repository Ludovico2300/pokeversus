import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Pokedex from "./pages/Pokedex";

/**
 * Renders the App component.
 * @returns JSX elements representing the UI of the app.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokedex" element={<Pokedex />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
