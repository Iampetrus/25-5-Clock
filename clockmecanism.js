let breakIncrementButton = document.getElementById('break-increment');
let breakDecrementButton = document.getElementById('break-decrement');

let sessionIncrementButton = document.getElementById('session-increment');
let sessionDecrementButton = document.getElementById('session-decrement');

let startStopButton = document.getElementById('start_stop');
let resetButton = document.getElementById('reset');

let breakLength = document.getElementById('break-length');
let sessionLength = document.getElementById('session-length');
let timeLeft = document.getElementById('time-left');
let timerLabel = document.getElementById('timer-label');
let beepSound = document.getElementById('beep');

let timer;
let timerStatus = "begin";

// Initialize timeLeft with the session length in mm:ss format
timeLeft.innerText = formatTime(sessionLength.innerText);

// Event listeners for break increment and decrement
breakIncrementButton.addEventListener('click', () => {
    if (parseInt(breakLength.innerText) < 60) {
        breakLength.innerText = parseInt(breakLength.innerText) + 1;
    }
});

breakDecrementButton.addEventListener('click', () => {
    if (parseInt(breakLength.innerText) > 1) {
        breakLength.innerText = parseInt(breakLength.innerText) - 1;
    }
});

// Event listeners for session increment and decrement
sessionIncrementButton.addEventListener('click', () => {
    if (parseInt(sessionLength.innerText) < 60) {
        sessionLength.innerText = parseInt(sessionLength.innerText) + 1;
        if (timerStatus === 'begin') {
            timeLeft.innerText = formatTime(sessionLength.innerText);
        }
    }
});

sessionDecrementButton.addEventListener('click', () => {
    if (parseInt(sessionLength.innerText) > 1) {
        sessionLength.innerText = parseInt(sessionLength.innerText) - 1;
        if (timerStatus === 'begin') {
            timeLeft.innerText = formatTime(sessionLength.innerText);
        }
    }
});

startStopButton.addEventListener('click', () => {
    if (timerStatus === 'begin' || timerStatus === 'stopped') {
        // start
        timerStatus = "counting";
        timer = setInterval(() => {
            timeLeft.innerText = decrementTime(timeLeft.innerText);
        }, 1000);
    } else if (timerStatus === "counting") {
        // stop
        timerStatus = 'stopped';
        clearInterval(timer);
    }
});

resetButton.addEventListener('click', () => {

    clearInterval(timer);

    // Reset breakLength and sessionLength to default values
    breakLength.innerText = '5';
    sessionLength.innerText = '25';

    // Reset timeLeft to initial session length
    timeLeft.innerText = formatTime(sessionLength.innerText);

    // Reset beep sound
    beepSound.pause();
    beepSound.currentTime = 0;

    timerStatus = 'begin';
    timerLabel.innerText = 'Session';
});

function decrementTime(timeString) {
    let timeDisplay = timeString.split(':');
    let minuteDisplay = parseInt(timeDisplay[0]);
    let secondDisplay = parseInt(timeDisplay[1]);

    secondDisplay -= 1;

    if (secondDisplay === -1) {
        secondDisplay = 59;
        minuteDisplay -= 1;
    }

    // Handle the case when the time reaches 00:00
    if (minuteDisplay === -1) {
        beepSound.play(); // Play the beep sound

        if (timerLabel.innerText === 'Session') {
            timerLabel.innerText = 'Break';
            timeLeft.innerText = formatTime(breakLength.innerText);
        } else {
            timerLabel.innerText = 'Session';
            timeLeft.innerText = formatTime(sessionLength.innerText);
        }
        minuteDisplay = parseInt(timeLeft.innerText.split(':')[0]);
        secondDisplay = parseInt(timeLeft.innerText.split(':')[1]);
    }

    return formatTime(minuteDisplay, secondDisplay);
}

function formatTime(minutes, seconds = 0) {
    if (typeof minutes === 'string') {
        minutes = parseInt(minutes);
    }
    if (typeof seconds === 'string') {
        seconds = parseInt(seconds);
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return minutes + ':' + seconds;
}