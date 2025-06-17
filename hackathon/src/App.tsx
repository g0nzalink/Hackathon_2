import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* Rutas protegidas u otras páginas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
