import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CharacterList from './pages/CharacterList';
import CharacterForm from './pages/CharacterForm';
import CharacterDetail from './pages/CharacterDetail';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA */}
        <Route path="/login" element={<Login />} />

        {/* RUTAS PRIVADAS (necesitan API Key) */}
        <Route element={<ProtectedRoute />}>
          {/* Navbar común para rutas protegidas (opcional) */}
          <Route element={<NavbarLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/characters" element={<CharacterList />} />
            <Route path="/characters/new" element={<CharacterForm />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
          </Route>
        </Route>

        
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Outlet } from 'react-router-dom';

function NavbarLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
