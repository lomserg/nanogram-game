export default class Level {
  name: string;
  size: number;
  valueString: string;
  row: string[][];
  col: string[][];
  topNums: number[][];
  leftNums: number[][];
  won: boolean;

  constructor(name: string, size: number, valueString: string) {
    this.name = name;
    this.size = size;
    this.row = [];
    this.col = [];
    this.valueString = valueString;
    if (this.valueString) {
      this.row = this.rowVals();
    }
    if (this.valueString) {
      this.col = this.colVals();
    }
    this.topNums = this.getHints(this.col);
    this.leftNums = this.getHints(this.row);
    this.won = false;
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
  colVals() {
    let colsArrays = new Array(this.size);
    for (let i = 0; i < colsArrays.length; i++) {
      colsArrays[i] = [];
    }
    let i = 0;
    while (i < this.valueString.length) {
      let idx = i % this.size;

      colsArrays[idx].push(this.valueString[i]);
      i++;
    }
    return colsArrays;
  }
  getHints(vals: string[][]) {
    let nums = [];
    for (let i = 0; i < vals.length; i++) {
      let temp = [];
      let count = 0;

      for (let j = 0; j < vals[i].length; j++) {
        if (vals[i][j] === "0") {
          if (count !== 0) {
            temp.push(count);
          }
          count = 0;
        }
        if (vals[i][j] === "1") {
          count += 1;
        }
      }
      if (count !== 0) {
        temp.push(count);
      }
      if (temp.length > 0) {
        nums.push(temp);
      } else if (temp.length === 0) {
        nums.push([0]);
      }
    }

    return nums;
  }
}
