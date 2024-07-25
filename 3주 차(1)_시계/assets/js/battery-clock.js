let batteryLevel = 100;
let clockInterval;

function updateBattery() {
    batteryLevel = Math.max(0, batteryLevel - 1);
    document.getElementById('battery').innerText = `Battery: ${batteryLevel}%`;

    if (batteryLevel === 0) {
        document.getElementById('clock').style.backgroundColor = 'black';
        document.getElementById('clock').style.color = 'black';
    }
}


function updateClock() {
    const now = new Date();
    
    const kstOffset = 9 * 60 * 60 * 1000; 
    const kstDate = new Date(now.getTime() + kstOffset);
    const formattedDate = kstDate.toISOString().slice(0, 19).replace('T', ' ');
    document.getElementById('clock').innerText = formattedDate;
}
