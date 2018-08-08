// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;
      for (let i = 0; i < row.length; i++) {
        const square = row[i];
        if (square) {
          count += 1;
          if (count > 1) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      const numOfRows = this.get('n');
      for (let i = 0; i < numOfRows; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      const board = this.rows();
      let count = 0;
      for (let i = 0; i < board.length; i++) {
        const square = board[i][colIndex];
        if (square) {
          count += 1;
          if (count > 1) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      const numOfRows = this.get('n');
      for (let i = 0; i < numOfRows; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      // togglePiece: function (rowIndex, colIndex)
      const max = this.get('n');
      let count = 0;
      let columnIndex;
      let rowIndex;

      if (majorDiagonalColumnIndexAtFirstRow <= 0) {
        rowIndex = majorDiagonalColumnIndexAtFirstRow * -1;
        columnIndex = 0;
      } else {
        columnIndex = majorDiagonalColumnIndexAtFirstRow;
        rowIndex = 0;
      }

      while (columnIndex < max && rowIndex < max) {
        const square = this.attributes[rowIndex][columnIndex];
        if (square) {
          count += 1;
          if (count > 1) {
            return true;
          }
        }
        columnIndex += 1;
        rowIndex += 1;
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      const max = this.get('n');
      let count = 0;
      let columnIndex = 0;
      let rowIndex = 0;

      for (var n = -(max - 1); n < max; n++) {
        if (this.hasMajorDiagonalConflictAt(n)) {
          return true;
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      const max = this.get('n');
      let count = 0;
      let columnIndex;
      let rowIndex;

      // 3 > 4
      if (minorDiagonalColumnIndexAtFirstRow >= max) { //true
        columnIndex = max - 1; // 3
        rowIndex = minorDiagonalColumnIndexAtFirstRow - (max - 1); // 3
      } else {
        columnIndex = minorDiagonalColumnIndexAtFirstRow;
        rowIndex = 0;
      }

      while (columnIndex >= 0 && rowIndex < max) {
        const square = this.attributes[rowIndex][columnIndex];
        if (square) {
          count += 1;
          if (count > 1) {
            return true;
          }
        }
        columnIndex -= 1;
        rowIndex += 1;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      const max = this.get('n');
      let count = 0;
      let columnIndex = 0;
      let rowIndex = 0;

      for (var n = 0; n < (max - 1) * 2; n++) {
        if (this.hasMinorDiagonalConflictAt(n)) {
          return true;
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());