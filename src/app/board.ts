import { Game } from "./game";
import Square from "./square";
export default class Board {
  game: Game;
  size: number;
  topNums: number[][];
  leftNums: number[][];
  grid: any[][];
  board: HTMLDivElement;
  constructor(
    game: Game,
    size: number,
    topNums: number[][],
    leftNums: number[][]
  ) {
    this.game = game;
    this.size = size;
    this.topNums = topNums;
    this.leftNums = leftNums;
    this.grid = this.makeGrid(size);
    this.populateGrid();
    this.board = document.getElementById("board") as HTMLDivElement;
  }

  makeGrid(size: number): any[][] {
    let grid = [];
    for (let i = 0; i < size; i++) {
      grid.push(new Array(size));
    }
    return grid;
  }

  populateGrid() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let square = new Square(this.game);
        this.grid[i][j] = square;
      }
    }
  }
  findCurrentVals() {
    let vals = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let sq = this.grid[i][j];
        vals.push(sq.value);
      }
    }
    return vals.join("");
  }
  render() {
    if (this.board) {
      this.board.innerHTML = "";
      this.board.className = "board";
      let topNums = document.createElement("div");
      let leftNums = document.createElement("div");
      topNums.className = "topNums";
      leftNums.className = "leftNums";

      this.topNums.forEach((numArr) => {
        let nums = document.createElement("div");
        nums.innerHTML = numArr.join(" ");
        topNums.append(nums);
      });
      this.leftNums.forEach((numArr) => {
        let nums = document.createElement("div");
        nums.innerHTML = numArr.join(" ");
        leftNums.append(nums);
      });
      this.board.appendChild(topNums);
      this.board.appendChild(leftNums);
      let griddiv = document.createElement("div");
      griddiv.className = "grid";
      griddiv.id = "grid";

      for (let i = 0; i < this.grid.length; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.className = "row-div";
        for (let j = 0; j < this.grid[i].length; j++) {
          let square = this.grid[i][j];
          rowDiv.appendChild(square.render());
        }
        griddiv.appendChild(rowDiv);
      }
      this.board.appendChild(griddiv);
      return this.board;
    } else {
      console.log("No board");
    }
  }
}
