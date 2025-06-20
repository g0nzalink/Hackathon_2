import { Navigate, Outlet } from 'react-router-dom';
import useToken from '../contexts/TokenContext';

function ProtectedRoute() {
  const { token } = useToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
