import express from 'express';
import { readDb, writeDb } from '../db/dbHelpers.js';

const router = express.Router();

// GET /api/riddles  -> all riddles
router.get('/', async (req, res) => {
  const db = await readDb();
  res.json(db.riddles);
});

// GET /api/riddles/:id  -> one riddle
router.get('/:id', async (req, res) => {
  const db = await readDb();
  const riddle = db.riddles.find(r => String(r.id) === req.params.id);
  if (!riddle) return res.status(404).json({ error: 'Riddle not found' });
  res.json(riddle);
});

// POST /api/riddles  -> add a riddle
router.post('/', async (req, res) => {
  const { name, taskDescription, correctAnswer } = req.body;
  if (!name || !taskDescription || !correctAnswer) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const db = await readDb();
  const maxId = Math.max(0, ...db.riddles.map(r => Number(r.id)));
  const newRiddle = { id: String(maxId + 1), name, taskDescription, correctAnswer };
  db.riddles.push(newRiddle);
  await writeDb(db);
  res.status(201).json(newRiddle);
});

// PUT /api/riddles/:id  -> update a riddle
router.put('/:id', async (req, res) => {
  const db = await readDb();
  const index = db.riddles.findIndex(r => String(r.id) === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Riddle not found' });
  db.riddles[index] = { ...db.riddles[index], ...req.body, id: db.riddles[index].id };
  await writeDb(db);
  res.json(db.riddles[index]);
});

// DELETE /api/riddles/:id  -> delete a riddle
router.delete('/:id', async (req, res) => {
  const db = await readDb();
  const index = db.riddles.findIndex(r => String(r.id) === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Riddle not found' });
  const [deleted] = db.riddles.splice(index, 1);
  await writeDb(db);
  res.json(deleted);
});

export default router;