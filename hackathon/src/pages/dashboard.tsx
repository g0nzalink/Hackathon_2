import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NavButton } from "../components/ui/NavButton";
export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Bienvenido a Ahorrista 🧠💰</h1>

      <div className="space-x-4">
        <NavButton to="/gastos" label="Ver resumen de gastos" color="blue" />
        <NavButton to="/registrar_gastos" label="Registrar nuevo gasto" color="green" />
      </div>
      <div className="space-x-4">
        <NavButton
          to="/login"
          label="Cerrar sesión"
          color="red"
          extraAction={logout} 
          className="mt-4"
        />
        <NavButton
          to="/categorias"
          label="Categorías de gastos"
          color="red"
          className="mt-4"
        />
      </div>


    </div>
  );
}