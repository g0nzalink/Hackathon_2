import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080';

export async function getCharacters(apiKey: string) {
  return axios.get(`${BACKEND_URL}/characters`, {
    headers: { 'x-api-key': apiKey },
  });
}

export async function createCharacter(data: any, apiKey: string) {
  return axios.post(`${BACKEND_URL}/characters`, data, {
    headers: { 'x-api-key': apiKey },
  });
}

export async function getCharacterById(id: string, apiKey: string) {
  return axios.get(`${BACKEND_URL}/characters/${id}`, {
    headers: { 'x-api-key': apiKey },
  });
}