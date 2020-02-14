import { Board } from '../src/board';
import { Cell  } from '../src/cell';

var assert = require('assert');

describe('Cell', function() {

  describe('construction', function() {

    it('should work without value', function() {
      const c = new Cell();
      assert.equal(c.value, null);

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
            assert.equal(b.getVal(i,j), null);
        }
      }
    });

    it('can get/get value', function() {
      const b = new Board();
      b.setVal(5,7,"elephant");
      assert.equal("elephant", b.getVal(5,7));
    });


  });

});
