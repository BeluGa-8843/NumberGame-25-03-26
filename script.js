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
var AdditionCost = 15;
var MultiplierCost = 500;
var AdditionIncreaser = 1;
var AutoMoneyTimer = 1000;
var AutoMoneyCost = 200;
var AutoIncome = 0;
var AdditionLevel = 0;
var MultiplierLevel = 0;
var AutomationLevel = 0;

// --- SYSTÈME DE SAUVEGARDE ET CHARGEMENT ---

function saveGame() {
    const gameData = {
        Money: Money,
        MoneyMultiplier: MoneyMultiplier,
        AdditionCost: AdditionCost,
        MultiplierCost: MultiplierCost,
        AdditionIncreaser: AdditionIncreaser,
        AutoMoneyCost: AutoMoneyCost,
        AutoIncome: AutoIncome,
        AdditionLevel: AdditionLevel,
        MultiplierLevel: MultiplierLevel,
        AutomationLevel: AutomationLevel
    };
    // On convertit l'objet en chaîne de caractères JSON pour le localStorage
    localStorage.setItem('clickerSaveData', JSON.stringify(gameData));
}

function loadGame() {
    const savedData = JSON.parse(localStorage.getItem('clickerSaveData'));

    // Si une sauvegarde existe, on met à jour les variables
    if (savedData !== null) {
        if (typeof savedData.Money !== 'undefined') Money = savedData.Money;
        if (typeof savedData.MoneyMultiplier !== 'undefined') MoneyMultiplier = savedData.MoneyMultiplier;
        if (typeof savedData.AdditionCost !== 'undefined') AdditionCost = savedData.AdditionCost;
        if (typeof savedData.MultiplierCost !== 'undefined') MultiplierCost = savedData.MultiplierCost;
        if (typeof savedData.AdditionIncreaser !== 'undefined') AdditionIncreaser = savedData.AdditionIncreaser;
        if (typeof savedData.AutoMoneyCost !== 'undefined') AutoMoneyCost = savedData.AutoMoneyCost;
        if (typeof savedData.AutoIncome !== 'undefined') AutoIncome = savedData.AutoIncome;
        if (typeof savedData.AdditionLevel !== 'undefined') AdditionLevel = savedData.AdditionLevel;
        if (typeof savedData.MultiplierLevel !== 'undefined') MultiplierLevel = savedData.MultiplierLevel;
        if (typeof savedData.AutomationLevel !== 'undefined') AutomationLevel = savedData.AutomationLevel;
    }

    UpdateUpgrades();
}

// --- FIN DU SYSTÈME DE SAUVEGARDE ---

button.addEventListener("click", () => {
    Money += MoneyMultiplier;
    UpdateUpgrades();
    saveGame(); // Sauvegarde immédiate après chaque clic
});

function UpdateUpgrades() {
    MoneyDisplay.innerText = formatNumber(Money);
    IncrementalValue.innerText = `+${formatNumber(MoneyMultiplier)}`;
    MultiplierCostDisplay.innerText = `cost: ${formatNumber(MultiplierCost)}`;
    AdditionCostDisplay.innerText = `cost: ${formatNumber(AdditionCost)}`;
    AdditionUpgrade.textContent = `upgrade: +${formatNumber(AdditionIncreaser)}/click`;
    AutomationCostDisplay.innerText = `cost: ${formatNumber(AutoMoneyCost)}`;
    AutomationUpgrade.textContent = `upgrade: +${formatNumber(AutoIncome)} /1s`;
    AdditionLvl.innerText = `lvl ${AdditionLevel}`;
    MultiplierLvl.innerText = `lvl ${MultiplierLevel}`;
    AutomationLvl.innerText = `lvl ${AutomationLevel}`;

    if (Money >= AdditionCost) {
        AdditionUpgrade.classList.add('affordable');
        AdditionUpgrade.classList.remove('not-affordable');
    } else {
        AdditionUpgrade.classList.add('not-affordable');
        AdditionUpgrade.classList.remove('affordable');
    }

    if (Money >= MultiplierCost) {
        MultiplicationUpgrade.classList.add('affordable');
        MultiplicationUpgrade.classList.remove('not-affordable');
    } else {
        MultiplicationUpgrade.classList.add('not-affordable');
        MultiplicationUpgrade.classList.remove('affordable');
    }

    if (Money >= AutoMoneyCost) {
        AutomationUpgrade.classList.add('affordable');
        AutomationUpgrade.classList.remove('not-affordable');
    } else {
        AutomationUpgrade.classList.add('not-affordable');
        AutomationUpgrade.classList.remove('affordable');
    }
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
        AdditionCost *= 1.6;
        AdditionLevel++;
        UpdateUpgrades();
        saveGame(); // Sauvegarde immédiate après un achat
    }
});

MultiplicationUpgrade.addEventListener("click", () => {
    if (Money >= MultiplierCost) {
        Money -= MultiplierCost;
        MoneyMultiplier *= 2;
        MultiplierCost *= 5;
        AdditionIncreaser *= 2;
        MultiplierLevel++;
        UpdateUpgrades();
        saveGame(); // Sauvegarde immédiate après un achat
    }
});

AutomationUpgrade.addEventListener("click", () => {
    if (Money >= AutoMoneyCost) {
        Money -= AutoMoneyCost;
        AutoIncome += AdditionIncreaser;
        AutoMoneyCost *= 1.8;
        AutomationLevel++;
        UpdateUpgrades();
        saveGame(); // Sauvegarde immédiate après un achat
    }
});

let AutoMoney = setInterval(() => {
    if (AutoIncome > 0) {
        Money += AutoIncome;
        UpdateUpgrades();
        saveGame(); // Sauvegarde immédiate après l'ajout d'argent automatique
        // console.log("AutoMoney: " + formatNumber(AutoIncome));
        if (bar) bar.classList.add('animate-run');
    }
}, AutoMoneyTimer);

// Correction de 'load ' (espace en trop) en 'load'
window.addEventListener('load', () => {
    loadGame(); // Charge les données sauvegardées dès le lancement
});

// 1. Sauvegarde quand l'utilisateur rafraîchit ou ferme l'onglet (Principalement PC)
window.addEventListener("beforeunload", () => {
    saveGame();
});

// 2. Sauvegarde quand la page passe en arrière-plan (Sécurité pour Mobile/Tablette)
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'hidden') {
        saveGame();
    }
});

const ResetGame = document.getElementById('ResetGame');

ResetGame.addEventListener('click', () => {
    sur = confirm("Êtes-vous sûr de vouloir réinitialiser le jeu ? Cette action est irréversible.");
    if (sur) {
        localStorage.removeItem('clickerSaveData');
        Money = 0;
        MoneyMultiplier = 1;
        AdditionCost = 15;
        MultiplierCost = 500;
        AdditionIncreaser = 1;
        AutoMoneyCost = 200;
        AutoIncome = 0;
        AdditionLevel = 0;
        MultiplierLevel = 0;
        AutomationLevel = 0;
        UpdateUpgrades();
        saveGame();
    }
});