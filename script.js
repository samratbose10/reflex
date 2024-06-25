document.addEventListener('DOMContentLoaded', (event) => {
  const startButton = document.getElementById('startButton');
  const gameArea = document.getElementById('gameArea');
  const target = document.getElementById('target');
  const message = document.getElementById('message');
  const score = document.getElementById('score');
  const averageTime = document.getElementById('averageTime');

  let startTime;
  let reactionTime;
  let highScore = null;
  let totalReactionTime = 0;
  let roundCount = 0;

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
    // Position and display the target
    target.style.top = `${Math.random() * 250}px`;
    target.style.left = `${Math.random() * 250}px`;
    target.style.backgroundColor = getRandomColor();
    target.style.display = 'block';
    startTime = Date.now();
    target.addEventListener('click', registerClick);
  }

  function registerClick() {
    reactionTime = Date.now() - startTime;
    totalReactionTime += reactionTime;
    roundCount += 1;
    target.style.display = 'none';
    message.textContent = `Your reaction time is ${reactionTime} ms.`;
    updateScores();
    resetGame();
  }

  function updateScores() {
    if (highScore === null || reactionTime < highScore) {
      highScore = reactionTime;
      score.textContent = `High Score: ${highScore} ms`;
    }
    averageTime.textContent = `Average Reaction Time: ${(totalReactionTime / roundCount).toFixed(2)} ms`;
  }

  function resetGame() {
    startButton.textContent = "Play Again";
    startButton.classList.remove('hidden');
    gameArea.classList.add('hidden');
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});