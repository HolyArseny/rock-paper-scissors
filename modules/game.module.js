import { getRandomNumber } from '../lib/common.js';

const scores = {
  user: 0,
  computer: 0,
  setScore: result => result ? scores.user++ : scores.computer++,
};

const gameSettings = {
  gamesLimit: 10,
  options: {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  },
  availableResults: {
    'true': { action: () => scores.setScore(true), result: 'win' },
    'false': { action: () => scores.setScore(false), result: 'lose' },
    'draw': { result: 'draw' }
  },
};
export const optionsList = Object.keys(gameSettings.options);

const compareChoices = (userChoice, computerChoice) => {
  const { options, availableResults } = gameSettings;
  if(userChoice === computerChoice) return availableResults['draw'];
  const weakOption = options[userChoice];
  const compareResult = computerChoice === weakOption;
  return availableResults[compareResult];
}

const generateComputerChoice = () => {
  const availableOptionsLength = optionsList.length;
  const randomNumber = getRandomNumber(availableOptionsLength);
  const computerChoice = optionsList[randomNumber];
  return computerChoice;
};

export const getGameResult = (userChoice) => {
  const computerChoice = generateComputerChoice();
  const compareResult = compareChoices(userChoice, computerChoice);
  const { action, result } = compareResult;
  if(action) action();
  const { user, computer } = scores;
  const { gamesLimit } = gameSettings;
  const isLastGame = (user + computer) > gamesLimit;
  if(isLastGame) {
    const didUserWin = user > computer;
    const isItDraw = user === computer;
    if(isItDraw) {
      const finalResult = `It's Draw!`;
      return { user, computer, result: finalResult, isLastGame };
    }
    if(didUserWin) {
      const finalResult = `You won this Game!`;
      return { user, computer, result: finalResult, isLastGame };
    } else {
      const finalResult = `Sorry, You lose ;(`;
      return { user, computer, result: finalResult, isLastGame };
    }
  }
  return { user, computer, result };
}