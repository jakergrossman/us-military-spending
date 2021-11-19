// DoD Budget authority sourced from the Nation Defense Budget Estimates for FY 2020
// https://comptroller.defense.gov/Portals/45/Documents/defbudget/fy2020/FY20_Green_Book.pdf
const DOD_BUDGET = 718249000000;

// 365 Days * 24 Hours * 60 Minutes * 60 Seconds * 1000 Milliseconds
const MILLIS_PER_DAY = 24 * 60 * 60 * 1000;

// DOD_BUDGET / 365 Days / MILLIS_PER_DAY
const USD_PER_MILLISECOND = DOD_BUDGET / 365 / MILLIS_PER_DAY;

// sourced from US 2020 census https://data.census.gov/cedsci/table?q=United%20States&tid=DECENNIALPL2020.P1z
const US_POP = 331449281;

// returns USD spent by the DoD today
function usdToday() {
    // current number of milliseconds since epoch
    let now = new Date;

    // number of milliseconds at the start of the day
    let dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let elapsedMillis = now - dayStart;

    return Math.round(elapsedMillis * USD_PER_MILLISECOND);
}

// returns USD spent by the DoD today
function usdYear() {
    // current number of milliseconds since epoch
    let now = new Date;

    // number of milliseconds at the start of the year
    let yearStart = new Date(now.getFullYear(), 0, 1);

    let elapsedMillis = now - yearStart;

    return Math.round(elapsedMillis * USD_PER_MILLISECOND);
}

// returns USD spent by the DoD in the last minute
function usdMinute() {
    // current number of milliseconds since epoch
    let now = new Date;

    let minuteStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

    let elapsedMillis = now - minuteStart;

    return Math.round(elapsedMillis * USD_PER_MILLISECOND);
}

function update() {
    // USD spent this year
    let year = '$' + usdYear().toLocaleString();

    // USD spent today
    let today = '$' + usdToday().toLocaleString();

    // USD spent this minute
    let minute = '$' + usdMinute().toLocaleString();

    document.querySelector('#year').textContent = year;
    document.querySelector('#today').textContent = today;

    // update number of seconds
    // seconds is 0 indexed
    let seconds = new Date().getSeconds() + 1;
    document.querySelector('#seconds').textContent = seconds + ' ' + (seconds < 2 ? 'Second' : 'Seconds');

    document.querySelector('#minute').textContent = minute;
}

setInterval(update, 16.6666666667);
