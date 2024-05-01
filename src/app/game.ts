import Level from "./level";
import Board from "./board";
import ElementCreator from "./createelement";
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
  asideDiv: HTMLDivElement;
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
    // this.setCurrentLevel();
    this.currentLevel = this.levels[this.currentIdx]; // Initialize currentLevel with null
    this.currentBoard = this.createNewBoard();
    this.boardDiv = document.getElementById("board") as HTMLDivElement;
    this.asideDiv = document.querySelector(".left-nav") as HTMLDivElement;
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
  getRundom() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.levels.length);
    } while (newIndex === this.currentIdx);

    console.log(this.currentIdx, newIndex);
    this.currentIdx = newIndex;
    this.currentLevel = this.levels[this.currentIdx];
    this.currentBoard = this.createNewBoard();
    this.currentBoard.render();
  }

  setLevel(index: number) {
    this.currentLevel = this.levels[index];
    this.currentBoard = this.createNewBoard();
    this.currentBoard.render();
    console.log(this.currentLevel);
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

  generateLevelsElement(levels: Level[]) {
    const levelsMain = new ElementCreator("div", "levels-menu");
    const levelsMainElem = levelsMain.getElement() as HTMLDivElement;
    console.log(levelsMainElem);
    levels.forEach((level, index) => {
      const levelClass = new ElementCreator("div", "level-content", level.name);
      levelClass.createElement(); // Ensure createElement is called
      const levelElem = levelClass.getElement() as HTMLDivElement;
      levelElem.setAttribute("id", index.toString());
      console.log(levelElem);
      levelElem.addEventListener("click", () => {
        levelsMainElem.querySelectorAll(".level-content").forEach((el) => {
          el.classList.remove("current");
        });

        // Add "current" class to the clicked element
        levelElem.classList.add("current");

        this.setLevel(index);
      });
      levelsMainElem.append(levelElem);
    });
    this.asideDiv.append(levelsMainElem);
  }

  gameMenu() {
    const levelsMain = new ElementCreator("div", "button-menu").getElement();

    const resetButton = new ElementCreator(
      "div",
      ["btn", "reset-button"],
      "reset-button"
    ).getElement() as HTMLDivElement;
    const solutionButton = new ElementCreator(
      "div",
      ["btn", "solution-button"],
      "solution-button"
    ).getElement() as HTMLDivElement;
    const rundomButton = new ElementCreator(
      "div",
      ["btn", "rundom-button"],
      "rundom"
    ).getElement() as HTMLDivElement;
    if (rundomButton) {
      rundomButton.addEventListener("click", () => {
        this.getRundom();
        console.log(this.currentLevel);
        console.log(this.currentIdx);
      });
    }
    if (solutionButton) {
      solutionButton.addEventListener("click", () => {
        if (this.currentBoard)
          this.currentBoard.solveGrid(this.currentLevel.row);
        console.log(this.currentLevel);
      });
    }

    if (resetButton) {
      resetButton.addEventListener("click", () => {
        this.currentBoard = this.createNewBoard();
        this.currentBoard.render();
        console.log("hi");
      });
    }
    levelsMain?.append(resetButton, solutionButton, rundomButton);
    if (levelsMain) this.asideDiv.append(levelsMain);
  }
}
