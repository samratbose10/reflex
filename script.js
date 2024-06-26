let startTime, endTime;
let timerInterval;

document.getElementById('startButton').addEventListener('click', startSequence);
document.addEventListener('click', recordReactionTime);

function startSequence() {
    resetLights();
    document.getElementById('result').innerText = '';
    document.getElementById('timer').innerText = '00.000';
    document.getElementById('startButton').disabled = true;

    const delays = [1000, 2000, 3000, 4000, Math.floor(Math.random() * 2000) + 5000];
    delays.forEach((delay, index) => {
        setTimeout(() => {
            if (index < 4) {
                document.getElementById(`light${index + 1}`).style.backgroundColor = 'red';
            } else {
                document.getElementById('light5').style.backgroundColor = 'green';
                startTime = new Date().getTime();
                startTimer();
            }
        }, delay);
    });
}

function resetLights() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`light${i}`).style.backgroundColor = 'black';
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - startTime) / 1000;
        document.getElementById('timer').innerText = elapsedTime.toFixed(3);
    }, 1);
}

function recordReactionTime() {
    if (startTime) {
        endTime = new Date().getTime();
        const reactionTime = (endTime - startTime) / 1000;
        clearInterval(timerInterval);
        document.getElementById('result').innerText = `Your reaction time is ${reactionTime.toFixed(3)} seconds`;
        document.getElementById('startButton').disabled = false;
        document.removeEventListener('click', recordReactionTime);
    }
}
