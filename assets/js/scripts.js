const gameLogo = document.getElementById('logo-image');
const playAgain = document.getElementById('play-again');
const bonusGame = document.getElementById('bonus-button');
const rulesSpace = document.querySelector('.rules-space');
const rulesImage = document.getElementById('rules-image');
const gameScore = document.querySelector('.game-score-score');
const rulesButtonOpen = document.getElementById('rules-button');
const selections = document.querySelectorAll(".selection-button");
const gameResultsScreen = document.querySelector('.game-results');
const rulesButtonClose = document.getElementById('close-rules-box');
const gameContainerScreen = document.querySelector('.game-container');
const gameSelectionScreen = document.querySelector('.game-selection');
const gameResultsCPUSelection = document.getElementById('cpu-selection');
const gameResultsYourSelection = document.getElementById('your-selection');
const gameResultsFinalTitle = document.querySelector('.game-results-title');
const gameResultsFinalScreen = document.querySelector('.game-results-final');
/* const gameSelectionBonusScreen = document.querySelector('.game-selection-bonus'); */
const selectionButtonsDiv = document.querySelectorAll('.selection');

let cpuSelection = '';
let bonusGameOn = false;
let playerSelection = '';
let gameScoreCounter = Number(localStorage.getItem('gameScore'));
let gameScreenOnResults = false;

if (gameScoreCounter === null || gameScoreCounter === undefined) {
	gameScore.innerText = 0
	gameScoreCounter = 0;
} else {
	gameScore.innerText = gameScoreCounter;
}

function randomNumberGenerator() {
	return Math.floor(Math.random() * 198345)
}

function choicesComparation(player, cpu) {
	if (player === cpu) {
		return 'draw';
	} else if (player === 'rock' && cpu === 'lizard' || player === 'rock' && cpu === 'scissors' || player === 'paper' && cpu === 'rock' || player === 'paper' && cpu === 'spock' || player === 'scissors' && cpu === 'paper' || player === 'scissors' && cpu === 'lizard' || player === 'lizard' && cpu === 'spock' || player === 'lizard' && cpu === 'paper' || player === 'spock' && cpu === 'rock' || player === 'spock' && cpu === 'scissors') {
		return 'win';
	} else {
		return 'lose';
	}
}

function cpuChoiceCheck(cpuRandomNumber) {
	if (cpuRandomNumber === 0) {
		gameResultsCPUSelection.classList.add('rock');
		cpuSelection = 'rock';
	} else if (cpuRandomNumber === 1) {
		gameResultsCPUSelection.classList.add('paper');
		cpuSelection = 'paper';
	} else if (cpuRandomNumber === 2) {
		gameResultsCPUSelection.classList.add('scissors');
		cpuSelection = 'scissors';
	} else if (cpuRandomNumber === 3) {
		gameResultsCPUSelection.classList.add('lizard');
		cpuSelection = 'lizard';
	} else if (cpuRandomNumber === 4) {
		gameResultsCPUSelection.classList.add('spock');
		cpuSelection = 'spock';
	}
}

function defineGameResults(playerGameResults) {
	if (playerGameResults === 'draw') {
		gameResultsFinalTitle.innerText = 'Draw';
		gameResultsFinalScreen.classList.remove('hidden');
		gameResultsFinalScreen.setAttribute('opening', '');
		setTimeout(() => {
			gameResultsFinalScreen.removeAttribute('opening');
		}, 500);
	} else if (playerGameResults === 'win') {
		gameResultsFinalTitle.innerText = 'You win';
		gameResultsYourSelection.classList.add('winner');
		gameScoreCounter = gameScoreCounter + 1;
		gameScore.innerText = gameScoreCounter;
		gameResultsFinalScreen.classList.remove('hidden');
		gameResultsFinalScreen.setAttribute('opening', '');
		setTimeout(() => {
			gameResultsFinalScreen.removeAttribute('opening');
		}, 500);
	} else if (playerGameResults === 'lose') {
		gameResultsFinalTitle.innerText = 'You lose';
		gameResultsCPUSelection.classList.add('winner');
		gameScoreCounter = gameScoreCounter - 1;
		if (gameScoreCounter < 0) {
			gameScoreCounter = 0;
		}
		gameScore.innerText = gameScoreCounter;
		gameResultsFinalScreen.classList.remove('hidden');
		gameResultsFinalScreen.setAttribute('opening', '');
		setTimeout(() => {
			gameResultsFinalScreen.removeAttribute('opening');
		}, 500);
	}
}


selections.forEach((selection) => {
	selection.addEventListener('click', () => {
		gameScreenOnResults = true;
		playerSelection = selection.attributes.id.value;
		gameSelectionScreen.setAttribute('closing', '');
		setTimeout(() => {
			gameSelectionScreen.classList.add('hidden');
			gameSelectionScreen.removeAttribute('closing');
		}, 500);

		setTimeout(() => {


			gameResultsScreen.classList.remove('hidden');
			gameResultsScreen.setAttribute('opening', '');

			setTimeout(() => {
				gameResultsScreen.removeAttribute('opening');
			}, 500)

			gameResultsYourSelection.classList.add(playerSelection);

			setTimeout(() => {
				let cpuRandomNumber;
				if (bonusGameOn) {
					cpuRandomNumber = randomNumberGenerator() % 5;
				} else {
					cpuRandomNumber = randomNumberGenerator() % 3
				}

				cpuChoiceCheck(cpuRandomNumber);

				setTimeout(() => {
					let playerGameResults = choicesComparation(playerSelection, cpuSelection);
					defineGameResults(playerGameResults);
					localStorage.setItem('gameScore', gameScoreCounter);
				}, 2000)


			}, 2000);
		}, 500);

	})
})

playAgain.addEventListener('click', () => {
	gameResultsScreen.setAttribute('closing', '');
	setTimeout(() => {
		gameResultsScreen.classList.add('hidden');
		gameResultsScreen.removeAttribute('closing');
		gameResultsFinalScreen.classList.add('hidden');
		gameSelectionScreen.setAttribute('opening', '');
		gameSelectionScreen.classList.remove('hidden');
		setTimeout(() => {
			gameSelectionScreen.removeAttribute('opening');
		}, 500)
		gameResultsFinalTitle.innerText = '';
		gameResultsYourSelection.classList.remove(playerSelection);
		gameResultsCPUSelection.classList.remove(cpuSelection);

		if (gameResultsYourSelection.classList.contains('winner')) {
			gameResultsYourSelection.classList.remove('winner')
		}

		if (gameResultsCPUSelection.classList.contains('winner')) {
			gameResultsCPUSelection.classList.remove('winner')
		}

		playerSelection = '';
		cpuSelection = '';
		gameScreenOnResults = false;
	}, 500);
})

bonusGame.addEventListener('click', () => {
	if (bonusGameOn) {
		bonusGameOn = false;
		gameSelectionScreen.classList.add('game-selection');
		selectionButtonsDiv.forEach((element) => {
			if (element.classList.contains('lizard') || element.classList.contains('spock')) {
				element.classList.add('hidden')
			} else if (element.classList.contains('bonus')) {
				element.classList.remove('bonus')
			}
		})
		selections.forEach((element) => {
			if (element.attributes.id.value === 'paper' || element.attributes.id.value === 'scissors' || element.attributes.id.value === 'rock') {
				element.classList.remove('bonus');
			}
		})
		gameSelectionScreen.classList.remove('game-selection-bonus');
		rulesImage.src = "./assets/images/image-rules.svg"
		gameLogo.src = "./assets/images/logo.svg"
		bonusGame.innerText = 'Bonus Game';
	} else {
		bonusGameOn = true;
		gameSelectionScreen.classList.add('game-selection-bonus');
		selectionButtonsDiv.forEach((element) => {
			if (element.classList.contains('paper') || element.classList.contains('scissors') || element.classList.contains('rock')) {
				element.classList.add('bonus')
			} else if (element.classList.contains('hidden')) {
				element.classList.remove('hidden')
			}
		})
		selections.forEach((element) => {
			if (element.attributes.id.value === 'paper' || element.attributes.id.value === 'scissors' || element.attributes.id.value === 'rock') {
				element.classList.add('bonus');
			}
		})
		gameSelectionScreen.classList.remove('game-selection');
		rulesImage.src = "./assets/images/image-rules-bonus.svg"
		gameLogo.src = "./assets/images/logo-bonus.svg"
		bonusGame.innerText = 'Normal Game';
	}

})

rulesButtonOpen.addEventListener('click', () => {
	rulesSpace.setAttribute('opening', '');
	rulesSpace.style.display = 'block';
	setTimeout(() => {
		rulesSpace.removeAttribute('opening');
	}, 250)
})

rulesButtonClose.addEventListener('click', () => {
	rulesSpace.setAttribute('closing', '');
	setTimeout(() => {
		rulesSpace.style.display = 'none';
		rulesSpace.removeAttribute('closing');
	}, 250);
})


window.addEventListener('click', (event) => {
	if (event.target.nodeName === 'BODY' || event.target.nodeName === 'SECTION' || event.target.nodeName === 'MAIN') {
		rulesSpace.setAttribute('closing', '');
		setTimeout(() => {
			rulesSpace.style.display = 'none';
			rulesSpace.removeAttribute('closing');
		}, 250);
	}
})




