const button = document.getElementById("button");
const IncrementalValue = document.getElementById("IncrementalValue");
const MoneyDisplay = document.getElementById("MoneyDisplay");
const AdditionUpgrade = document.getElementById("AdditionUpgrade");
const AdditionCostDisplay = document.getElementById("AdditionCost");
const MultiplierCostDisplay = document.getElementById("MultiplierCost");
const MultiplicationUpgrade = document.getElementById("MultiplicationUpgrade");
const AutomationUpgrade = document.getElementById("AutomationUpgrade");
const AutomationCostDisplay = document.getElementById("AutomationCost");
const AdditionLvl = document.getElementById("AdditionLvl");
const MultiplierLvl = document.getElementById("MultiplierLvl");
const AutomationLvl = document.getElementById("AutomationLvl");


const bar = document.querySelector('.Bar');


var Money = 0;
var MoneyMultiplier = 1;
var AdditionCost = 10;
var MultiplierCost = 1000;
var AdditionIncreaser = 1
var AutoMoneyTimer = 1000;
var AutoMoneyCost = 100;
var AutoIncome = 0;

button.addEventListener("click", () => {
    Money += MoneyMultiplier;
    UpdateUpgrades();
});

KeyboardEvents = document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        Money += MoneyMultiplier;
        UpdateUpgrades();
    }
});

function UpdateUpgrades() {
    MoneyDisplay.innerText = formatNumber(Money);
    IncrementalValue.innerText = `+${formatNumber(MoneyMultiplier)}`;
    MultiplierCostDisplay.innerText = `cost: ${formatNumber(MultiplierCost)}`;
    AdditionCostDisplay.innerText = `cost: ${formatNumber(AdditionCost)}`;
    AdditionUpgrade.textContent = `upgrade: +${formatNumber(AdditionIncreaser)}/click`;
    AutomationCostDisplay.innerText = `cost: ${formatNumber(AutoMoneyCost)}`;
    AutomationUpgrade.textContent = `upgrade: +${formatNumber(AutoIncome)} /1s`;
}

const formatNumber = num => {
    const lookup = [
        { value: 1e18, symbol: "Qn" }, // Quintillion
        { value: 1e15, symbol: "Qd" }, // Quadrillion
        { value: 1e12, symbol: "T" }, // Trillion
        { value: 1e9, symbol: "B" }, // Billion (Milliard)
        { value: 1e6, symbol: "M" }, // Million
        { value: 1e3, symbol: "K" },  // Thousand
        { value: 1, symbol: "" }  // No suffix for numbers less than 1000
    ];

    const item = lookup.find(item => Math.abs(num) >= item.value);
    return item
        ? (num / item.value).toFixed(1).replace(/\.0$/, '') + ' ' + item.symbol : num.toString();
};

AdditionUpgrade.addEventListener("click", () => {
    if (Money >= AdditionCost) {
        Money -= AdditionCost;
        MoneyMultiplier += AdditionIncreaser;
        AdditionCost *= 1.5;
        UpdateUpgrades()
    }
});

MultiplicationUpgrade.addEventListener("click", () => {
    if (Money >= MultiplierCost) {
        Money -= MultiplierCost;
        MoneyMultiplier *= 2;
        MultiplierCost *= 10;
        AdditionIncreaser *= 10;
        UpdateUpgrades()
    } else { Money = 10 * 10000; UpdateUpgrades() }
});

AutomationUpgrade.addEventListener("click", () => {
    if (Money >= AutoMoneyCost) {
        Money -= AutoMoneyCost;
        AutoIncome += AdditionIncreaser;
        AutoMoneyCost *= 1.2;
        UpdateUpgrades();
    }
});

AutoMoney = setInterval(() => {
    if (AutoIncome > 0) {
        Money += AutoIncome;
        UpdateUpgrades();
        console.log("AutoMoney: " + formatNumber(AutoIncome));
        bar.classList.add('animate-run');
    }
}, AutoMoneyTimer);

