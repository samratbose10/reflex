document.addEventListener('DOMContentLoaded', (event) => {
  const startButton = document.getElementById('startButton');
  const gameArea = document.getElementById('gameArea');
  const lights = document.querySelectorAll('.light');
  const message = document.getElementById('message');
  const score = document.getElementById('score');
  const averageTime = document.getElementById('averageTime');
  const leaderboardList = document.getElementById('leaderboardList');
  const appearSound = document.getElementById('appearSound');
  const clickSound = document.getElementById('clickSound');

  let startTime;
  let reactionTime;
  let highScore = null;
  let totalReactionTime = 0;
  let roundCount = 0;
  let leaderboard = [];
  let gameActive = false;

  startButton.addEventListener('click', startGame);
  gameArea.addEventListener('click', registerClick);

  function startGame() {
      startButton.classList.add('hidden');
      gameArea.classList.remove('hidden');
      message.textContent = "";
      gameActive = true;

      
      let lightIndex = 0;
      const lightInterval = setInterval(() => {
          if (lightIndex < lights.length) {
              lights[lightIndex].classList.add('on');
              lightIndex++;
          } else {
              clearInterval(lightInterval);
              setTimeout(() => {
                  resetLights();
                  startReactionTest();
              }, Math.random() * 2000 + 1000);
          }
      }, 1000);
  }

  function resetLights() {
      lights.forEach(light => light.classList.remove('on'));
  }

  function startReactionTest() {
      
      if (appearSound.readyState >= 2) {
          appearSound.play().catch(error => {
              console.error("Audio playback failed:", error);
          });
      }

      
      startTime = Date.now();
  }

  function registerClick() {
      if (!gameActive) return;

      gameActive = false;
      // Play click sound if available
      if (clickSound.readyState >= 2) {
          clickSound.play().catch(error => {
              console.error("Audio playback failed:", error);
          });
      }

      reactionTime = Date.now() - startTime;
      totalReactionTime += reactionTime;
      roundCount += 1;
      message.textContent = `Your reaction time is ${reactionTime} ms.`;
      updateScores();
      updateLeaderboard();
      resetGame();
  }

  function updateScores() {
      if (highScore === null || reactionTime < highScore) {
          highScore = reactionTime;
          score.textContent = `High Score: ${highScore} ms`;
      }
      averageTime.textContent = `Average Reaction Time: ${(totalReactionTime / roundCount).toFixed(2)} ms`;
  }

  function updateLeaderboard() {
      leaderboard.push(reactionTime);
      leaderboard.sort((a, b) => a - b);
      if (leaderboard.length > 5) {
          leaderboard.pop();
      }
      displayLeaderboard();
  }

  function displayLeaderboard() {
      leaderboardList.innerHTML = '';
      leaderboard.forEach((time, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${index + 1}. ${time} ms`;
          leaderboardList.appendChild(listItem);
      });
  }

  function resetGame() {
      startButton.textContent = "Play Again";
      startButton.classList.remove('hidden');
      gameArea.classList.add('hidden');
  }
});
