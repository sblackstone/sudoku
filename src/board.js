
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
        row.push(new Cell(5));
      }
      this.rows.push(row);
    }
  }

}

export default Board;
