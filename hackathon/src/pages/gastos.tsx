/// <reference types="vite/client" />

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://198.211.105.95:8080';

interface ExpenseSummary {
  category: string;
  total: number;
}

const GastosSummary: React.FC = () => {
  const [month, setMonth] = useState<string>(() => {
    // Inicializa con mes actual en formato YYYY-MM
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [data, setData] = useState<ExpenseSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async (selectedMonth: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) throw new Error('No se encontró token de autenticación.');

      const response = await axios.get<ExpenseSummary[]>(
        `${API_URL}/expenses_summary`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { month: selectedMonth }
        }
      );
      setData(response.data);
    } catch (err: any) {
      if (err.response) {
        setError(`Error ${err.response.status}: ${err.response.data}`);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary(month);
  }, [month]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Resumen de Gastos</h2>

        <div className="mb-6 flex justify-center">
          <label htmlFor="month" className="mr-2 font-medium">Mes:</label>
          <input
            type="month"
            id="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Categoría</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.category} className="border-b">
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2 text-right">${item.total.toLocaleString()}</td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-4 py-2 text-center text-gray-500">No hay datos para este mes.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GastosSummary;