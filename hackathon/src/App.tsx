import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import GastosSummary from './pages/gastos';
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gastos" element={<GastosSummary />} />
        {/* Rutas protegidas u otras páginas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
