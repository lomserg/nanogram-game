import Level from "./level";
import Board from "./board";
import {
  tutorial,
  level_one,
  level_two,
  level_three,
  level_four,
  level_five,
  level_six,
  level_seven,
  level_eight,
} from "./levels_list";

export class Game {
  currentIdx: number;
  levels: Level[];
  boards: Board[];
  currentLevel: Level | null;
  currentBoard: Board | null;

  constructor() {
    this.currentIdx = 0;
    this.levels = [
      tutorial,
      level_one,
      level_two,
      level_three,
      level_four,
      level_five,
      level_six,
      level_seven,
      level_eight,
    ];
    this.boards = [];
    this.currentLevel = this.levels[this.currentIdx]; // Initialize currentLevel with null
    this.setCurrentLevel(); // Call method to set current level
    this.currentBoard = this.createNewBoard();
  }

  setCurrentLevel(): void {
    if (this.currentIdx >= 0 && this.currentIdx < this.levels.length) {
      this.currentLevel = this.levels[this.currentIdx]; // Ensure currentLevel is properly assigned
    } else {
      this.currentLevel = null; // Handle the case where currentIdx is out of bounds
    }
  }

  createNewBoard(): Board {
    if (!this.currentLevel) {
      throw new Error("Cannot create a board without a current level");
    }
    return new Board(
      this,
      this.currentLevel.size,
      this.currentLevel.topNums,
      this.currentLevel.leftNums
    );
  }
  play() {
    if (this.currentBoard) {
      this.currentBoard.render();
    } else {
      throw new Error("No current board available");
    }
  }
}
