import { Cell } from './cell';

const squaresCache = [
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
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        //row.push(new Cell(`${i}${j} ${squaresCache[i][j]}`));
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

  constructor() {
    this.createRows();
  }

  valueInRow(i, value) {
    for (let j = 0; j < 9; j++) {
      if (this.getVal(i,j) === value) {
        return true;
      }
    }
    return false;
  }

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

//export default Board;

/*
valueInRow(x, value) {
  for (let j = 0; j < 9; j++) {
    if (this.rows[x][j].value === value) {
      return true;
    }
  }
  return(false);
}

valueInCol(y, value) {
  for (let i = 0; i < 9; i++) {
    if (this.rows[i][y].value === value) {
      return true;
    }
  }
  return(false);
}

valueInBox(n, value) {
  const boxes = this.squareBoxes[n];
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    const x = box[0];
    const y = box[1];
    if (this.rows[x][y].value === value) {
      return true;
    }
  }

  return(false);
}

boxNumberForSquare(i,j) {
  return Math.floor(i / 3) * 3 + Math.floor(j /3);
}

cacheSquareBoxes() {
  this.squareBoxes = [];

  for (let i = 0; i < 9; i++) {
    this.squareBoxes[i] = [];
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const boxNumber = this.boxNumberForSquare(i,j);
      this.squareBoxes[boxNumber].push([i,j]);
    }
  }
}


setExample() {
  this.rows[0][2].value = 6;
  this.rows[0][4].value = 1;
  this.rows[1][1].value = 2;
  this.rows[1][5].value = 9;
  this.rows[2][0].value = 5;
  this.rows[2][1].value = 7;

  this.rows[3][2].value = 1;
  this.rows[3][3].value = 2;
  this.rows[3][4].value = 6;

  this.rows[3][7].value = 4;
  this.rows[3][8].value = 8;

  this.rows[4][5].value = 3;
  this.rows[4][7].value = 7;


  this.rows[6][0].value = 6;
  this.rows[6][4].value = 4;
  this.rows[6][5].value = 1;
  this.rows[6][7].value = 8;

  this.rows[7][3].value = 3;
  this.rows[7][8].value = 2;

  this.rows[8][1].value = 3;
  this.rows[8][2].value = 4;
  this.rows[8][4].value = 9;
  this.rows[8][8].value = 6;
}

constructor() {
  //if (window !== undefined) {
  //  window.model = this;
  //}
  //this.setExample();
  this.cacheSquareBoxes();

  this.rows = [];

  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row.push(new Cell());
    }
    this.rows.push(row);
  }


  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      this.rows[i][j].value = this.boxNumberForSquare(i,j) + 1;
    }
  }
  return;

*/