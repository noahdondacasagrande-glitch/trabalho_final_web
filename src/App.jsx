import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Area_Cliente from './pages/Area_Cliente'
import Detalhes from './pages/Detalhes'
import Login from './pages/Login'
import Orcamento from './pages/Orcamento'
import Produtos from './pages/Produtos'
import Sobre from './pages/Sobre'
import Solucoes from './pages/Solucoes'


function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/area_cliente" element={<Area_Cliente />} />
          <Route path="/detalhes" element={<Detalhes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/solucoes" element={<Solucoes />} />
        </Routes>
      </div>

    </>
  )
}

export default App
