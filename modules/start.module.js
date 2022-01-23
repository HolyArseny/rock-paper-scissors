const animateStart = (startButton, game) => {
  startButton.style.display = 'none';
  game.style.display = 'block';
  game.classList.add('game--started');
}

export const startGame = () => {
  const startButton = document.querySelector('#start');
  const game = document.querySelector('#game');

  startButton.addEventListener(
    'animationend',
    animateStart.bind(null, startButton, game)
  );
  console.log(startButton)
  startButton.classList.add('start__button--active');
};