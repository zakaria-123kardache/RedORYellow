let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = JSON.parse(localStorage.getItem('tictactoeScores')) || {
    playerOne: 0,
    playerTwo: 0,
    streakOne: 0,
    streakTwo: 0
};

const sounds = {
    click: document.getElementById('clickSound'),
    win: document.getElementById('winSound'),
    draw: document.getElementById('drawSound')
};

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    updateScoreDisplay();
    updatePlayerTurnIndicator();
    initializeDragAndDrop();
});

function createParticles(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--x', (Math.random() - 0.5) * 100 + 'px');
        particle.style.setProperty('--y', (Math.random() - 0.5) * 100 + 'px');
        particle.style.backgroundColor = currentPlayer === 'X' ? '#ff00ff' : '#00fff2';
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

function handleClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.id.replace('item', ''));

    if (gameBoard[cellIndex] !== '' || !gameActive) return;

    playSound('click');
    const rect = cell.getBoundingClientRect();
    createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);

    placeMark(cell, cellIndex);
}

function placeMark(cell, cellIndex) {
    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer, 'animate__animated', 'animate__bounceIn');

    if (checkWin()) {
        handleWin();
        return;
    }

    if (checkDraw()) {
        handleDraw();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updatePlayerTurnIndicator();
}

function handleWin() {
    gameActive = false;
    playSound('win');
    
    if (currentPlayer === 'X') {
        scores.playerOne++;
        scores.streakOne++;
        scores.streakTwo = 0;
    } else {
        scores.playerTwo++;
        scores.streakTwo++;
        scores.streakOne = 0;
    }

    localStorage.setItem('tictactoeScores', JSON.stringify(scores));
    updateScoreDisplay();

    Swal.fire({
        title: `${currentPlayer === 'X' ? 'Player X' : 'Player O'} Wins!`,
        text: '🎮 Victory achieved! Ready for another round?',
        icon: 'success',
        background: '#0a0a2a',
        color: '#fff',
        confirmButtonText: 'Next Battle!',
        confirmButtonColor: '#bc13fe',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            resetGame();
        }
    });
}

function playSound(soundName) {
    sounds[soundName].currentTime = 0;
    sounds[soundName].play();
}

function updateScoreDisplay() {
    document.getElementById('score-one').textContent = scores.playerOne;
    document.getElementById('score-two').textContent = scores.playerTwo;
    document.getElementById('streak-one').textContent = scores.streakOne;
    document.getElementById('streak-two').textContent = scores.streakTwo;
}

function handleDraw() {
    gameActive = false;
    playSound('draw');
    
    Swal.fire({
        title: 'Epic Draw!',
        text: '⚔️ Both warriors fought valiantly!',
        icon: 'info',
        background: '#0a0a2a',
        color: '#fff',
        confirmButtonText: 'Battle Again!',
        confirmButtonColor: '#bc13fe'
    }).then((result) => {
        if (result.isConfirmed) {
            resetGame();
        }
    });
}

function updatePlayerTurnIndicator() {
    document.getElementById('player-one').style.transform = 
        currentPlayer === 'X' ? 'scale(1.05)' : 'scale(1)';
    document.getElementById('player-two').style.transform = 
        currentPlayer === 'O' ? 'scale(1.05)' : 'scale(1)';
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    document.querySelectorAll('.item').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'animate__animated', 'animate__bounceIn');
    });
    
    updatePlayerTurnIndicator();
}

function initializeDragAndDrop() {
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        item.addEventListener('click', handleClick);
        
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        item.addEventListener('drop', (e) => {
            e.preventDefault();
            if (gameBoard[parseInt(e.target.id.replace('item', ''))] === '') {
                handleClick(e);
            }
        });
    });
}

// Initialize game
document.querySelectorAll('.item').forEach(cell => {
    cell.addEventListener('click', handleClick);
});

updatePlayerTurnIndicator();
