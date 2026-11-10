// Entry point of the game. Run it with: node app.js
//
// This file should:
// 1. Import PromptSync (from 'prompt-sync') and create the `prompt` function.
// 2. Import the Riddle class, the Player class, and the array of all riddles (from riddles/index.js).
// 3. Show a welcome message and ask the player for their name, then create a Player object.
// 4. Loop over all riddles. For each riddle:
//    - save the start time (Date.now())
//    - create a Riddle object and call its ask() method
//    - save the end time (Date.now())
//    - save the time using player.recordTime()
// 5. After the loop, call player.showStats() to show total time and average time per riddle.

import PromptSync from 'prompt-sync';
import { 
  getAllRiddles, 
  createRiddle, 
  updateRiddle, 
  deleteRiddle 
} from './api/riddlesApi.js';

import { 
  findPlayerByName, 
  createPlayer, 
  updatePlayer, 
  getAllPlayers 
} from './api/playersApi.js';

const prompt = PromptSync();

async function main() {
  let running = true;

  while (running) {
    console.log(`\n=================================`);
    console.log(`What do you want to do?`);
    console.log(`1. Play the game`);
    console.log(`2. Create a new riddle`);
    console.log(`3. Read all riddles`);
    console.log(`4. Update an existing riddle`);
    console.log(`5. Delete a riddle`);
    console.log(`6. View leaderboard`);
    console.log(`0. Exit`);
    console.log(`=================================`);

    const choice = prompt(`Choose an option: `);

    switch (choice) {
      case '1':
        await playGame();
        break;
      case '2':
        await handleCreateRiddle();
        break;
      case '3':
        await handleReadRiddles();
        break;
      case '4':
        await handleUpdateRiddle();
        break;
      case '5':
        await handleDeleteRiddle();
        break;
      case '6':
        await handleLeaderboard();
        break;
      case '0':
        console.log(`Goodbye!`);
        running = false;
        break;
      default:
        console.log(`Invalid option. Try again.`);
    }
  }
}

async function playGame() {
  const name = prompt(`Enter your name: `);
  if (!name.trim()) return;

  let player = await findPlayerByName(name);

  if (player) {
    if (player.lowestTime !== null) {
      console.log(`Hi ${player.name}! Your previous lowest time was ${player.lowestTime} seconds.`);
    } else {
      console.log(`Welcome back, ${player.name}!`);
    }
  } else {
    player = await createPlayer(name);
    console.log(`Welcome, new player ${name}!`);
  }

  const riddles = await getAllRiddles();
  if (riddles.length === 0) {
    console.log(`No riddles found in DB! Add some first.`);
    return;
  }

  const startTime = Date.now();

  for (const riddle of riddles) {
    riddle.ask(prompt);
  }

  const endTime = Date.now();
  const totalSeconds = Math.round((endTime - startTime) / 1000);

  console.log(`\nGreat job, ${player.name}!`);
  console.log(`Your time: ${totalSeconds} seconds`);

  if (player.lowestTime === null || totalSeconds < player.lowestTime) {
    player.lowestTime = totalSeconds;
    await updatePlayer(player);
    console.log(`New record! Time updated.`);
  }
}

async function handleCreateRiddle() {
  const name = prompt(`Enter riddle name: `);
  const taskDescription = prompt(`Enter description: `);
  const correctAnswer = prompt(`Enter correct answer: `);

  if (!name || !taskDescription || !correctAnswer) {
    console.log(`All fields are required.`);
    return;
  }

  const created = await createRiddle({ name, taskDescription, correctAnswer });
  if (created) {
    console.log(`Riddle created successfully with ID: ${created.id}!`);
  }
}

async function handleReadRiddles() {
  const riddles = await getAllRiddles();
  console.log(`\n--- All Riddles ---`);
  riddles.forEach(r => {
    console.log(`ID: ${r.id} | Name: ${r.name} | Question: ${r.taskDescription} | Answer: ${r.correctAnswer}`);
  });
}

async function handleUpdateRiddle() {
  const id = prompt(`Enter riddle ID to update: `);
  const name = prompt(`Enter new name: `);
  const taskDescription = prompt(`Enter new description: `);
  const correctAnswer = prompt(`Enter new correct answer: `);

  const updated = await updateRiddle(id, { name, taskDescription, correctAnswer });
  if (updated) {
    console.log(`Riddle ${id} updated!`);
  }
}

async function handleDeleteRiddle() {
  const id = prompt(`Enter riddle ID to delete: `);
  const deleted = await deleteRiddle(id);
  if (deleted) {
    console.log(`Riddle ${id} deleted!`);
  }
}

async function handleLeaderboard() {
  const players = await getAllPlayers();

  const activePlayers = players
    .filter(p => p.lowestTime !== null)
    .sort((a, b) => a.lowestTime - b.lowestTime);

  console.log(`\n Leaderboard:`);
  if (activePlayers.length === 0) {
    console.log(`No records yet.`);
    return;
  }

  activePlayers.forEach((p, index) => {
    console.log(`${index + 1}. ${p.name} - ${p.lowestTime} seconds`);
  });
}

main();