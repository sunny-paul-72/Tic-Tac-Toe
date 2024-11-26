// script.js
const toggle = document.getElementById('mode-toggle');
const body = document.body;
const container = document.querySelector('.container');
const cells = document.querySelectorAll('.cell');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let score = { X: 0, O: 0 };

function handleClick(event) {
  const cellIndex = event.target.id.split('-')[1];
  
  if (gameBoard[cellIndex] || !gameActive) return;

  gameBoard[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  
  checkWinner();
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]               // Diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      highlightWinner(pattern);
      winnerMessage.textContent = `Player ${gameBoard[a]} Wins!`;
      score[gameBoard[a]]++;
      updateScore();
      winnerMessage.classList.remove('hidden');
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameActive = false;
    winnerMessage.textContent = "It's a Draw!";
    winnerMessage.classList.remove('hidden');
  }
}

function highlightWinner(pattern) {
  pattern.forEach(index => {
    document.getElementById(`cell-${index}`).classList.add('winner');
  });
}

function updateScore() {
  scoreX.textContent = score.X;
  scoreO.textContent = score.O;
}

function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  winnerMessage.classList.add('hidden');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner');
  });
}

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);

// Toggle Dark/Light Mode
toggle.addEventListener('change', () => {
  const isLightMode = toggle.checked;
  body.classList.toggle('light-mode', isLightMode);
  container.classList.toggle('light-mode', isLightMode);
  winnerMessage.classList.toggle('light-mode', isLightMode);
  restartButton.classList.toggle('light-mode', isLightMode);

  cells.forEach(cell => {
    cell.classList.toggle('light-mode', isLightMode);
  });
});
