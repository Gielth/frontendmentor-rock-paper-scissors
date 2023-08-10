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
const gameSelectionBonusScreen = document.querySelector('.game-selection-bonus');

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
		if (bonusGameOn) {
			gameSelectionBonusScreen.setAttribute('closing', '');
			setTimeout(() => {
				gameSelectionBonusScreen.classList.add('hidden');
				gameSelectionBonusScreen.removeAttribute('closing');
			}, 500);
		} else {
			gameSelectionScreen.setAttribute('closing', '');
			setTimeout(() => {
				gameSelectionScreen.classList.add('hidden');
				gameSelectionScreen.removeAttribute('closing');
			}, 500);
		}

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
		if (bonusGameOn) {
			gameSelectionBonusScreen.setAttribute('opening', '');
			gameSelectionBonusScreen.classList.remove('hidden');
			setTimeout(() => {
				gameSelectionBonusScreen.removeAttribute('opening');
			}, 500)
		} else {
			gameSelectionScreen.setAttribute('opening', '');
			gameSelectionScreen.classList.remove('hidden');
			setTimeout(() => {
				gameSelectionScreen.removeAttribute('opening');
			}, 500)
		}
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
	if (gameScreenOnResults) {
		if (bonusGameOn) {
			bonusGameOn = false;
			rulesImage.src = "./assets/images/image-rules.svg"
			gameLogo.src = "./assets/images/logo.svg"
			bonusGame.innerText = 'Bonus Games'
		} else {
			bonusGameOn = true;
			rulesImage.src = "./assets/images/image-rules-bonus.svg"
			gameLogo.src = "./assets/images/logo-bonus.svg"
			bonusGame.innerText = 'Normal Game';
		}
	} else if (bonusGameOn) {
		bonusGameOn = false;
		gameSelectionBonusScreen.setAttribute('closing', '');
		setTimeout(() => {
			gameSelectionBonusScreen.classList.add('hidden');
			gameSelectionBonusScreen.removeAttribute('closing');
			gameSelectionScreen.classList.remove('hidden');
			gameSelectionScreen.setAttribute('opening', '');
			setTimeout(() => {
				gameSelectionScreen.removeAttribute('opening');
			}, 500)
			rulesImage.src = "./assets/images/image-rules.svg"
			gameLogo.src = "./assets/images/logo.svg"
			bonusGame.innerText = 'Bonus Games'
		}, 500);
	} else {
		bonusGameOn = true;
		gameSelectionScreen.setAttribute('closing', '');
		setTimeout(() => {
			gameSelectionScreen.classList.add('hidden');
			gameSelectionScreen.removeAttribute('closing');
			gameSelectionBonusScreen.classList.remove('hidden');
			gameSelectionBonusScreen.setAttribute('opening', '');
			setTimeout(() => {
				gameSelectionBonusScreen.removeAttribute('opening');
			}, 500)
			rulesImage.src = "./assets/images/image-rules-bonus.svg"
			gameLogo.src = "./assets/images/logo-bonus.svg"
			bonusGame.innerText = 'Normal Game';
		}, 500);
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




