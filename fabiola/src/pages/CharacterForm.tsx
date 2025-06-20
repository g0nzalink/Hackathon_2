import { useState } from 'react';
import useToken from '../contexts/TokenContext';
import { createCharacter } from '../service/characterService';

function CharacterForm() {
  const { token } = useToken();

  const [form, setForm] = useState({
    name: '',
    anime: '',
    power: '',
    skill: '',
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(form.power) < 0 || Number(form.power) > 9000) {
      alert('El nivel de poder debe estar entre 0 y 9000');
      return;
    }

    try {
      await createCharacter(form, token || '');
      alert('Personaje creado correctamente');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Registrar Personaje</h2>
      <input name="name" placeholder="Nombre" onChange={handleChange} className="block w-full mb-2 border p-2" />
      <input name="anime" placeholder="Anime" onChange={handleChange} className="block w-full mb-2 border p-2" />
      <input name="power" type="number" placeholder="Poder (0-9000)" onChange={handleChange} className="block w-full mb-2 border p-2" />
      <input name="skill" placeholder="Habilidad" onChange={handleChange} className="block w-full mb-2 border p-2" />
      <textarea name="comment" placeholder="Comentario (opcional)" onChange={handleChange} className="block w-full mb-4 border p-2" />
      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
        Guardar personaje
      </button>
    </form>
  );
}

export default CharacterForm;
