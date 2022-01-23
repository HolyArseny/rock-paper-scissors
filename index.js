import clickHandler from './modules/handlers.module.js';

const init = () => {
  const app = document.querySelector('#app');
  app.addEventListener('click', clickHandler);
};
init();