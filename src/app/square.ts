import { Game } from "./game";
export default class Square {
  game: Game;
  status: string;
  value: number;
  square: HTMLDivElement;
  constructor(game: Game) {
    this.game = game;
    this.status = "unclicked"; // unclicked, filled, exed, maybe
    this.value = 0;
    this.handleClick = this.handleClick.bind(this);
    this.square = document.createElement("div");
    this.square.addEventListener("click", this.handleClick);
  }
  handleClick(): void {
    switch (this.game.mouseMode) {
      case "cursor": {
        if (this.status === "filled") {
          this.status = "unclicked";
          this.value = 0;
        } else {
          this.status = "filled";
          this.value = 1;
        }
        break;
      }
      default: {
        if (this.status === "filled") {
          this.status = "unclicked";
          this.value = 0;
        } else {
          this.status = "filled";
          this.value = 1;
        }
        break;
      }
    }
    console.log(this.game.mouseMode);
    console.log(this.game);
    this.render();
    return;
  }
  render() {
    this.square.className = "square ";
    this.square.className += this.status;
    return this.square;
  }
}
