
class Cell {
  constructor(value) {
    this.value = value || null;
    this.marks = [1,1,1,1,1,1,1,1,1];
  }
}

class Board {

  constructor() {
    this.rows = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(new Cell());
      }
      this.rows.push(row);
    }

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
