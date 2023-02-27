const chips = document.querySelectorAll('.chip');
const mainBet = document.querySelector('.main-bet');
const mainChip = document.querySelector('.main-chip');

const ppBet = document.querySelector('.pp-bet');
const ppChip = document.querySelector('.pp-chip');
const threeBet = document.querySelector('.three-bet');
const threeChip = document.querySelector('.three-chip');

const clearBtn = document.querySelector('.chip-cancel');

function selectChip(data) {
    chips.forEach(element => element.classList.remove('chip-selected'));
    data.srcElement.classList.add('chip-selected');
}

function addMainBet() {
    let selectedAmount = parseInt(document.querySelector('.chip-selected').innerHTML);
    if (mainChip.innerHTML.length == 0) {
        betAmount = 0;
    } else {
        betAmount = parseInt(mainChip.innerHTML);
    }
    betAmount += selectedAmount;
    mainChip.innerHTML = betAmount;
    updateMainBet();
}

function updateMainBet() {
    mainChip.classList.remove('chip-1' , 'chip-5', 'chip-10', 'chip-25', 'chip-50', 'chip-100', 'chip-250', 'chip-500', 'chip-1000');
    if (mainChip.innerHTML == '') {
        return;
    } else {
        let betAmount = parseInt(mainChip.innerHTML);
        if (betAmount < 5) {
            mainChip.classList.add('chip-1');
        } else if (betAmount < 10) {
            mainChip.classList.add('chip-5');
        } else if (betAmount < 25) {
            mainChip.classList.add('chip-10');
        } else if (betAmount < 50) {
            mainChip.classList.add('chip-25');
        } else if (betAmount < 100) {
            mainChip.classList.add('chip-50');
        } else if (betAmount < 250) {
            mainChip.classList.add('chip-100');
        } else if (betAmount < 500) {
            mainChip.classList.add('chip-250');
        } else if (betAmount < 1000) {
            mainChip.classList.add('chip-500');
        } else {
            mainChip.classList.add('chip-1000');
        }
    }
}

function clearBet() {
    mainChip.innerHTML = '';
    updateMainBet();
}

chips.forEach(element => element.addEventListener('click', selectChip));
mainBet.addEventListener('click', addMainBet);

clearBtn.addEventListener('click', clearBet);