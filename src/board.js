export default class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(flipRow, flipColumn) {
    // Check if tile is empty/already flipped, if so, return
    if (this.playerBoard[flipRow][flipColumn] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    // Check if tile is a bomb, if so, place a BOMB in player Board
    } else if (this._bombBoard[flipRow][flipColumn] === 'B') {
      this.playerBoard[flipRow][flipColumn] = 'B';
    // If tile is not a bomb place number of surrounding BOMBS on player Board
    } else {
      this.playerBoard[flipRow][flipColumn] = this.getNumberOfNeighborBombs(flipRow, flipColumn);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [-1, 0],
      [0, -1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    this._numberOfSurroundingBombs = 0;

    neighborOffsets.forEach((offset) => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0
      && neighborRowIndex < numberOfRows
      && neighborColumnIndex >= 0
      && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          this._numberOfSurroundingBombs++;
        }
      }
    });

    return this._numberOfSurroundingBombs;
    // purpose of this function is return the number of bombs in an adjacent neighbor.
  }

  print() {
    console.log(this._playerBoard.map((row) => {
      return row.join(' | ');
    }).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [' '];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [null];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced <= numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}
