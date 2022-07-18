// 2022 Jake Grossman
// This is free and unencumbered software released into the public domain.
// See LICENSE.txt for more information.
var BUDGET_TABLE = []

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
    fetch("budgets.txt")
        .then(response => {
            if (response.status === 200) {
                response
                    .text()
                    .then(txt => {
                        for (line of txt.split('\n')) {
                            if (line.length === 0 || line[0] === ';') continue;


                            let info = line.split(',').map(x => x.trim());
                            BUDGET_TABLE.push({source: info[0], budget: parseInt(info[1])});
                        }

                        yearDisplay   = document.querySelector('#year');
                        todayDisplay  = document.querySelector('#today');
                        minuteDisplay = document.querySelector('#minute');
                        secondCounter = document.querySelector('#seconds');
                        sourceElement = document.querySelector('#source');
                        budgetElement = document.querySelector('#budget');

                        setBudget(0);

                        // 60x second
                        setInterval(update, 16.6666666667);
                    });
            }
        });
}

window.addEventListener('load', init);
