import { Board } from '../src/board';
import { Cell  } from '../src/cell';
import { assert } from 'assert';

describe('Cell', function() {

  describe('construction', function() {

    it('should work without value', function() {
      const c = new Cell();
      assert.equal(c.value, -1);

    });

    it('should work with value', function() {
      const c = new Cell(5);
      assert.equal(c.value, 5);
    });

  });

  describe('Marks', function() {
    const c = new Cell(9);
    assert.deepEqual(c.__marks, [true, true, true, true, true, true, true, true, true ]);
    assert(c.getMark(5));
    c.setMark(5, false);
    assert(!c.getMark(5));
  });

});



describe('Board', function() {

  describe('construction', function() {

    it('should construct', function() {
      const b = new Board();
    });

    it('should start with 9 empty squares', function() {
      const b = new Board();
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            assert.equal(b.getVal(i,j), -1);
        }
      }
    });

    it('can get/get value', function() {
      const b = new Board();
      b.setVal(5,7,"elephant");
      assert.equal("elephant", b.getVal(5,7));
    });


  });

  it('should know if a value is in a row', function() {
    const b = new Board();
    for (let j = 0; j < 9; j++) {
      assert(!b.valueInRow(0, 9));
      b.setVal(0,j,9);
      assert(b.valueInRow(0, 9));
      b.setVal(0,j,-1);
    }
  });

  it('should know if a value is in a col', function() {
    const b = new Board();
    for (let i = 0; i < 9; i++) {
      assert(!b.valueInCol(0, 9));
      b.setVal(i,0,9);
      b.dump();
      assert(b.valueInCol(0, 9));
      b.setVal(i,0,-1);
    }
  });



});
