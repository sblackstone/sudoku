export class Cell {

  constructor(value) {
    this.__value = value || null;
    this.__marks = [true, true, true, true, true, true, true, true, true];
  }

  get value()  { return this.__value;  };
  set value(v) { this.__value = v;     };
  get marks()  { return this.__marks;  };

  setMark(i, v) {
    this.__marks[i] = v;
  }

  testMark(i) {
      return this.__marks[i];
  }

  getMark(i) {
    return this.__marks[i];
  }

}
