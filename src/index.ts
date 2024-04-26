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
console.log(g.boards);
const s = new Square(g);

const b = new Board(g, level1.size, level1.topNums, level1.leftNums);
b.render();
console.log(b.render());
const board = g.createNewBoard();
// const boardElement = board.render();
// Get the root element
// Get the root element
const rootElement = document.getElementById("root");
// Check if root element exists before appending boardElement
console.log(rootElement);
