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

  constructor() {
    window.board = this;
    this.score = 0;
    this.createRows();
    this.setExample();
    this.autoNotate();
    while (this.updateSingles()) {

    }
  }


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
    console.log(k);
    if (this.isCorrect(i,j,k)) {
      if (this.rows[i][j].updateIfSingle()) {
        this.score += 10000;
      } else {
        this.score -= 10000;
        this.setVal(i,j, this.answer[i][j])
      }
    } else {
      this.score += 100;
    }

    this.setMark(i,j,k, false);
    this.__manual_removals[i][j][k] = true;
    if (this.rows[i][j].updateIfSingle()) {
      this.score += 10000
      this.score -= 100;
    }
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

  isCorrect(i,j,k) {
    return parseInt(this.answer[i][j]) === k;
  }

  setExample() {
    const mediumExample = ["200006000195304087800170004000000340000810020000007090670000030000050070958003002","247586913195324687863179254781962345439815726526437891674291538312658479958743162",449,4,false];
    const hardExample  =  ["500204300107006025000050760000300000000005006000040050026008004403062100050000070","568274391197836425342159768685321947734985216219647853926718534473562189851493672",336,7,false];
    const expertExample = ["000000001310000200700800400000000006500000000000284003065000030920700800000410000","489672351316549287752831469238157946547396128691284573165928734924763815873415692",519,0,false];
    const example = expertExample;
    this.answer = {};
    for (let i = 0; i < 9; i++) {
      this.answer[i] = [];
      for (let j = 0; j < 9; j++) {
        this.answer[i][j] = parseInt(mediumExample[1][i*9+j]);
      }
    }


    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          const idx = i*9+j;
          const val = parseInt(example[0][idx]);
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
