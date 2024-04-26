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
    // Define your click event handling logic here
    console.log(this.game);
  }
  render() {
    this.square.className = "square ";
    this.square.className += this.status;
    return this.square;
  }
}
