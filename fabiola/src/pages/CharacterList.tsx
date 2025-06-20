import { useEffect, useState } from 'react';
import { getCharacters } from '../service/characterService';
import useToken from '../contexts/TokenContext';

function CharacterList() {
  const { token } = useToken();
  const [characters, setCharacters] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const response = await getCharacters(token || '');
      setCharacters(response.data);
    }
    load();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de personajes</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Nombre</th>
            <th>Anime</th>
            <th>Poder</th>
            <th>Habilidad</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char) => (
            <tr key={char.id}>
              <td>{char.name}</td>
              <td>{char.anime}</td>
              <td>{char.power}</td>
              <td>{char.skill}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CharacterList;
