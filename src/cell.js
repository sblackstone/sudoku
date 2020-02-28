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

  updateIfSingle() {
    let count = 0;
    let last = 0;
    for (let i = 1; i < 10; i++) {
      if (this.marks[i]) {
        last = i;
        count += 1;
      }
    }

    if (count === 1) {
      this.value = last;
      return true;
    } else {
      return false;
    }




  }

  export() {
    return { value: this.value, marks: this.marks };
  }

  setMark(i, v) {
    //console.log(`Set Mark ${i} ${v}`);
    this.__marks[i] = v;
  }

  getMark(i) {
    return this.__marks[i];
  }

}
