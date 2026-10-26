# Riddle Game - JavaScript Terminal Project

A terminal game that asks the player riddles, measures how long each riddle took, and shows statistics at the end.

This repository is a **template**. The folders and files are ready, and every file has a comment that describes what should be written in it. Write all the code yourself.

## Getting started

1. Clone this repository.
2. Run `npm install` (this installs `prompt-sync`).
3. Fill in each file according to the comment inside it.
4. Run the game with `node app.js` directly in the terminal (not through a piped command).

## Folder structure

```
riddle-game/
├── app.js
├── package.json
├── riddles/
│   ├── index.js
│   ├── r1.js
│   ├── r2.js
│   ├── r3.js
│   ├── r4.js
│   └── r5.js
└── classes/
    ├── Riddle.js
    └── Player.js
```

## Tasks

### Riddle files

**Task 1: Create the riddles** (`riddles/r1.js` to `riddles/r5.js`)

- Each file exports a riddle object with `id`, `name`, `taskDescription` and `correctAnswer`.
- Example:

```js
// riddles/r1.js
export default {
  id: 1,
  name: "Easy Math",
  taskDescription: "What is 5 + 3?",
  correctAnswer: "8"
};
```

- Write 5 riddles of your own.

**Task 2: Load all riddles at once** (`riddles/index.js`)

- Import all five riddles and export them together as one array.

### Classes

**Task 3: The Riddle class** (`classes/Riddle.js`)

- Properties: `id`, `name`, `taskDescription`, `correctAnswer`.
- Method `ask(prompt)`:
  - Show the riddle.
  - Ask for user input.
  - Keep asking until the correct answer is given.

**Task 4: The Player class** (`classes/Player.js`)

- Properties: `name`, `times[]` (array of time durations per riddle).
- Methods:
  - `recordTime(start, end)`
  - `showStats()` - show total and average time.

### Game logic (`app.js`)

**Task 5: Set up terminal input**

- Install `prompt-sync` (already listed in `package.json`, so `npm install` is enough).
- Set it up:

```js
import PromptSync from 'prompt-sync';
const prompt = PromptSync();
```

**Task 6: Ask for the player name**

- Show a welcome message.
- Use `prompt` to ask: "What is your name?"
- Create a `Player` object with the name.

**Task 7: Use all the riddles**

- In `app.js`, import the array from `riddles/index.js`.

**Task 8: Main game loop**

- Loop through all riddles:
  - Record `startTime` with `Date.now()`.
  - Create a `Riddle` object and call `ask()`.
  - Record `endTime`.
  - Save the time using `player.recordTime()`.

**Task 9: Show final stats**

- After all riddles:
  - Show total time.
  - Show average time per riddle.

### Bonus (optional)

**Task 10: Multiple choice riddles**

- Create a `MultipleChoiceRiddle` class that inherits from `Riddle`.
- Add a `choices[]` property.
- Show numbered options.
- Accept numeric input and compare it to the correct answer.
- Create the file `classes/MultipleChoiceRiddle.js` yourself.

## Final deliverables

- Project folders and files ready.
- 5 riddles defined.
- Working `Riddle` and `Player` classes.
- `app.js` runs the full game.
- Terminal input with `prompt-sync`.
- Time tracking for each riddle.
- Final stats display.
- Optional: multiple choice riddles.
