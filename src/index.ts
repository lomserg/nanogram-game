import Level from "./app/level";
import { Game } from "./app/game";
import Square from "./app/square";
import Board from "./app/board";
import "./main.css";
const level1 = new Level("level_one", 3, "111100101");
// level1.rowVals();
// console.log(level1.rowVals());
// console.log(level1.colVals());
// console.log(level1.topNums);
// console.log(level1.leftNums);
const g = new Game();
g.play();
// g.play();
// g.setLevel(0);
// g.generateLevelsElement(g.levels);
console.log(g.currentBoard?.grid);
console.log(g.currentLevel.row);
g.generateLevelsElement(g.levels);
g.gameMenu();
// console.log(g.levels);
// g.levels.forEach((level) => {
//   console.log(level.name);
// });
// const boardElement = board.render();
// Get the root element
// Get the root element
// Check if root element exists before appending boardElement
