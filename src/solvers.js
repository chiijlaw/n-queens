/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  var solution = new Board({
    n: n
  });
  var rowIndex = 0;
  var columnIndex = 0;
  while (rowIndex < n && columnIndex < n) {
    solution.togglePiece(rowIndex, columnIndex);
    columnIndex += 1;
    rowIndex += 1;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0; //fixme
  var possiblities = [];
  var board = new Array(n);

  for (var i = 0; i < n; i++) {
    possiblities.push(i);
  }

  var recur = function (remainingPoss) {
    if (remainingPoss.length === 0) {
      solutionCount += 1;
    } else {
      for (var i = 0; i < remainingPoss.length; i++) {
        board[remainingPoss.length - 1] = remainingPoss[i];
        var newRemainingPoss = remainingPoss.filter(n => n !== remainingPoss[i]);
        recur(newRemainingPoss);
      }
      return solutionCount;
    };
  }

  recur(possiblities);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount; // should return a number
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  const rowHash = {};
  const colHash = {};
  let solution = null;
  let queensPlaced = 0;
  const board = new Board({
    n: n
  });

  const recur = function (startRowIndex, startColumnIndex) {
    if (queensPlaced === n) {
      solution = board.rows();
      return solution;
    }
    for (let rowIndex = startRowIndex; rowIndex < n; rowIndex++) {
      for (let columnIndex = 0; columnIndex < n; columnIndex++) {
        if (!rowHash[rowIndex] && !colHash[columnIndex]) {
          board.togglePiece(rowIndex, columnIndex);
          const majorDiagIndex = board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, columnIndex);
          const minorDiagIndex = board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, columnIndex);
          if (board.hasMajorDiagonalConflictAt(majorDiagIndex) || board.hasMinorDiagonalConflictAt(minorDiagIndex)) {
            board.togglePiece(rowIndex, columnIndex);
          } else {
            rowHash[rowIndex] = true;
            colHash[columnIndex] = true;
            queensPlaced += 1;
            recur(rowIndex, columnIndex);
            if (!solution) {
              board.togglePiece(rowIndex, columnIndex);
              queensPlaced -= 1;
              delete rowHash[rowIndex];
              delete colHash[columnIndex];
            } else {
              return solution;
            }
          }
        }
      }
    }
    return solution;
  };

  recur(0, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution ? solution : new Board({
    n: n
  }).rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  const rowHash = {};
  const colHash = {};
  let solution = 0;
  let queensPlaced = 0;
  const board = new Board({
    n: n
  });

  const recur = function (rowIndex, columnIndex) {
    if (queensPlaced === n) {
      solution += 1;
      return;
    }
    for (let rowIndex = rowIndex; rowIndex < n; rowIndex++) {
      for (let columnIndex = columnIndex; columnIndex < n; columnIndex++) {
        if (!rowHash[rowIndex] && !colHash[columnIndex]) {
          board.togglePiece(rowIndex, columnIndex);
          const majorDiagIndex = board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, columnIndex);
          const minorDiagIndex = board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, columnIndex);
          if (board.hasMajorDiagonalConflictAt(majorDiagIndex) || board.hasMinorDiagonalConflictAt(minorDiagIndex)) {
            board.togglePiece(rowIndex, columnIndex);
          } else {
            rowHash[rowIndex] = true;
            colHash[columnIndex] = true;
            queensPlaced += 1;
            recur(rowIndex, columnIndex);
            board.togglePiece(rowIndex, columnIndex);
            queensPlaced -= 1;
          }
        }
      }
    }
    return;
  };

  recur(0, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};