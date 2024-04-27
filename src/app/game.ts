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
  currentLevel: Level;
  currentBoard: Board | null;
  boardDiv: HTMLDivElement;

  mouseMode: string;
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
    // this.setCurrentLevel();
    this.currentBoard = this.createNewBoard();
    this.boardDiv = document.getElementById("board") as HTMLDivElement;
    this.boardDiv.addEventListener("click", () => this.update());
    this.mouseMode = "cursor";
  }
  isLevelWon(board: Board) {
    if (this.currentLevel.valueString === board.findCurrentVals()) {
      this.currentLevel.won = true;
      return true;
    } else {
      return false;
    }
  }
  // setCurrentLevel(): void {
  //   if (this.currentIdx >= 0 && this.currentIdx < this.levels.length) {
  //     this.currentLevel = this.levels[this.currentIdx]; // Ensure currentLevel is properly assigned
  //   } else {
  //     this.currentLevel = null; // Handle the case where currentIdx is out of bounds
  //   }
  // }

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
  incrementCurrentIdx() {
    if (this.currentIdx + 1 < this.levels.length) {
      this.currentIdx += 1;
      this.currentLevel = this.levels[this.currentIdx];
      this.currentBoard = this.createNewBoard();
      this.boards.push(this.currentBoard);
    }
  }
  update() {
    let level_msg = document.getElementById("level-msg");
    let time_msg = document.getElementById("time-msg");
    if (this.currentBoard) {
      if (this.isLevelWon(this.currentBoard)) {
        if (level_msg)
          level_msg.innerHTML = "<p>Congratulations, you won the level!</p>";
        if (time_msg) time_msg.className = "active";
        this.incrementCurrentIdx();
        this.play();
      }
    }
  }

  play() {
    if (this.currentBoard) {
      this.currentBoard.render();
    } else {
      throw new Error("No current board available");
    }
  }
}
