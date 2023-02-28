const chipDiv = document.querySelector('.chips');
const chips = document.querySelectorAll('.chip');

const betDiv = document.querySelector('.bets');
const mainBet = document.querySelector('.main-bet');
const mainChip = document.querySelector('.main-chip');

const ppBet = document.querySelector('.pp-bet');
const ppChip = document.querySelector('.pp-chip');
const threeBet = document.querySelector('.three-bet');
const threeChip = document.querySelector('.three-chip');

const clearBtn = document.querySelector('.chip-cancel');

const buttonDivs = document.querySelectorAll('.action-buttons > *');
const buttons = document.querySelectorAll('.action-buttons > * > div');

const betChips = [mainChip, ppChip, threeChip];

// bet-time, ini-deal, ins, bj-check, 
let gameState = 'bet-time';

function selectChip(data) {
    chips.forEach(element => element.classList.remove('chip-selected'));
    if (data.srcElement.innerText != 'Clear') {
        data.srcElement.classList.add('chip-selected');
    }
}

function addMainBet() {
    if (gameState == 'bet-time') {
        let selectedAmount = parseInt(document.querySelector('.chip-selected').innerHTML);
    if (mainChip.innerHTML.length == 0) {
        betAmount = 0;
    } else {
        betAmount = parseInt(mainChip.innerHTML);
    }
    betAmount += selectedAmount;
    mainChip.innerHTML = betAmount;
    updateBets();
    }
}

function addPpBet() {
    if (gameState == 'bet-time') {
        let selectedAmount = parseInt(document.querySelector('.chip-selected').innerHTML);
        if (ppChip.innerHTML.length == 0) {
            betAmount = 0;
        } else {
            betAmount = parseInt(ppChip.innerHTML);
        }
        betAmount += selectedAmount;
        ppChip.innerHTML = betAmount;
        updateBets();
    }
}

function addThreeBet() {
    if (gameState == 'bet-time') {
        let selectedAmount = parseInt(document.querySelector('.chip-selected').innerHTML);
        if (threeChip.innerHTML.length == 0) {
            betAmount = 0;
        } else {
            betAmount = parseInt(threeChip.innerHTML);
        }
        betAmount += selectedAmount;
        threeChip.innerHTML = betAmount;
        updateBets();
    }
}

function updateBets() {
    for (let i = 0; i < betChips.length; i++) {
        
        let chip = betChips[i]
        chip.classList.remove('chip-1' , 'chip-5', 'chip-10', 'chip-25', 'chip-50', 'chip-100', 'chip-250', 'chip-500', 'chip-1000');
        if (chip.innerHTML == '') {
            //
        } else {
            let betAmount = parseInt(chip.innerHTML);
            if (betAmount < 5) {
                chip.classList.add('chip-1');
            } else if (betAmount < 10) {
                chip.classList.add('chip-5');
            } else if (betAmount < 25) {
                chip.classList.add('chip-10');
            } else if (betAmount < 50) {
                chip.classList.add('chip-25');
            } else if (betAmount < 100) {
                chip.classList.add('chip-50');
            } else if (betAmount < 250) {
                chip.classList.add('chip-100');
            } else if (betAmount < 500) {
                chip.classList.add('chip-250');
            } else if (betAmount < 1000) {
                chip.classList.add('chip-500');
            } else {
                chip.classList.add('chip-1000');
            }
        }
    }
    
}

function startGame() {
    if (mainChip.innerText != '') {
        gameState = 'ini-deal'
        chipDiv.classList.add('hidden');
        buttonDivs[0].classList.add('hidden');
        betDiv.style.transform = 'scale(0.7)';
        betDiv.style.bottom = '5%';
    } else {
        mainBet.style.backgroundColor = 'red';
        setTimeout(function() {mainBet.style.backgroundColor = 'rgba(25,25,25,0.3)'}, 500);
    }
}

function clearBet() {
    mainChip.innerHTML = '';
    ppChip.innerHTML = '';
    threeChip.innerHTML = '';
    updateBets();
}

function buttonClick(data) {
    switch (data.target.innerText) {
        case 'DEAL': startGame(); break;
        case '2X': doubleBets(); break;
        case 'CLEAR': clearBet(); break;
    }
}

chips.forEach(element => element.addEventListener('click', selectChip));
buttons.forEach(element => element.addEventListener('click', buttonClick));
mainBet.addEventListener('click', addMainBet);
ppBet.addEventListener('click', addPpBet);
threeBet.addEventListener('click', addThreeBet);

clearBtn.addEventListener('click', clearBet);

for (let i = 0; i < betChips.length; i++) {
    currentChip = betChips[i];
    currentChip.innerHTML = '';
}