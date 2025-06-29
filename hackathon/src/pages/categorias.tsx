/// <reference types="vite/client" />

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/ui/BackButton';
import { CategoryItem } from '../components/CategoryItem';

const API_URL = import.meta.env.VITE_API_URL || 'http://198.211.105.95:8080';

interface Category {
  id: number;
  name: string;
}

const Categorias: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('jwt_token');
        if (!token) throw new Error('No autenticado');

        const response = await axios.get<Category[]>(
          `${API_URL}/expenses_category`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategories(response.data);
      } catch (err: any) {
        setError(err.response ? `Error ${err.response.status}` : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <p className="text-center">Cargando categorías...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-neutral-800 shadow-md rounded-2xl">
      <BackButton to="/dashboard" /> 
      <h2 className="text-xl font-bold mb-4 text-center">Categorías Disponibles</h2>
      <ul className="space-y-2">
        {categories.map(cat => (
          <CategoryItem key={cat.id} id={cat.id} name={cat.name} />
        ))}
      </ul>
    </div>
  );
};

export default Categorias;
