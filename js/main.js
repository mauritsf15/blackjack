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

const dealerDiv = document.querySelector('.dealer-hand');
const clientDiv = document.querySelector('.client-hand');

const betChips = [mainChip, ppChip, threeChip];

const dealerTotal = document.querySelector('.dealer-total');
const yourTotal = document.querySelector('.your-total');

let dealerCount = [];
let clientCount = [];
let dealerCards = [];
let clientCards = [];

let insurance = false;

// bet-time, ini-deal, ins, client-options
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

function updateScores() {
    dealerTotal.innerText = totalCount('dealer');
    yourTotal.innerText = totalCount('client');
}

function addCard(who) {
    let number = Math.floor(Math.random() * cardArray.length);
    let card = cardArray[number];
    cardArray.splice(number, 1);
    let color = 'black';
    if (Number.isInteger(card[1]) == false && card[1] != 'A') {
        count = 10;
    } else {
        count = card[1];
    }
    if (card[0] == 'diamondsuit' || card[0] == 'hearts') {
        color = 'red';
    }
    if (who == 'dealer') {
        dealerDiv.innerHTML +=
        `
        <div class="card ${color}">
            <span class="tl">&${card[0]};</span>
            <span class="m">${card[1]}</span>
            <span class="br">&${card[0]};</span>
        </div>
        `
        dealerCount.push(count);
        dealerCards.push(card);
    } else if (who == 'client') {
        clientDiv.innerHTML +=
        `
        <div class="card ${color}">
            <span class="tl">&${card[0]};</span>
            <span class="m">${card[1]}</span>
            <span class="br">&${card[0]};</span>
        </div>
        `
        clientCount.push(count);
        clientCards.push(card);
    }
    updateScores();
}

function totalCount(who) {
    let cc = 0;
    if (who == 'dealer') {
        ace = 0
        for (let i = 0; i < dealerCount.length; i++) {
            if (dealerCount[i] == 'A') {
                ace++;
                cc += 11;
            } else {
                cc += dealerCount[i];
            }
        }
        if (ace > 0) {
            for (let i = 0; i < ace; i++) {
                if (cc > 21) {
                    cc -= 10;
                }
            }
        }
    } else if (who == 'client') {
        ace = 0
        for (let i = 0; i < clientCount.length; i++) {
            if (clientCount[i] == 'A') {
                ace++;
                cc += 11;
            } else {
                cc += clientCount[i];
            }
        }
        if (ace > 0) {
            for (let i = 0; i < ace; i++) {
                if (cc > 21) {
                    cc -= 10;
                }
            }
        }
    }
    return cc;
}

function startGame() {
    if (mainChip.innerText != '') {
        gameState = 'ini-deal';
        chipDiv.classList.add('hidden');
        buttonDivs[0].classList.add('hidden');
        betDiv.style.transform = 'scale(0.9)';
        betDiv.style.bottom = '3%';
        setTimeout(function() {addCard('client')}, 1000);
        setTimeout(function() {addCard('dealer')}, 1500);
        setTimeout(function() {
            addCard('client');
            if (dealerCount[0] == 'A') {
                goInsurance();
            } else {
                clientOptions();
            }
        }, 2000);
        setTimeout(function() {
            if (clientCards[0] == clientCards[1]) {
                if (ppChip.innerText != '') {
                    ppChip.innerText = parseInt(ppChip.innerText) * 26
                }
            } else if (clientCards[0][1] == clientCards[1][1]) {
                if (clientCards[0][0] == 'spades' || clientCards[0][0] == 'clubs' && 
                clientCards[1][0] == 'spades' || clientCards[1][0] == 'clubs' ||
                clientCards[0][0] == 'diamondsuit' || clientCards[0][0] == 'hearts' && 
                clientCards[1][0] == 'diamondsuit' || clientCards[1][0] == 'hearts' ) {
                    if (ppChip.innerText != '') {
                        ppChip.innerText = parseInt(ppChip.innerText) * 13
                    }
                } else {
                    if (ppChip.innerText != '') {
                        ppChip.innerText = parseInt(ppChip.innerText) * 7
                    }
                }
            }
            updateBets();
        }, 2500)
    } else {
        mainBet.style.backgroundColor = 'red';
        setTimeout(function() {mainBet.style.backgroundColor = 'rgba(25,25,25,0.3)'}, 500);
    }
}

function doubleBets() {
    if (mainChip.innerText != '') {
        mainChip.innerText = parseInt(mainChip.innerText) * 2;
    }
    if (ppChip.innerText != '') {
        ppChip.innerText = parseInt(ppChip.innerText) * 2;
    }
    if (threeChip.innerText != '') {
        threeChip.innerText = parseInt(threeChip.innerText) * 2;
    }
    updateBets();
}

function goInsurance() {
    gameState = 'ins';
    buttonDivs[2].classList.remove('hidden');
}

function ins(choice) {
    if (choice == 'yes') {
        insurance = true;
    }
    clientOptions();
}

function clientOptions() {
    gameState = 'client-options';
    buttonDivs[1].classList.remove('hidden');
    buttonDivs[2].classList.add('hidden');
    if (clientCount[0] == clientCount[1]) {
        
    }
}

function clearBet() {
    mainChip.innerHTML = '';
    ppChip.innerHTML = '';
    threeChip.innerHTML = '';
    updateBets();
}

function hitCard() {
    buttonDivs[1].classList.add('hidden');
    setTimeout(function() {
        addCard('client');
        if (totalCount('client') == 21) {
            standCard();
        } else if (totalCount('client') > 21) {
            setTimeout(youLose, 500);
        } else {
            buttonDivs[1].classList.remove('hidden');
        }
        updateScores();
    }, 500);
}

function standCard() {
    buttonDivs[1].classList.remove('hidden');
    buttonDivs[1].classList.add('hidden');
    setTimeout(function() {
        addCard('dealer');
        if (totalCount('dealer') < 17) {
            setTimeout(function() {
                standCard();
            }, 500)
        } else {
            if (totalCount('dealer') > 21 || totalCount('client') > totalCount('dealer')) {
                setTimeout(youWin, 500);
            } else {
                setTimeout(youLose, 500);
            }
        }
        updateScores();
    }, 500);
}

function youWin() {
    alert('win');
}

function youLose() {
    alert('lose');
}

function doubleCard() {
    mainChip.innerText = parseInt(mainChip.innerText) * 2;
    hitCard();
    setTimeout(standCard, 500);
}

function buttonClick(data) {
    switch (data.target.innerText) {
        case 'DEAL': startGame(); break;
        case '2X': doubleBets(); break;
        case 'CLEAR': clearBet(); break;
        case 'HIT': hitCard(); break;
        case 'STAND': standCard(); break;
        case 'DOUBLE': doubleCard(); break;
        case 'SPLIT': splitCard(); break;
        case 'YES': ins('yes'); break;
        case 'NO': ins('no'); break;
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

function createDeck(decks) {
    cardArray = [];
    for (let i = 0; i < decks * 4; i++) {
        let card;
        for (let j = 1; j < 14; j++) {
            if (i % 4 == 0) {
                card = 'hearts';
            } else if (i % 4 == 1) {
                card = 'spades';
            } else if (i % 4 == 2) {
                card = 'diamondsuit';
            } else if (i % 4 == 3) {
                card = 'clubs';
            }
            if (j == 1) {
                amount = 'A';
            } else if (j == 11) {
                amount = 'J';
            } else if (j == 12) {
                amount = 'Q';
            } else if (j == 13) {
                amount = 'K';
            } else {
                amount = j;
            }
            cardArray.push([card, amount]);
        }
    }
}

createDeck(6);