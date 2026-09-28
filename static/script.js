// Color palette for dots - Pinterest-inspired muted colors
const DOT_COLORS = [
    '#d4a5a0', // dusty rose
    '#e8b4aa', // soft coral
    '#f4c4a8', // peach
    '#d4c5e2', // lavender
    '#b8d4c8', // sage green
    '#b8d4e6', // powder blue
    '#f5e6b3', // butter yellow
    '#c8956f', // terracotta
    '#d9c4e6', // muted lilac
    '#c8e6d4'  // soft mint
];

// Game State
let gameState = {
    isRunning: false,
    score: 0,
    timeRemaining: 30,
    bestScore: 0,
    currentDot: null,
    gameTimer: null
};

// DOM Elements
const gameArea = document.getElementById('gameArea');
const startBtn = document.getElementById('startBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const playAgainBtn2 = document.getElementById('playAgainBtn2');
const currentScoreEl = document.getElementById('currentScore');
const timeRemainingEl = document.getElementById('timeRemaining');
const bestScoreEl = document.getElementById('bestScore');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreEl = document.getElementById('finalScore');
const bestScoreDisplayEl = document.getElementById('bestScoreDisplay');

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    loadBestScore();
    startBtn.addEventListener('click', startGame);
    playAgainBtn.addEventListener('click', startGame);
    playAgainBtn2.addEventListener('click', startGame);
});

// Load best score from backend
async function loadBestScore() {
    try {
        const response = await fetch('/api/score');
        const data = await response.json();
        gameState.bestScore = data.best_score;
        bestScoreEl.textContent = gameState.bestScore;
    } catch (error) {
        console.error('Error loading best score:', error);
    }
}

// Start the game
function startGame() {
    if (gameState.isRunning) return;

    // Reset game state
    gameState.isRunning = true;
    gameState.score = 0;
    gameState.timeRemaining = 30;
    gameState.currentDot = null;

    // Clear game area
    gameArea.innerHTML = '';
    gameOverScreen.style.display = 'none';

    // Update UI
    currentScoreEl.textContent = gameState.score;
    timeRemainingEl.textContent = gameState.timeRemaining;
    startBtn.style.display = 'none';
    playAgainBtn.style.display = 'none';
    gameArea.style.cursor = 'crosshair';

    // Create first dot
    createDot();

    // Start timer
    gameState.gameTimer = setInterval(updateTimer, 1000);
}

// Create a new dot
function createDot() {
    if (!gameState.isRunning) return;

    // Remove old dot if exists
    if (gameState.currentDot) {
        gameState.currentDot.remove();
    }

    // Create new dot element
    const dot = document.createElement('div');
    dot.className = 'dot';

    // Random position
    const gameAreaRect = gameArea.getBoundingClientRect();
    const gameAreaWidth = gameAreaRect.width;
    const gameAreaHeight = gameAreaRect.height;
    const dotSize = 60;

    const maxX = gameAreaWidth - dotSize;
    const maxY = gameAreaHeight - dotSize;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    dot.style.left = x + 'px';
    dot.style.top = y + 'px';

    // Random color
    const color = DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)];
    dot.style.backgroundColor = color;

    // Click handler
    dot.addEventListener('click', (e) => {
        e.stopPropagation();
        if (gameState.isRunning) {
            gameState.score++;
            currentScoreEl.textContent = gameState.score;
            createDot();
        }
    });

    gameArea.appendChild(dot);
    gameState.currentDot = dot;
}

// Update timer
function updateTimer() {
    gameState.timeRemaining--;
    timeRemainingEl.textContent = gameState.timeRemaining;

    if (gameState.timeRemaining <= 0) {
        endGame();
    }
}

// End game
async function endGame() {
    gameState.isRunning = false;
    clearInterval(gameState.gameTimer);

    // Remove current dot
    if (gameState.currentDot) {
        gameState.currentDot.remove();
    }

    // Save score if it's a new best
    if (gameState.score > gameState.bestScore) {
        try {
            const response = await fetch('/api/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ score: gameState.score })
            });
            const data = await response.json();
            gameState.bestScore = data.best_score;
            bestScoreEl.textContent = gameState.bestScore;
        } catch (error) {
            console.error('Error saving score:', error);
        }
    }

    // Show game over screen
    finalScoreEl.textContent = gameState.score;
    bestScoreDisplayEl.textContent = gameState.bestScore;
    gameOverScreen.style.display = 'flex';

    // Reset UI
    startBtn.style.display = 'none';
    playAgainBtn.style.display = 'inline-block';
}
