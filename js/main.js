const dealerCards = document.querySelector('.dealer-cards');
const playerCards = document.querySelector('.player-cards');

const input = document.querySelector('.input');
const deal = document.querySelector('.deal');
const playAgain = document.querySelector('.play-again');
const hit = document.querySelector('.hit');
const stand = document.querySelector('.stand');
const double = document.querySelector('.double');
const split = document.querySelector('.split');
const insurance = document.querySelector('.insurance');

const modal = document.querySelector('.modal-wrap');
const modalb = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const closeModalBtn = document.querySelector('.close-modal');

const playerWin = document.querySelector('.player-wins');
const dealerWin = document.querySelector('.dealer-wins');
const balanceDiv = document.querySelector('.balance');
const playerTotal = document.querySelector('.player-total');
const dealerTotal = document.querySelector('.dealer-total');

let cardArray = [];

let dealerCount = [];
let playerCount = [];

let cardAdded;

let playerWins = 0;
let dealerWins = 0;

let balance = 100;
let bet;
let playAgainBool = false;

function restartCards() {
    cardArray = [];
    for (let i = 0; i < 16; i++) {
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

function startDeal() {
    if (cardArray.length < 40) {
        restartCards();
    }
    if (!isNaN(parseInt(input.value))) {
        if (parseInt(input.value) <= balance) {
            bet = parseInt(input.value)
            balance -= bet;
            deal.style.display = 'none';
            input.style.display = 'none';
            dealerCount = [];
            playerCount = [];
            setTimeout(function() {addCard(1)}, 100);
            setTimeout(function() {addCard(0)}, 300);
            setTimeout(function() {addCard(1)}, 500);
            setTimeout(addHiddenCard, 700);
            setTimeout(showButtons, 1000);
        } else {
            input.value = '';
            showModal('Not enough money', "You don't have enough money!")
        }
    } else {
        input.value = '';
        showModal('Invalid input', "Only whole numbers are accepted!")
    }
}

function addCard(player) {
    let number = Math.floor(Math.random() * cardArray.length);
    let card = cardArray[number];
    cardArray.splice(number, 1);
    if (player == 0) {
        if (card[1] == 'J' || card[1] == 'Q' || card[1] == 'K') {
            dealerCount.push(10);
        } else {
            dealerCount.push(card[1]);
        }
        dealerCards.innerHTML += 
        `
        <div class="card"><div class="top-left ${card[0]}">&${card[0]};</div>
        <div class="middle ${card[0]}">${card[1]}</div>
        <div class="bottom-right ${card[0]}">&${card[0]};</div></div>
        `
        cardAdded = true;
    } else if (player == 1) {
        if (card[1] == 'J' || card[1] == 'Q' || card[1] == 'K') {
            playerCount.push(10);
        } else {
            playerCount.push(card[1]);
        }
        playerCards.innerHTML += 
        `
        <div class="card"><div class="top-left ${card[0]}">&${card[0]};</div>
        <div class="middle ${card[0]}">${card[1]}</div>
        <div class="bottom-right ${card[0]}">&${card[0]};</div></div>
        `
        if (totalCount(playerCount) > 21) {
            setTimeout(checkWin, 1);
        }
    }
    playerTotal.innerHTML = totalCount(playerCount);
    dealerTotal.innerHTML = totalCount(dealerCount);
}

function addHiddenCard() {
    dealerCards.innerHTML +=
    `
    <div class="card hidden-card"></div>
    `
}

function removeHiddenCard() {
    document.querySelector('.hidden-card').style.display = 'none';
}

function showButtons() {
    hit.style.display = 'block';
    stand.style.display = 'block';
}

function playAgainButtons() {
    hit.style.display = 'none';
    stand.style.display = 'none';
    split.style.display = 'none';
    insurance.style.display = 'none';
    double.style.display = 'none';
    playAgain.style.display = 'block';
    playAgainBool = false;
}

function resetButtons() {
    playAgain.style.display = 'none';
    deal.style.display = 'block';
    input.style.display = 'block';
    dealerCards.innerHTML = '';
    playerCards.innerHTML = '';
    playerTotal.innerHTML = '0';
    dealerTotal.innerHTML = '0';
}

function totalCount(arr) {
    let amount = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 'A') {
            amount += 11;
        } else {
            amount += arr[i];
        }
    }
    for (let i = 0; i < arr.filter(x => x === 'A').length; i++) {
        if (arr.includes('A') && amount > 21) {
            amount -= 10;
        }
    }
    return amount;
}

function hitCard() {
    addCard(1);
}

function standCard() {
    removeHiddenCard();
    addCard(0);
    let i = 1;
    while (totalCount(dealerCount) < 17) {
        addCard(0);
    }
    setTimeout(checkWin, 1);
}

function checkWin() {
    if (totalCount(playerCount) > 21) {
        showModal('You lose!', `Your card total: ${totalCount(playerCount)}<br>Dealer card total: ${totalCount(dealerCount)}`)
        dealerWins++;
    } else if (totalCount(dealerCount) > 21) {
        showModal('You win!', `Your card total: ${totalCount(playerCount)}<br>Dealer card total: ${totalCount(dealerCount)}<br><br>You won $${bet * 2}!`)
        playerWins++;
        balance += bet * 2;
    } else if (totalCount(dealerCount) == totalCount(playerCount)) {
        balance += bet;
        showModal('Push.', `Your card total: ${totalCount(playerCount)}<br>Dealer card total: ${totalCount(dealerCount)}<br><br>You got $${bet} back.`)
    } else if (totalCount(dealerCount) > totalCount(playerCount)) {
        showModal('You lose!', `Your card total: ${totalCount(playerCount)}<br>Dealer card total: ${totalCount(dealerCount)}`)
        dealerWins++;
    } else if (totalCount(dealerCount) < totalCount(playerCount)) {
        showModal('You win!', `Your card total: ${totalCount(playerCount)}<br>Dealer card total: ${totalCount(dealerCount)}<br><br>You won $${bet * 2}!`)
        playerWins++;
        balance += bet * 2;
    }
    playerWin.innerHTML = playerWins;
    dealerWin.innerHTML = dealerWins;
    balanceDiv.innerHTML = balance;
    playAgainBool = true;
}

function showModal(title, description) {
    modal.style.display = 'block';
    modalb.style.display = 'block';
    modalDescription.innerHTML = description;
    modalTitle.innerHTML = title;
}

function hideModal() {
    modal.style.display = 'none';
    modalb.style.display = 'none';
    if (playAgainBool) {
        playAgainButtons();
    }
}

deal.addEventListener('click', startDeal);
hit.addEventListener('click', hitCard);
stand.addEventListener('click', standCard);
closeModalBtn.addEventListener('click', hideModal);
playAgain.addEventListener('click', resetButtons);

restartCards();