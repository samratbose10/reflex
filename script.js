let startTime, endTime;
let timerInterval;
let waitingForLightsOut = false;
let reactionTime = 0; // Store the reaction time
const backgroundMusic = document.getElementById('backgroundMusic');
const popup = document.getElementById('popup');
const readyButton = document.getElementById('readyButton');
const reactionImage = document.getElementById('reactionImage');
const timerDisplay = document.getElementById('timer');

document.getElementById('startButton').addEventListener('click', showPopup);
readyButton.addEventListener('click', startSequence);
document.addEventListener('keydown', handleKeyPress);
timerDisplay.addEventListener('click', () => displayReactionImage(reactionTime)); // Add click event listener

function showPopup() {
    popup.style.display = 'flex';
}

function startSequence() {
    popup.style.display = 'none';
    backgroundMusic.play();
    resetLights();
    document.getElementById('result').innerText = '';
    timerDisplay.innerText = '00.000';
    document.getElementById('startButton').disabled = true;
    reactionImage.style.right = '-150px'; // Reset the image position
    reactionImage.classList.remove('show'); // Ensure the image is hidden initially

    const delays = [1000, 2000, 3000, 4000, 5000];
    const lights = [
        'light1-3', 'light1-4',
        'light2-3', 'light2-4',
        'light3-3', 'light3-4',
        'light4-3', 'light4-4',
        'light5-3', 'light5-4'
    ];

    lights.forEach((light, index) => {
        setTimeout(() => {
            document.getElementById(light).style.backgroundColor = 'red';
            if (index === lights.length - 1) {
                setTimeout(() => {
                    resetLights();
                    waitingForLightsOut = true;
                    startTime = performance.now(); // Use high-resolution time
                    startTimer();
                }, 1000); // Give a short delay before resetting lights to grey and starting the timer
            }
        }, delays[Math.floor(index / 2)]);
    });
}

function resetLights() {
    document.querySelectorAll('.light').forEach(light => {
        light.style.backgroundColor = 'black';
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        const currentTime = performance.now(); // Use high-resolution time
        const elapsedTime = (currentTime - startTime) / 1000;
        timerDisplay.innerText = elapsedTime.toFixed(3);
    }, 10);
}

function handleKeyPress(event) {
    if (event.code === 'Space') {
        if (waitingForLightsOut) {
            endTime = performance.now(); // Use high-resolution time
            reactionTime = (endTime - startTime) / 1000;
            clearInterval(timerInterval);
            document.getElementById('result').innerText = `Your reaction time is ${reactionTime.toFixed(3)} seconds`;
            document.getElementById('startButton').disabled = false;
            waitingForLightsOut = false;
        } else if (!startTime) {
            showPopup();
        }
    }
}

function displayReactionImage(time) {
    console.log(`Reaction time: ${time}`); // Debugging statement
    if (time < 0.2) {
        reactionImage.src = 'images/image1.png';
        console.log('Displaying image1.png'); // Debugging statement
    } else if (time >= 0.2 && time < 0.25) {
        reactionImage.src = 'images/image2.png';
        console.log('Displaying image2.png'); // Debugging statement
    } else if (time >= 0.25 && time < 3) {
        reactionImage.src = 'images/image3.png';
        console.log('Displaying image3.png'); // Debugging statement
    } else {
        reactionImage.src = '';
        console.log('No image to display'); // Debugging statement
        return;
    }
    reactionImage.classList.add('show'); // Trigger the CSS transition
    console.log('Added show class'); // Debugging statement
}
