import { Cell } from './cell';

const boxNumbers = [
  [0,0,0, 1,1,1, 2,2,2],
  [0,0,0, 1,1,1, 2,2,2],
  [0,0,0, 1,1,1, 2,2,2],
  [3,3,3, 4,4,4, 5,5,5],
  [3,3,3, 4,4,4, 5,5,5],
  [3,3,3, 4,4,4, 5,5,5],
  [6,6,6, 7,7,7, 8,8,8],
  [6,6,6, 7,7,7, 8,8,8],
  [6,6,6, 7,7,7, 8,8,8],
];

const invSquaresCache = [
  [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]],
  [[0,3],[0,4],[0,5],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5]],
  [[0,6],[0,7],[0,8],[1,6],[1,7],[1,8],[2,6],[2,7],[2,8]],
  [[3,0],[3,1],[3,2],[4,0],[4,1],[4,2],[5,0],[5,1],[5,2]],
  [[3,3],[3,4],[3,5],[4,3],[4,4],[4,5],[5,3],[5,4],[5,5]],
  [[3,6],[3,7],[3,8],[4,6],[4,7],[4,8],[5,6],[5,7],[5,8]],
  [[6,0],[6,1],[6,2],[7,0],[7,1],[7,2],[8,0],[8,1],[8,2]],
  [[6,3],[6,4],[6,5],[7,3],[7,4],[7,5],[8,3],[8,4],[8,5]],
  [[6,6],[6,7],[6,8],[7,6],[7,7],[7,8],[8,6],[8,7],[8,8]]
];


export class Board {

  get rows() {
    return this.__rows;
  }

  boxNumberForSquare(i,j) {
    return Math.floor(i / 3) * 3 + Math.floor(j /3);
  }


  dump() {
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(this.getVal(i,j));
      }
      console.log(row.join(" "));
    }
    console.log("***************************");
  }


  createRows() {
    this.__rows = [];
    this.__manual_removals = {}; // [10][0]
    for (let i = 0; i < 9; i++) {
      const row = [];
      this.__manual_removals[i] = {};
      for (let j = 0; j < 9; j++) {
        //row.push(new Cell(`${i}${j} ${squaresCache[i][j]}`));
        //row.push(new Cell(`${i}${j}`));
        this.__manual_removals[i][j] = {}; // [10][0]
        for (let k = 1; k < 10; k++) {
          this.__manual_removals[i][j][k] = false;
        }
        row.push(new Cell());
      }
      this.__rows.push(row);
    }
  }

  getVal(i,j) {
    return this.__rows[i][j].value;
  }

  setVal(i,j, v) {
    this.__rows[i][j].value = v;
  }

  getMark(i,j,k) {
    return this.__rows[i][j].getMark(k);
  }

  setMark(i,j,k,v) {
    return this.__rows[i][j].setMark(k,v);
  }

  removeMarkClick(i,j,k) {
    this.setMark(i,j,k, false);
    this.__manual_removals[i][j][k] = true;
  }

  updateSingles() {
    let ret = false;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        ret = ret || this.__rows[i][j].updateIfSingle();
      }
    }
    return ret;
  }

  export() {
    return this.rows.map(i => i.map(j => j.export() ));
  }

  constructor() {
    window.board = this;
    this.createRows();
    this.setExample();
    this.autoNotate();
  }

  valueInRow(i, value) {
    for (let j = 0; j < 9; j++) {
      if (this.getVal(i,j) === value) {
        return true;
      }
    }
    return false;
  }

  valueInBox(n, value) {
    const coords = invSquaresCache[n];
    for (let i = 0; i < 9; i++) {
      if (this.getVal(...coords[i]) === value ) {
        return true;
      }
    }
    return false;

  }

  autoNotate() {
    console.log("autoNotate");
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        for (let k = 1; k < 10; k++){
          if (this.rows[i][j].value > -1) {
            continue;
          }

          if (this.__manual_removals[i][j][k]) {
            continue;
          }

          const boxNum = boxNumbers[i][j];
          const val = !(this.valueInRow(i, k) || this.valueInCol(j, k) || this.valueInBox(boxNum, k));
          this.rows[i][j].setMark(k, val);
        }
      }
    }
    //if (this.updateSingles()) {
    //  this.autoNotate();
    //}
  }

  setExample() {
    const easyexample = "000830057008500600130002080802390700600100032057204090060410370073908060000760400";
    const hardExample = "070000000080400070000053040009100730700002000000004902500009800004500000103020004"
    const example = easyexample;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          const idx = i*9+j;
          const val = parseInt(example[idx]);
          if (val !== 0) {
            this.setVal(i,j, parseInt(val));
          }
       }
    }
    this.autoNotate();

  }

    /*
    this.setVal(0,2,6);
    this.setVal(0,4,1);
    this.setVal(1,1,2);
    this.setVal(1,5,9);
    this.setVal(2,0,5);
    this.setVal(2,1,7);

    this.setVal(3,2,1);
    this.setVal(3,3,2);
    this.setVal(3,4,6);

    this.setVal(3,7,4);
    this.setVal(3,8,8);

    this.setVal(4,5,3);
    this.setVal(4,7,7);


    this.setVal(6,0,6);
    this.setVal(6,4,4);
    this.setVal(6,5,1);
    this.setVal(6,7,8);

    this.setVal(7,3,3);
    this.setVal(7,8,2);

    this.setVal(8,1,3);
    this.setVal(8,2,4);
    this.setVal(8,4,9);
    this.setVal(8,8,6);
  }
*/
  valueInCol(j, value) {
    for (let i = 0; i < 9; i++) {
      if (this.getVal(i,j) === value) {
        return true;
      }
    }
    return false;
  }



}

export default Board;
