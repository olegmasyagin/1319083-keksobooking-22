import { assignContent, assignContentSrc, renderPhotos, renderFeatures } from './card.js';

const similarCard = document.querySelector('#card').content.querySelector('.popup');
const housingTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const createCard = ((descriptionAd) =>{

  const {offer, author} = descriptionAd;
  const card = similarCard.cloneNode(true);

  const popupTitle = card.querySelector('.popup__title');
  assignContent(popupTitle, offer.title);

  const popupTextAddress = card.querySelector('.popup__text--address');
  assignContent(popupTextAddress, offer.address);

  const popupTextPrice = card.querySelector('.popup__text--price');
  const concatenationPrice = offer.price + ' ₽/ночь';
  assignContent(popupTextPrice, concatenationPrice);

  const popupType = card.querySelector('.popup__type');
  assignContent(popupType, housingTypes[offer.type]);

  const popupTextCapacity = card.querySelector('.popup__text--capacity');
  const concatenationCapacity = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  assignContent(popupTextCapacity, concatenationCapacity);

  const popupTextTime = card.querySelector('.popup__text--time');
  const concatenationTime = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  assignContent(popupTextTime, concatenationTime);

  const popupDescription = card.querySelector('.popup__description');
  assignContent(popupDescription, offer.description);

  const popupAvatar = card.querySelector('.popup__avatar');
  assignContentSrc(popupAvatar, author.avatar);

  const popupFeatures = card.querySelector('.popup__features');
  renderFeatures(offer.features, popupFeatures);

  const popupPhotos = card.querySelector('.popup__photos')
  renderPhotos(offer.photos, popupPhotos);

  return card;
});

export { createCard };

