import { Link, useNavigate } from 'react-router-dom';
import useToken from '../contexts/TokenContext';

function Navbar() {
  const { removeToken } = useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-800 text-white p-4 flex gap-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/characters">Personajes</Link>
      <Link to="/characters/new">Agregar</Link>
      <button onClick={handleLogout} className="ml-auto">
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;
