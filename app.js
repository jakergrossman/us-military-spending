// DoD Budget authority sourced from the Nation Defense Budget Estimates for FY 2020
// https://comptroller.defense.gov/Portals/45/Documents/defbudget/fy2020/FY20_Green_Book.pdf
const DOD_BUDGET = 718249000000;

// sourced from US 2020 census https://data.census.gov/cedsci/table?q=United%20States&tid=DECENNIALPL2020.P1z
const US_POP = 331449281;

// 24 Hours * 60 Minutes * 60 Seconds * 1000 Milliseconds
const MILLIS_PER_DAY = 24 * 60 * 60 * 1000;
const USD_PER_MILLISECOND = DOD_BUDGET / 365 / MILLIS_PER_DAY;

// calculate USD spent between time a and b
function usdTime(a, b) {
    let elapsedMillis = b - a;

    return Math.round(elapsedMillis * USD_PER_MILLISECOND);
}

// update display
function update() {
    // get time references
    let now = new Date;
    let yearStart = new Date(now.getFullYear(), 0, 1);
    let dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let minuteStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

    // get $ amts

    let usdYear = '$' + usdTime(yearStart, now).toLocaleString(); // toLocaleString uses browser locale to format $ amt

    let usdToday = '$' + usdTime(dayStart, now).toLocaleString();

    let usdMinute = '$' + usdTime(minuteStart, now).toLocaleString();

    document.querySelector('#year').textContent = usdYear;
    document.querySelector('#today').textContent = usdToday;

    // update number of seconds
    // seconds is 0 indexed
    let seconds = new Date().getSeconds() + 1;
    document.querySelector('#seconds').textContent = seconds + ' ' + (seconds < 2 ? 'Second' : 'Seconds');

    document.querySelector('#minute').textContent = usdMinute;
}

// 60x per second
setInterval(update, 16.6666666667);
