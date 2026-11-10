import { Player } from '../classes/Player.js';

const BASE_URL = 'http://localhost:3000/api/players';
export async function getAllPlayers() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch players');
    const data = await res.json();
    return data.map(p => new Player(p.id, p.name, p.lowestTime));
  } catch (error) {
    console.error('Error fetching players:', error.message);
    return [];
  }
}

export async function findPlayerByName(name) {
  try {
    const res = await fetch(`${BASE_URL}?name=${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error('Failed to find player');
    const data = await res.json();
    
    if (data.length > 0) {
      const p = data[0];
      return new Player(p.id, p.name, p.lowestTime);
    }
    return undefined;
  } catch (error) {
    console.error('Error finding player:', error.message);
    return undefined;
  }
}

export async function createPlayer(name) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, lowestTime: null })
    });
    if (!res.ok) throw new Error('Failed to create player');
    const p = await res.json();
    return new Player(p.id, p.name, p.lowestTime);
  } catch (error) {
    console.error('Error creating player:', error.message);
  }
}

export async function updatePlayer(player) {
  try {
    const res = await fetch(`${BASE_URL}/${player.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: player.id,
        name: player.name,
        lowestTime: player.lowestTime
      })
    });
    if (!res.ok) throw new Error('Failed to update player');
    return await res.json();
  } catch (error) {
    console.error('Error updating player:', error.message);
  }
}