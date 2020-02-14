
class Cell {
  constructor(value) {
    this.value = value || 99;
    this.marks = [1,1,1,1,1,1,1,1,1];
  }
}

class Board {

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
  constructor() {
    window.model = this;
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

}

export default Board;
