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
let gameScoreCounter = localStorage.getItem('gameScore');
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
	} else if (player === 'rock' && cpu === 'lizard') {
		return 'win';
	} else if (player === 'rock' && cpu === 'scissors') {
		return 'win';
	} else if (player === 'paper' && cpu === 'rock') {
		return 'win';
	} else if (player === 'paper' && cpu === 'spock') {
		return 'win';
	} else if (player === 'scissors' && cpu === 'paper') {
		return 'win';
	} else if (player === 'scissors' && cpu === 'lizard') {
		return 'win';
	} else if (player === 'lizard' && cpu === 'spock') {
		return 'win';
	} else if (player === 'lizard' && cpu === 'paper') {
		return 'win';
	} else if (player === 'spock' && cpu === 'rock') {
		return 'win';
	} else if (player === 'spock' && cpu === 'scissors') {
		return 'win';
	} else if (cpu === 'rock' && player === 'lizard') {
		return 'lose';
	} else if (cpu === 'rock' && player === 'scissors') {
		return 'lose';
	} else if (cpu === 'paper' && player === 'rock') {
		return 'lose';
	} else if (cpu === 'paper' && player === 'spock') {
		return 'lose';
	} else if (cpu === 'scissors' && player === 'paper') {
		return 'lose';
	} else if (cpu === 'scissors' && player === 'lizard') {
		return 'lose';
	} else if (cpu === 'lizard' && player === 'spock') {
		return 'lose';
	} else if (cpu === 'lizard' && player === 'paper') {
		return 'lose';
	} else if (cpu === 'spock' && player === 'rock') {
		return 'lose';
	} else if (cpu === 'spock' && player === 'scissors') {
		return 'lose';
	}
}


selections.forEach((selection) => {
	selection.addEventListener('click', () => {
		gameScreenOnResults = true;
		playerSelection = selection.attributes.id.value;
		if (bonusGameOn) {
			gameSelectionBonusScreen.classList.add('hidden')
		} else {
			gameSelectionScreen.classList.add('hidden');
		}
		gameResultsScreen.classList.remove('hidden');

		gameResultsYourSelection.classList.add(playerSelection);

		setTimeout(() => {
			let cpuRandomNumber;
			if (bonusGameOn) {
				cpuRandomNumber = randomNumberGenerator() % 5;
			} else {
				cpuRandomNumber = randomNumberGenerator() % 3
			}

			if (cpuRandomNumber === 0) {
				gameResultsCPUSelection.classList.add('rock');
				cpuSelection = 'rock'
			} else if (cpuRandomNumber === 1) {
				gameResultsCPUSelection.classList.add('paper');
				cpuSelection = 'paper'
			} else if (cpuRandomNumber === 2) {
				gameResultsCPUSelection.classList.add('scissors');
				cpuSelection = 'scissors'
			} else if (cpuRandomNumber === 3) {
				gameResultsCPUSelection.classList.add('lizard');
				cpuSelection = 'lizard'
			} else if (cpuRandomNumber === 4) {
				gameResultsCPUSelection.classList.add('spock');
				cpuSelection = 'spock'
			}

			setTimeout(() => {
				let playerGameResults = choicesComparation(playerSelection, cpuSelection);
				if (playerGameResults === 'draw') {
					gameResultsFinalTitle.innerText = 'Draw';
					gameResultsFinalScreen.classList.remove('hidden');
				} else if (playerGameResults === 'win') {
					gameResultsFinalTitle.innerText = 'You win';
					gameResultsYourSelection.classList.add('winner');
					gameScoreCounter = gameScoreCounter + 1;
					gameScore.innerText = gameScoreCounter;
					gameResultsFinalScreen.classList.remove('hidden');
				} else if (playerGameResults === 'lose') {
					gameResultsFinalTitle.innerText = 'You lose';
					gameResultsCPUSelection.classList.add('winner');
					gameScoreCounter = gameScoreCounter - 1;
					if (gameScoreCounter < 0) {
						gameScoreCounter = 0;
					}
					gameScore.innerText = gameScoreCounter;
					gameResultsFinalScreen.classList.remove('hidden');
				}
				localStorage.setItem('gameScore', gameScoreCounter);
			}, 2000)


		}, 2000);


	})
})

playAgain.addEventListener('click', () => {
	gameResultsScreen.classList.add('hidden');
	gameResultsFinalScreen.classList.add('hidden');
	if (bonusGameOn) {
		gameSelectionBonusScreen.classList.remove('hidden');
	} else {
		gameSelectionScreen.classList.remove('hidden');
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
})

bonusGame.addEventListener('click', () => {
	if (gameScreenOnResults) {
		if (bonusGameOn) {
			bonusGameOn = false;
			rulesImage.src = "./assets/images/image-rules.svg"
			gameLogo.src = "./assets/images/logo.svg"
		} else {
			bonusGameOn = true;
			rulesImage.src = "./assets/images/image-rules-bonus.svg"
			gameLogo.src = "./assets/images/logo-bonus.svg"
		}
	} else if (bonusGameOn) {
		bonusGameOn = false;
		console.log(bonusGameOn);
		gameSelectionBonusScreen.classList.add('hidden');
		gameSelectionScreen.classList.remove('hidden');
		rulesImage.src = "./assets/images/image-rules.svg"
		gameLogo.src = "./assets/images/logo.svg"
	} else {
		bonusGameOn = true;
		gameSelectionScreen.classList.add('hidden');
		gameSelectionBonusScreen.classList.remove('hidden');
		rulesImage.src = "./assets/images/image-rules-bonus.svg"
		gameLogo.src = "./assets/images/logo-bonus.svg"
	}

})

rulesButtonOpen.addEventListener('click', () => {
	rulesSpace.style.display = 'block';
})

rulesButtonClose.addEventListener('click', () => {
	rulesSpace.style.display = 'none';
})

