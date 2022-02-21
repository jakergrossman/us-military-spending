// 2022 Jake Grossman
// This is free and unencumbered software released into the public domain.
// See LICENSE.txt for more information.

const BUDGET_TABLE = [
    // Nation Defense Budget Estimates for FY 2022
    // https://comptroller.defense.gov/Portals/45/Documents/defbudget/fy2022/FY22_Green_Book.pdf
    //
    // Accessed February 20, 2022
    {
        "source": "National Defense Budge Estimates for FY 2022",
        "budget": 715000000000
    },
    
    // Nation Defense Budget Estimates for FY 2021
    // https://comptroller.defense.gov/Portals/45/Documents/defbudget/fy2021/FY21_Green_Book.pdf
    //
    // Accessed February 20, 2022
    {
        "source": "National Defense Budge Estimates for FY 2021",
        "budget": 705392000000
    },
    
    // Nation Defense Budget Estimates for FY 2020
    // https://comptroller.defense.gov/Portals/45/Documents/defbudget/fy2020/FY20_Green_Book.pdf
    //
    // Accessed February 20, 2022
    {
        "source": "National Defense Budge Estimates for FY 2020",
        "budget": 718349000000
    },
];

// 365 Days * 24 Hours * 60 Minutes * 60 Seconds * 1000 Milliseconds
const millisPerYear = 365 * 24 * 60 * 60 * 1000;

// index of current budget in BUDGET_TABLE
var budgetPos = 0;

// number display HTML elements
var yearDisplay, todayDisplay, minuteDisplay, secondCounter;

// footer information HTML elements
var sourceElement, budgetElement;

var usdPerMillisecond = 0;
function setBudget(index) {
    index = (index % BUDGET_TABLE.length + BUDGET_TABLE.length) % BUDGET_TABLE.length;
    budgetPos = index;
    sourceElement.innerText = BUDGET_TABLE[budgetPos]["source"];
    budgetElement.innerText = "$" + BUDGET_TABLE[budgetPos]["budget"].toLocaleString();
    usdPerMillisecond = BUDGET_TABLE[budgetPos]["budget"] / millisPerYear;
}

// calculate USD spent between time a and b
function usdTime(a, b) {
    let elapsedMillis = b - a;

    return Math.round(elapsedMillis * usdPerMillisecond);
}

// update display
function update() {
    // get time references
    let now         = new Date;
    let yearStart   = new Date(now.getFullYear(), 0, 1);
    let dayStart    = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let minuteStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

    // get $ amts, using `toLocaleString' in internationalize decimal seperators
    let usdYear   = '$' + usdTime(yearStart, now).toLocaleString();
    let usdToday  = '$' + usdTime(dayStart, now).toLocaleString();
    let usdMinute = '$' + usdTime(minuteStart, now).toLocaleString();

    yearDisplay.textContent   = usdYear;
    todayDisplay.textContent  = usdToday;
    minuteDisplay.textContent = usdMinute;

    // display # of seconds since minute start (0 indexed)
    let seconds = new Date().getSeconds() + 1;
    secondCounter.textContent = seconds + ' ' + (seconds == 1 ? 'Second' : 'Seconds');

}

function init() {
    yearDisplay   = document.querySelector('#year');
    todayDisplay  = document.querySelector('#today');
    minuteDisplay = document.querySelector('#minute');
    secondCounter = document.querySelector('#seconds');
    sourceElement = document.querySelector('#source');
    budgetElement = document.querySelector('#budget');

    setBudget(0);

    // 60x second
    setInterval(update, 16.6666666667);
}

window.addEventListener('load', init);
