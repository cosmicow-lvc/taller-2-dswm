import Landing from "./pages/Landing.jsx"
import BolaMagica from "./pages/BolaMagica.jsx"
import Pokemon from "./pages/Pokeapi.jsx"
import MonsterHigh from "./pages/MonsterHigh.jsx"
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/bola-magica" element={<BolaMagica />} />
      <Route path="/pokemon" element={<Pokemon />} />
      <Route path="/monster-high" element={<MonsterHigh />} />
    </Routes>
  );
}

export default App
