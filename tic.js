const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cellIndex = e.target.getAttribute('data-index');
    
    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    checkForWinner();  // Check for a winner first
    if (!gameActive) return; // Exit if there's a winner or draw
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    updateStatus(); // Update the status after switching the player
}

function updateStatus() {
    gameStatus.textContent = gameActive 
        ? `Player ${currentPlayer}'s turn` 
        : gameState.includes('') 
            ? `${currentPlayer === 'X' ? 'O' : 'X'} wins!` 
            : "It's a draw!";
}

function checkForWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            gameStatus.textContent = `${currentPlayer} wins!`;  // Display winner
            return;
        }
    }

    if (!gameState.includes('')) {
        gameActive = false;
        gameStatus.textContent = "It's a draw!";
    }
}

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    updateStatus();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

updateStatus();
