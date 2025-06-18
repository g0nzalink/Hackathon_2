/// <reference types="vite/client" />

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://198.211.105.95:8080';

interface Category {
  id: number;
  name: string;
}

const NuevoGasto: React.FC = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [amount, setAmount] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Obtener categorías para el select
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const res = await axios.get<Category[]>(`${API_URL}/expenses_category`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      setError('Selecciona una categoría.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) throw new Error('No autenticado.');

      const category = categories.find(c => c.id === Number(categoryId));
      if (!category) throw new Error('Categoría no válida.');

      await axios.post(
        `${API_URL}/expenses`,
        {
          date,
          category: { id: category.id, name: category.name },
          amount
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirige al resumen tras registrar
      navigate('/resumen');
    } catch (err: any) {
      if (err.response) setError(`Error ${err.response.status}: ${err.response.data}`);
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mid-screen">
      <div className="max-w-md mx-auto bg-neutral-900 shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar Nuevo Gasto</h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block font-medium mb-1">Fecha:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="category" className="block font-medium mb-1">Categoría:</label>
            <select
              id="category"
              value={categoryId}
              onChange={e => setCategoryId(Number(e.target.value))}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="block font-medium mb-1">Monto:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              step="0.01"
              min="0"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow transition disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrar Gasto'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NuevoGasto;