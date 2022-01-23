import { doesObjectHaveKey } from '../lib/common.js';
import { startGame } from './start.module.js';
import { getGameResult, optionsList } from './game.module.js';

const handlerMap = {
  start: startGame,
  reset: () => location.reload(),
};
const userScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#ai-score');
const textResultPlace = document.querySelector('#textResult');
const resetBtn = document.querySelector('#reset');
const optionButtons = document.querySelectorAll('.actions__button');

const removeLastClass = (classList) => {
  const lastClass = classList[classList.length - 1];
  classList.remove(lastClass);
}

const classHandler = (result) => {
  const classList = textResultPlace.classList;
  removeLastClass(classList);
  classList.add(`result__value--${result}`);
}

const changeResultView = (user, computer, result) => {
  userScore.innerHTML = user;
  computerScore.innerHTML = computer;
  textResultPlace.innerHTML = `${result}!`;
};

const endGame = (result) => {
  textResultPlace.innerHTML = result;
  const classList = textResultPlace.classList;
  removeLastClass(classList);
  resetBtn.classList.add('actions__button--reset--endGame');
  for (const button of optionButtons) {
    const { id } = button;
    if(id !== 'reset') {
      button.disabled = true;
      button.classList.add('actions__button--disabled');
    }
  }
};

const clickHandler = ({ target }) => {
  const { id } = target;
  const isValidKey = doesObjectHaveKey(handlerMap, id);
  if(isValidKey) return handlerMap[id](id);
  const isValidOption = optionsList.includes(id);
  if(!isValidOption) return;
  const gameResult = getGameResult(id);
  const { user, computer, result, isLastGame } = gameResult;

  if(isLastGame) {
    endGame(result);
    return;
  }
  changeResultView(user, computer, result);
  classHandler(result);
}
export default clickHandler;