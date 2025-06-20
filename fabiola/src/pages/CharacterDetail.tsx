import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCharacterById } from '../service/characterService';
import useToken from '../contexts/TokenContext';

function CharacterDetail() {
  const { id } = useParams();
  const { token } = useToken();
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await getCharacterById(id!, token || '');
      setCharacter(res.data);
    }
    load();
  }, []);

  if (!character) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
      <p>Anime: {character.anime}</p>
      <p>Poder: {character.power}</p>
      <p>Habilidad: {character.skill}</p>
      <p>Comentario: {character.comment}</p>
    </div>
  );
}

export default CharacterDetail;
