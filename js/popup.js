import { isEscEvent } from './util.js';

const POPUP_DISPLAY_TIME = 5000;
const mainDocument = document.querySelector('main');
const templateSucces = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const displayMessage = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.position = 'fixed';
  messageContainer.style.top = '0';
  messageContainer.style.right = '0';
  messageContainer.style.left = '0';
  messageContainer.style.zIndex = '50';
  messageContainer.style.padding = '10px 3px';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.color = 'white';

  messageContainer.textContent = message;

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, POPUP_DISPLAY_TIME)
};

const createPopup = (typePopup) => {

  mainDocument.append(typePopup);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup(typePopup);
    }
  };

  const closePopup  = () => {
    typePopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  document.addEventListener('keydown', onPopupEscKeydown);

  typePopup.addEventListener('click', () => {
    closePopup(typePopup);
  });
};

const showSuccessDispatch = () => {
  const successDispatch = templateSucces.cloneNode(true);
  createPopup(successDispatch);
};

const showErrorDispatch = () => {
  const errorDispatch = templateError.cloneNode(true);
  createPopup(errorDispatch);
};

export { displayMessage, showErrorDispatch, showSuccessDispatch };
