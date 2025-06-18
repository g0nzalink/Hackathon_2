import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://198.211.105.95:8080/authentication/login", {
        email,
        passwd,
      });

      const token = res.data.result.token;
      login(token);
      alert("Inicio de sesión exitoso");
      navigate("/dashboard");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tu correo y contraseña.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-black p-6 max-w-md mx-auto flex flex-col gap-4 rounded-2xl">
      <h2 className="text-xl font-bold">Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={passwd}
        onChange={(e) => setPasswd(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Entrar</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}