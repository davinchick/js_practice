const endOfWater = '1 Jan 2040';

const year = document.getElementById('year');
const daysEl = document.getElementById('day');
const hoursEl = document.getElementById('hour');
const minutesEl = document.getElementById('minute');
const secondsEl = document.getElementById('second');


function countdown () {
    const date = new Date(endOfWater);
    const current = new Date();

    const rest = (date - current) / 1000;

    const years = Math.floor(rest / 3600 / 24 / 365);

    const days = Math.floor(rest / 3600 / 24) % 365;

    const hours = Math.floor(rest / 3600) % 24;

    const minutes = Math.floor(rest / 60) % 60;

    const seconds = Math.floor(rest % 60);

    year.innerText = years;
    daysEl.innerText = days;
    hoursEl.innerText = hours;
    minutesEl.innerText = minutes;
    secondsEl.innerText = seconds;
}

countdown();

setInterval(countdown, 1000);