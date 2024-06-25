document.addEventListener('DOMContentLoaded', (event) => {
    const startButton = document.getElementById('startButton');
    const gameArea = document.getElementById('gameArea');
    const target = document.getElementById('target');
    const message = document.getElementById('message');

    let startTime;
    let reactionTime;

    startButton.addEventListener('click', startGame);

    function startGame() {
        startButton.classList.add('hidden');
        gameArea.classList.remove('hidden');
        message.textContent = "Get ready...";
        
        setTimeout(() => {
            showTarget();
        }, Math.random() * 2000 + 1000);
    }

    function showTarget() {
        target.style.top = `${Math.random() * 250}px`;
        target.style.left = `${Math.random() * 250}px`;
        target.style.display = 'block';
        startTime = Date.now();
        target.addEventListener('click', registerClick);
    }

    function registerClick() {
        reactionTime = Date.now() - startTime;
        target.style.display = 'none';
        message.textContent = `Your reaction time is ${reactionTime} ms.`;
        resetGame();
    }

    function resetGame() {
        startButton.textContent = "Play Again";
        startButton.classList.remove('hidden');
        gameArea.classList.add('hidden');
    }
});