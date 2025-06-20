import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import GastosDetail from './pages/detalles';
import GastosSummary from './pages/gastos';
import Resumen from './components/resumen';
import NuevoGasto from './pages/registar_gastos';
import Categorias from './pages/categorias';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gastos" element={<GastosSummary />} />
        <Route path="/detalle/:year/:month/:categoryId" element={<GastosDetail />} />
        <Route path="/registrar_gastos" element={<NuevoGasto />} />
        <Route path="/resumen" element={<Resumen />} />
        <Route path="/categorias" element={<Categorias />} />
        {/* Rutas protegidas u otras páginas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
