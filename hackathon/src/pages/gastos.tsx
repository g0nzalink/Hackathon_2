/// <reference types="vite/client" />

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://198.211.105.95:8080';

interface RawExpense {
  expenseCategory: { id: number; name: string };
  year: number;
  month: number;
  amount: number;
}

interface ExpenseSummary {
  categoryId: number;
  category: string;
  total: number;
}

const GastosSummary: React.FC = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState<string>(() => {
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

      const [yearStr, monthStr] = selectedMonth.split('-');
      const response = await axios.get<RawExpense[]>(
        `${API_URL}/expenses_summary`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { year: yearStr, month: monthStr }
        }
      );

      const summaryMap: Record<number, { category: string; total: number }> = {};
      response.data.forEach(item => {
        const { id, name } = item.expenseCategory;
        if (!summaryMap[id]) summaryMap[id] = { category: name, total: 0 };
        summaryMap[id].total += item.amount;
      });

      const summaryArray: ExpenseSummary[] = Object.entries(summaryMap).map(
        ([idStr, { category, total }]) => ({
          categoryId: Number(idStr),
          category,
          total
        })
      );

      setData(summaryArray);
    } catch (err: any) {
      if (err.response) setError(`Error ${err.response.status}: ${err.response.data}`);
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary(month);
  }, [month]);

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-3xl mx-auto bg-neutral-900 shadow-md rounded-2xl p-8">
        <button onClick={() => navigate(-1)} className="mb-4 text-white">&larr; Volver</button>
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
        ) : data.length === 0 ? (
          <p className="text-gray-500 text-center">No hay datos para este mes.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-left">Categoría</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => {
                const [yearStr, monthStr] = month.split('-');
                return (
                  <tr key={item.categoryId} className="border-b">
                    <td
                      className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                      onClick={() =>
                        navigate(`/detalle/${yearStr}/${monthStr}/${item.categoryId}`)
                      }
                    >
                      {item.category}
                    </td>
                    <td className="px-4 py-2 text-right">
                      ${item.total.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GastosSummary;