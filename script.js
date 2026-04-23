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
const TotalMoney = document.getElementById('TotalMoney');
const TotalClicks = document.getElementById('TotalClicks');
const TotalPlayTime = document.getElementById('TotalPlayTime');

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
var TotalMoneyEarned = 0;
var TotalClicksCount = 0;
var TotalTimePlayed = 0;


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
        AutomationLevel: AutomationLevel,
        TotalClicksCount: TotalClicksCount,
        TotalMoneyEarned: TotalMoneyEarned,
        TotalTimePlayed: TotalTimePlayed
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

// On crée une variable globale pour stocker notre chronomètre
let timerPressionBouton; 

button.addEventListener("click", (e) => {
    Money += MoneyMultiplier;
    TotalMoneyEarned += MoneyMultiplier;
    UpdateUpgrades();
    TotalClicksCount++;
    // 1. Gestion de l'état enfoncé (sans clignotement)
    button.classList.add('is-clicked');
    clearTimeout(timerPressionBouton);
    timerPressionBouton = setTimeout(() => {
        button.classList.remove('is-clicked');
    }, 150); 

    // 2. Coordonnées de la souris
    const rect = button.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // --- NOUVEAU : Appel de la fonction pour le clic manuel ---
    afficherGainFlottant(MoneyMultiplier, clickX, clickY);

    // 4. Génération des Particules
    const nbParticules = 15;
    const couleurs = ['#38bdf8', '#e0f2fe', '#0ea5e9', '#0369a1'];

    for (let i = 0; i < nbParticules; i++) {
        const particule = document.createElement('span');
        particule.classList.add('particule');
        
        particule.style.left = `${clickX}px`;
        particule.style.top = `${clickY}px`;
        
        const x = (Math.random() - 0.5) * 180;
        const y = (Math.random() - 0.5) * 180;
        
        particule.style.setProperty('--x', `${x}px`);
        particule.style.setProperty('--y', `${y}px`);
        
        const couleurAleatoire = couleurs[Math.floor(Math.random() * couleurs.length)];
        particule.style.backgroundColor = couleurAleatoire;
        particule.style.boxShadow = `0 0 10px ${couleurAleatoire}`;
        
        button.appendChild(particule);
        
        setTimeout(() => { particule.remove(); }, 600);
    }
});

function UpdateUpgrades() {
    TotalMoney.innerText = `Total Money: ${formatNumber(TotalMoneyEarned)}`;
    TotalClicks.innerText = `Total Clicks: ${formatNumber(TotalClicksCount)}`;
    TotalPlayTime.innerText = `Total Play Time: ${formatNumber(TotalTimePlayed)}s`;
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
        saveGame(); 
    } else {
        // L'argent est insuffisant, on fait trembler le bouton
        shakeBouton(AdditionUpgrade);
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
        saveGame(); 
    } else {
        shakeBouton(MultiplicationUpgrade);// L'argent est insuffisant, on fait trembler le bouton
    }
});

AutomationUpgrade.addEventListener("click", () => {
    if (Money >= AutoMoneyCost) {
        Money -= AutoMoneyCost;
        AutoIncome += AdditionIncreaser;
        AutoMoneyCost *= 1.8;
        AutomationLevel++;
        UpdateUpgrades();
        saveGame(); 
    } else {
        shakeBouton(AutomationUpgrade); // L'argent est insuffisant, on fait trembler le bouton
    }
});

let AutoMoney = setInterval(() => {
    if (AutoIncome > 0) {
        TotalMoneyEarned += AutoIncome;
        Money += AutoIncome;
        UpdateUpgrades();
        saveGame(); 
        
        if (bar) bar.classList.add('animate-run');

        // --- NOUVEAU : Calcul du centre du bouton et affichage du gain ---
        const centreX = button.clientWidth / 2;
        const centreY = button.clientHeight / 2;
        
        afficherGainFlottant(AutoIncome, centreX, centreY);
    }
}, AutoMoneyTimer);

window.addEventListener('load', () => {
    loadGame(); // Charge les données sauvegardées dès le lancement
});

window.addEventListener("beforeunload", () => {
    saveGame();
});

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
        TotalClicksCount = 0;
        TotalMoneyEarned = 0;
        TotalTimePlayed = 0;
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
        bar.classList.remove('animate-run')
    }
});
// --- CRÉATION DU TEXTE FLOTTANT (+X) ---
    // Fonction pour créer l'animation du texte (+X)
function afficherGainFlottant(montant, x, y) {
    const floatingText = document.createElement('div');
    floatingText.classList.add('floating-text');
    floatingText.innerText = `+${formatNumber(montant)}`;
    // Décalage aléatoire pour que les textes ne s'empilent pas exactement au même endroit
    const decalageX = (Math.random() - 0.5) * 40;
    const decalageY = (Math.random() - 0.5) * 20; 
    
    floatingText.style.left = `${x + decalageX}px`;
    floatingText.style.top = `${y + decalageY}px`;
    
    button.appendChild(floatingText);
    
    setTimeout(() => {
        floatingText.remove();
    }, 800);
}
    // Fonction pour faire trembler un élément
function shakeBouton(bouton) {
    bouton.classList.remove('shake-error');
    void bouton.offsetWidth; 
    bouton.classList.add('shake-error');
}

const statMenu = document.getElementById('statMenu');
const statDisplay = document.querySelector('.StatDisplay');
const gameContent = document.getElementById('gameContent'); // On cible le wrapper

statMenu.addEventListener('click', () => {
    const isVisible = statDisplay.style.visibility === 'visible';
    if (isVisible) {
        statDisplay.style.visibility = 'hidden';
        gameContent.classList.remove('blurred'); // On retire le flou sur le wrapper
    } else {
        statDisplay.style.visibility = 'visible';
        gameContent.classList.add('blurred');    // On ajoute le flou sur le wrapper
    }
});

let timerPlayTime = setInterval(() => {
    TotalTimePlayed++;
    UpdateUpgrades();
    saveGame(); 
}, 1000);
