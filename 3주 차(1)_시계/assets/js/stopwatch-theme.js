let stopwatchInterval;
let stopwatchStartTime = 0; 
let elapsedTime = 0; 


document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
    setInterval(updateBattery, 1000);
    fetchWeather();
});

function startStopwatch() {
    stopwatchStartTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(() => {
        elapsedTime = Date.now() - stopwatchStartTime;
        const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
        document.getElementById('stopwatch-time').innerText = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    document.getElementById('stopwatch-time').innerText = '00:00:00';
}



function changeTheme(event) {
    document.body.className = event.target.value;
}

