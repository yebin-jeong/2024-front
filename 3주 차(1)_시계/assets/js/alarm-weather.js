let alarms = [];

function addAlarm() {
    if (alarms.length >= 3) {
        alert('알람은 최대 3개까지 맞출 수 있습니다.');
        return;
    }

    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    const now = new Date();

    const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
    alarms.push(alarmTime);

    updateAlarmList();
}

function updateAlarmList() {
    const alarmList = document.getElementById('alarm-list');
    alarmList.innerHTML = '';

    alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement('div');
        alarmItem.innerText = `${alarm.getHours().toString().padStart(2, '0')}:${alarm.getMinutes().toString().padStart(2, '0')}:${alarm.getSeconds().toString().padStart(2, '0')}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => {
            alarms.splice(index, 1);
            updateAlarmList();
        };
        
        alarmItem.appendChild(deleteButton);
        alarmList.appendChild(alarmItem);
    });
}

async function fetchWeather() {
    const apiKey = '8aab58cdaeaf3f4885abc58cdad880c6';
    const location = 'Seoul'; 
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        const weatherInfo = `${data.name}: ${data.weather[0].description}, ${Math.round(data.main.temp)}°C`;
        document.getElementById('weather').innerText = weatherInfo;
    } catch (error) {
        document.getElementById('weather').innerText = 'Weather data unavailable';
    }
}