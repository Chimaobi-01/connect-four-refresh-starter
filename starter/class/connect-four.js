const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);


    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    let horizontalWin = ConnectFour.__checkHorizontalWin(grid)
    let verticalWin = ConnectFour.__checkVerticalWin(grid)
    let diagonalWin = ConnectFour.__checkDiagonalWin(grid)
    let tie = ConnectFour.__hasFullGrid(grid)

    if (horizontalWin != null) { return horizontalWin }
    if (verticalWin != null) { return verticalWin }
    if (diagonalWin != null) { return diagonalWin }
    if (tie) { return 'T' }
    return false
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

  static __checkHorizontalWin(grid) {

    let horizontalXWin = grid.some(row => ConnectFour.__foundFour(row, 'X'))
    let horizontalOWin = grid.some(row => ConnectFour.__foundFour(row, 'O'))

    if (horizontalOWin) { return 'O' }
    if (horizontalXWin) { return 'X' }
    return null

  }

  static __checkVerticalWin(grid) {
    let verticalXWin = ConnectFour.__rotateGridToVerticalShape(grid).some(row => ConnectFour.__foundFour(row, 'X'))
    let verticalOWin = ConnectFour.__rotateGridToVerticalShape(grid).some(row => ConnectFour.__foundFour(row, 'O'))

    if (verticalOWin) { return 'O' }
    if (verticalXWin) { return 'X' }
    return null

  }

  static __checkDiagonalWin(grid) {
    let num = 4

    for (let i = 0; i <= grid.length - num; i++) {
      for (let j = 0; j <= grid[0].length - num; j++) {
        let squared = grid.slice(i, num + i).map(row => row.slice(j, num + j))
        let diagonalXDown = squared.every((row, i) => row[i] === "X")
        let diagonalXUp = squared.every((row, i) => row[num - 1 - i] === 'X')
        let diagonalODown = squared.every((row, i) => row[i] === 'O')
        let diagonalOUp = squared.every((row, i) => row[num - 1 - i] === 'O')


        if (diagonalXUp) { return "X" }
        if (diagonalXDown) { return "X" }
        if (diagonalODown) { return "O" }
        if (diagonalOUp) { return "O" }

      }
    }
    return null
  }

  static __hasFullGrid(grid) {
    return grid.every(row => row.every(col => col != ' '))
  }


  static __rotateGridToVerticalShape(grid) {
    let newGrid = []

    for (let i = 0; i < grid[0].length; i++) {
      let newRow = []

      for (let j = 0; j < grid.length; j++) {
        let row = grid[j]
        let char = row[i]
        newRow.push(char)
      }
      newGrid.push(newRow)
    }
    return newGrid
  }

  static __foundFour(array, char) {
    for (let index = 0; index <= array.length - 4; index++) {
      if (array.slice(index, index + 4).every(e => e === char)) {
        return true
      }
    }
    return false
  }

  static __foundFourDiagonal(grid, char) {

  }
}






module.exports = ConnectFour;
