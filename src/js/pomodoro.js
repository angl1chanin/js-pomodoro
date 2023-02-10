const actionsBtns = document.querySelectorAll('[data-action]');
const timerInputs = document.querySelectorAll('input');

const TOTAL_AVAILABLE_SECONDS = 6000;
let TOTAL_SECONDS = 0;
let TOTAL_FOCUS_SECONDS = 0;
let TOTAL_BREAK_SECONDS = 0;
let IS_PAUSED = false;
let IS_BREAK = false;
let IS_FOCUS = true;

let focusTimerCountId;
let breakTimerCountId;

window.onload = init();

function init() {
    let timerFocus = document.querySelector('.focus-time');
    let timerBreak = document.querySelector('.break-time');
    
    timerFocus.querySelector('#minutes').value = '25';
    timerFocus.querySelector('#seconds').value = '00';
    timerBreak.querySelector('#minutes').value = '05';
    timerBreak.querySelector('#seconds').value = '00';
}

function Timer(focusTotal, breakTotal) {

    // get display counters
    let display = document.querySelector('.modal__control').querySelector('.timer__display');
    let displayMinutes = display.querySelector('#minutes');
    let displaySeconds = display.querySelector('#seconds');

    // set given focus value to display
    let focusMinutes = Math.floor(focusTotal / 60);
    let focusSeconds = focusTotal - (60 * focusMinutes);
    displayMinutes.value = String(focusMinutes).length === 1 ? '0' + focusMinutes : focusMinutes;
    displaySeconds.value = String(focusSeconds).length === 1 ? '0' + focusSeconds : focusSeconds;

    // convert given break value
    let breakMinutes = Math.floor(breakTotal / 60);
    let breakSeconds = breakTotal - (60 * breakMinutes);

    let updateBreakTimer = () => {
        breakMinutes = Math.floor(breakTotal / 60);
        breakSeconds = breakTotal - (60 * breakMinutes);
        displayMinutes.value = String(breakMinutes).length === 1 ? '0' + breakMinutes : breakMinutes;
        displaySeconds.value = String(breakSeconds).length === 1 ? '0' + breakSeconds : breakSeconds;
        document.querySelector('.modal__control-title').innerHTML = 'Break';
    }

    let updateFocusTimer = () => {
        focusMinutes = Math.floor(focusTotal / 60);
        focusSeconds = focusTotal - (60 * focusMinutes);
        displayMinutes.value = String(focusMinutes).length === 1 ? '0' + focusMinutes : focusMinutes;
        displaySeconds.value = String(focusSeconds).length === 1 ? '0' + focusSeconds : focusSeconds;
        document.querySelector('.modal__control-title').innerHTML = 'Focusing';
    }

    let breakTimerCount = () => {
        if (breakSeconds === 0) {
            breakMinutes--;
            breakSeconds = 59;
        } else {
            breakSeconds--;
        }

        if (breakMinutes === 0 && breakSeconds === 0) {
            IS_BREAK = false;
            IS_FOCUS = true;
            updateFocusTimer();
        }

        displayMinutes.value = String(breakMinutes).length === 1 ? '0' + breakMinutes : breakMinutes;
        displaySeconds.value = String(breakSeconds).length === 1 ? '0' + breakSeconds : breakSeconds;
    }
    breakTimerCountId = setInterval(() => {
        if (IS_BREAK && !IS_PAUSED) {
            return breakTimerCount();
        }
    }, 1000);

    let focusTimerCount = () => {
        if (focusSeconds === 0) {
            focusMinutes--;
            focusSeconds = 59;
        } else {
            focusSeconds--;
        }

        // if time is ended then run break timer
        if (focusMinutes === 0 && focusSeconds === 0) {
            IS_BREAK = true;
            IS_FOCUS = false;
            updateBreakTimer();
        }

        displayMinutes.value = String(focusMinutes).length === 1 ? '0' + focusMinutes : focusMinutes;
        displaySeconds.value = String(focusSeconds).length === 1 ? '0' + focusSeconds : focusSeconds;
    }
    focusTimerCountId = setInterval(() => {
        if (IS_FOCUS && !IS_PAUSED) {
            return focusTimerCount();
        }
    }, 1000);
}

const getTime = (timer) => {
    const timerDiv = document.querySelector(`.${timer}`);
    let timerDisplay = timerDiv.querySelectorAll('input');
    let minutes = parseInt(timerDisplay[0].value);
    let seconds = parseInt(timerDisplay[1].value);
    let totalSeconds = minutes * 60 + seconds;
    return totalSeconds;
};

// action handler function
const handleAction = (btn) => {
    // get action by getting value from data attribute
    const action = btn.getAttribute('data-action');
    // get the modal window
    let modalSettings = document.querySelector('.modal__settings');
    // get the timer modal
    let modalTimer = document.querySelector('.modal__control');

    switch (action) {
        case 'save':
            // hide modal settings
            modalSettings.style.display = 'none';
            // show timer modal
            modalTimer.style.display = 'flex';
            let focusSeconds = getTime('focus-time');
            let breakSeconds = getTime('break-time');
            Timer(focusSeconds, breakSeconds);
            break;
        case 'stop':
            // hide modal settings
            modalSettings.style.display = 'block';
            // show timer modal
            modalTimer.style.display = 'none';
            clearInterval(focusTimerCountId);
            clearInterval(breakTimerCountId);
            IS_PAUSED = false;
            btn.setAttribute('data-action', 'pause');
            btn.innerHTML = 'Pause';
            break;
        case 'pause':
            // change pause btn to resume
            btn.setAttribute('data-action', 'resume');
            btn.innerHTML = 'Resume';
            IS_PAUSED = true;
            break;
        case 'resume':
            btn.setAttribute('data-action', 'pause');
            btn.innerHTML = 'Pause';
            IS_PAUSED = false;
            break;
    }
};

// add listeners to buttons: [cancel, save, stop, pause]
actionsBtns.forEach((actionBtn) => {
    actionBtn.addEventListener('click', () => handleAction(actionBtn));
});

// filter any characters except numbers
timerInputs.forEach((input) => {
    input.addEventListener('input', () => {
        input.value = input.value
            .replace(/[^0-9.]/g, '')
            .replace(/(\.*)\./g, '$1');
        if (input.value > 59 && input.getAttribute('id') === 'seconds') {
            input.value = 59;
        }
        if (input.value > 99 && input.getAttribute('id') === 'minutes') {
            input.value = 99;
        }
    });
});

const handleTimerDisplay = (action, display) => {
    // step 5 minutes
    const minuteStep = 300;
    let minutes = display.querySelector('#minutes').value;
    let minutesValue = 0;

    switch (action) {
        case 'inc':
            if (minutes % 5 !== 0) {
                let rem = minutes % 5;
                minutesValue = (minutes * 60 + 60 * (5 - rem)) / 60;
            } else {
                minutesValue = (minutes * 60 + minuteStep) / 60;
            }

            if (minutesValue > 95) {
                minutesValue = 99;
            }

            display.querySelector('#minutes').value =
                String(minutesValue).length === 1
                    ? '0' + minutesValue
                    : minutesValue;
            display
                .querySelector('#minutes')
                .setAttribute('value', minutesValue);
            break;
        case 'dec':
            minutesValue = (minutes * 60 - minuteStep) / 60;
            if (minutesValue === 94) {
                minutesValue = 95;
            } else if (minutesValue < 5) {
                minutesValue = 5;
            }

            display.querySelector('#minutes').value =
                String(minutesValue).length === 1
                    ? '0' + minutesValue
                    : minutesValue;
            display
                .querySelector('#minutes')
                .setAttribute('value', minutesValue);
            break;
    }
};

// get + and - button which operates with timer
let timerBtns = document.querySelectorAll('.timer__btn');

// add listeners with handler in this buttons
timerBtns.forEach((timerBtn) => {
    timerBtn.addEventListener('click', () => {
        let timerDisplay = timerBtn.parentNode.querySelector('.timer__display');
        let timerAction = timerBtn.getAttribute('data-timer-action');
        handleTimerDisplay(timerAction, timerDisplay);
    });
});
