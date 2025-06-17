import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Bienvenido a Ahorrista 🧠💰</h1>

      <div className="space-x-4">
        <button
          onClick={() => navigate("/gastos")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ver resumen de gastos
        </button>

        <button
          onClick={() => navigate("/registrar_gastos")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Registrar nuevo gasto
        </button>
      </div>

      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}