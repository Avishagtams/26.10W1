import express from 'express';
import { readDb, writeDb } from '../db/dbHelpers.js';

const router = express.Router();

// GET /api/players          -> all players
// GET /api/players?name=Dan -> players with that name
router.get('/', async (req, res) => {
  const db = await readDb();
  const { name } = req.query;
  if (name) {
    return res.json(db.players.filter(p => p.name === name));
  }
  res.json(db.players);
});

// POST /api/players  -> add a player
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const db = await readDb();
  const maxId = Math.max(0, ...db.players.map(p => Number(p.id)));
  const newPlayer = { id: maxId + 1, name, lowestTime: null };
  db.players.push(newPlayer);
  await writeDb(db);
  res.status(201).json(newPlayer);
});

// PUT /api/players/:id  -> update best time
router.put('/:id', async (req, res) => {
  const db = await readDb();
  const player = db.players.find(p => String(p.id) === req.params.id);
  if (!player) return res.status(404).json({ error: 'Player not found' });

  const { lowestTime } = req.body;
  if (typeof lowestTime !== 'number') {
    return res.status(400).json({ error: 'lowestTime must be a number' });
  }
  // update only if it's a new record
  if (player.lowestTime === null || lowestTime < player.lowestTime) {
    player.lowestTime = lowestTime;
    await writeDb(db);
  }
  res.json(player);
});

export default router;