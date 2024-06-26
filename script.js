let startTime, endTime;
let timerInterval;
let waitingForLightsOut = false;
const backgroundMusic = document.getElementById('backgroundMusic');
const popup = document.getElementById('popup');
const readyButton = document.getElementById('readyButton');

document.getElementById('startButton').addEventListener('click', showPopup);
readyButton.addEventListener('click', startSequence);
document.addEventListener('keydown', handleKeyPress);

function showPopup() {
    popup.style.display = 'flex';
}

function startSequence() {
    popup.style.display = 'none';
    backgroundMusic.play();
    resetLights();
    document.getElementById('result').innerText = '';
    document.getElementById('timer').innerText = '00.000';
    document.getElementById('startButton').disabled = true;
    waitingForLightsOut = false;

    const delays = [1000, 2000, 3000, 4000, 5000];
    delays.forEach((delay, index) => {
        setTimeout(() => {
            document.getElementById(`light${index + 1}`).style.backgroundColor = 'red';
            if (index === 4) {
                setTimeout(() => {
                    resetLights();
                    waitingForLightsOut = true;
                    startTime = new Date().getTime();
                    startTimer();
                }, 1000); // Give a short delay before resetting lights to grey and starting the timer
            }
        }, delay);
    });
}

function resetLights() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`light${i}`).style.backgroundColor = 'gray';
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - startTime) / 1000;
        document.getElementById('timer').innerText = elapsedTime.toFixed(3);
    }, 10);
}

function handleKeyPress(event) {
    if (event.code === 'Space') {
        if (waitingForLightsOut) {
            endTime = new Date().getTime();
            const reactionTime = (endTime - startTime) / 1000;
            clearInterval(timerInterval);
            document.getElementById('result').innerText = `Your reaction time is ${reactionTime.toFixed(3)} seconds`;
            document.getElementById('startButton').disabled = false;
            waitingForLightsOut = false;
        } else if (!startTime) {
            showPopup();
        }
    }
}
