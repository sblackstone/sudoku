import { Cell } from './cell';


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


  createSquareCache() {
    this.squaresCache = [
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
  }

  createCoordsCache(i) {
    this.coordsCache = new Array(10).fill(0).map(x => []);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const sq = this.squaresCache[i][j];
        this.coordsCache[sq].push([i,j]);
      }
    }
  }

  createRows() {
    this.__rows = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(new Cell(`${i}${j} ${this.squaresCache[i][j]}`));
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
    this.createSquareCache();
    this.createCoordsCache();
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
