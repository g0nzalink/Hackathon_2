/// <reference types="vite/client" />

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://198.211.105.95:8080';

interface Category {
  id: number;
  name: string;
}

interface CategoriasProps {
  onSelect?: (categoryId: number) => void;
}

const Categorias: React.FC<CategoriasProps> = ({ onSelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('jwt_token');
        if (!token) throw new Error('No se encontró token de autenticación.');

        const response = await axios.get<Category[]>(
          `${API_URL}/expenses_category`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setCategories(response.data);
      } catch (err: any) {
        if (err.response) setError(`Error ${err.response.status}`);
        else setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <p className="text-center">Cargando categorías...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-md mx-auto">
      <label htmlFor="category" className="block mb-2 font-medium">Categoría:</label>
      <select
        id="category"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={e => onSelect && onSelect(Number(e.target.value))}
      >
        <option value="">Selecciona una categoría</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categorias;