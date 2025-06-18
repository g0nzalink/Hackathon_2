/// <reference types="vite/client" />
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://198.211.105.95:8080';

// Modelo de un gasto individual
interface ExpenseDetail {
  id: number;
  expenseCategory: { id: number; name: string };
  year: number;
  month: number;
  amount: number;
  description?: string; // asume descripción opcional
  date?: string;        // asume fecha opcional (ISO)
}

const GastosDetail: React.FC = () => {
  const { year, month, categoryId } = useParams<{ year: string; month: string; categoryId: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<ExpenseDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('jwt_token');
        if (!token) throw new Error('No autenticado');

        const response = await axios.get<ExpenseDetail[]>(
          `${API_URL}/expenses/detail`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              year: year,
              month: month,
              categoryId: categoryId
            }
          }
        );
        setItems(response.data);
      } catch (err: any) {
        if (err.response) setError(`Error ${err.response.status}`);
        else setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [year, month, categoryId]);

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-3xl mx-auto bg-neutral-900 shadow-md rounded-2xl p-8">
        <button onClick={() => navigate(-1)} className="mb-4 text-white">&larr; Volver</button>
        <h2 className="text-2xl font-bold mb-4 text-center">Detalle de Gastos</h2>

        {loading ? (
          <p className="text-center">Cargando detalles...</p>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500 text-center">No hay gastos en esta categoría.</p>
        ) : (
          <ul className="space-y-4">
            {items.map(item => (
              <li key={item.id} className="border p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">ID: {item.id}</p>
                  {item.description && <p className="text-sm">{item.description}</p>}
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.amount.toFixed(2)}</p>
                  {item.date && <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GastosDetail;
