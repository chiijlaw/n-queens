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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};