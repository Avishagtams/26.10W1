import { Riddle } from '../classes/Riddle.js';

const BASE_URL = 'http://localhost:3000/riddles';

export async function getAllRiddles() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch riddles');
    const data = await res.json();
    return data.map(r => new Riddle(r.id, r.name, r.taskDescription, r.correctAnswer));
  } catch (error) {
    console.error('Error fetching riddles:', error.message);
    return [];
  }
}

export async function createRiddle(riddle) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(riddle)
    });
    if (!res.ok) throw new Error('Failed to create riddle');
    return await res.json();
  } catch (error) {
    console.error('Error creating riddle:', error.message);
  }
}

export async function updateRiddle(id, riddle) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(riddle)
    });
    if (!res.ok) throw new Error('Failed to update riddle');
    return await res.json();
  } catch (error) {
    console.error('Error updating riddle:', error.message);
  }
}

export async function deleteRiddle(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete riddle');
    return await res.json();
  } catch (error) {
    console.error('Error deleting riddle:', error.message);
  }
}