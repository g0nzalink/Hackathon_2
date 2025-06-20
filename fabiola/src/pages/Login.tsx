import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../contexts/TokenContext';

function Login() {
  const [input, setInput] = useState('');
  const { saveToken } = useToken();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      saveToken(input.trim());
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Ingresar API Key</h1>
      <input
        className="border p-2 w-full mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="API Key"
      />
      <button className="bg-blue-600 text-white py-2 px-4 rounded" type="submit">
        Entrar
      </button>
    </form>
  );
}

export default Login;