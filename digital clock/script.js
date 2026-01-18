function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Formatting time with leading zero
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Get the current day and date
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[now.getDay()];
    const date = now.toLocaleDateString();

    // Display time, day, and date
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('Clock').textContent = timeString;
    document.getElementById('Day').textContent = day;
    document.getElementById('Date').textContent = date;
}

setInterval(updateClock, 1000);
updateClock();
