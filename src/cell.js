export class Cell {

  constructor(value) {
    this.__value = value || -1;
    this.__marks = [true, true, true, true, true, true, true, true, true, true];
  }

  get value()  { return this.__value;  };
  set value(v) {
    if (v !== -1) {
      this.__marks = [ false, false, false, false, false, false, false, false, false, false ];
    }
    this.__value = v;
  };

  get marks()  { return this.__marks;  };

  getSingleCandidate() {
    let last = -1;
    for (let i = 1; i < 10; i++) {
      if (this.marks[i]) {
        if (last != -1) {
          return -1;
        } else {
          last = i;
        }
      }
    }
    return last;
  }

  isSingle() {
    return this.getSingleCandidate() > -1;
  }

  updateIfSingle() {
    const last = this.getSingleCandidate();
    if (last > -1) {
      this.value = last;
      return true;
    } else {
      return false;
    }
  }

  export() {
    return { value: this.value, marks: this.marks, isSingle: this.isSingle() };
  }

  setMark(i, v) {
    //console.log(`Set Mark ${i} ${v}`);
    this.__marks[i] = v;
  }

  getMark(i) {
    return this.__marks[i];
  }

}
