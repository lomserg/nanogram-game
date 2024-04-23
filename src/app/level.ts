export default class Level {
  name: string;
  size: number;
  valueString: string;
  row: string[][];
  won: boolean;

  constructor(name: string, size: number, valueString: string) {
    this.name = name;
    this.size = size;
    this.row = [];
    this.valueString = valueString;
    this.won = false;
    if (this.valueString) {
      this.row = this.rowVals();
    }
  }

  rowVals() {
    let rowsArrays = [];
    let temp: string[] = [];
    for (let i = 0; i < this.valueString.length; i++) {
      if (temp.length < this.size) {
        temp.push(this.valueString[i]);
      }
      if (temp.length === this.size) {
        rowsArrays.push(temp);
        temp = [];
      } else if (i === this.valueString.length - 1) {
        rowsArrays.push(temp);
      }
    }
    return rowsArrays;
  }
}
