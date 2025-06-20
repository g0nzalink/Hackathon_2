import { useEffect, useState } from 'react';
import useToken from '../contexts/TokenContext';
import { getCharacters } from '../service/characterService';

function Dashboard() {
  const { token } = useToken();
  const [characters, setCharacters] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getCharacters(token || '');
      setCharacters(response.data);
    }
    fetchData();
  }, []);

  const strongest = characters.reduce((prev, curr) => (curr.power > prev.power ? curr : prev), characters[0]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resumen</h1>
      <p>Total de personajes: {characters.length}</p>
      {strongest && (
        <p>Personaje más poderoso: {strongest.name} ({strongest.power})</p>
      )}
    </div>
  );
}

export default Dashboard;
