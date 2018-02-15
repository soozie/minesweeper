/*  const printBoard = (board) => {
    console.log('Current Board:');
    console.log(board[0].join(' | '));
    console.log(board[1].join(' | '));
    console.log(board[2].join(' | '));
  };

  const board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  printBoard(board);

  board[0][1] = '1';
  board[2][2] = 'B';
  printBoard(board);
*/

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let rowIn = 0; rowIn < numberOfRows; rowIn++) {
    let row = [' '];
    for (let colIn = 0; colIn < numberOfColumns; colIn++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

// console.log(generatePlayerBoard(6, 6));

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let rowIn = 0; rowIn < numberOfRows; rowIn++) {
    let row = [' '];
    for (let colIn = 0; colIn < numberOfColumns; colIn++) {
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
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighborOffsets.forEach((offset) => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0
    && neighborRowIndex <= numberOfRows
    && neighborColumnIndex >= 0
    && neighborColumnIndex <= numberOfColumns) {
      if (bombBoard[rowIndex][columnIndex] === 'B') {
        numberOfBombs++
      }
    }
  });
  return numberOfBombs;
  // purpose of this function is return the number of bombs in an adjacent neighbor.
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  }
}

const printBoard = (board) => {
  console.log(board.map((row) => {
    return row.join(' | ');
  }).join('\n'));
};

const playerBoard = generatePlayerBoard(3, 4);
const bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
