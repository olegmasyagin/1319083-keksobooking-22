import { createArrayAds } from './create-array-ads.js';
import { createElement } from '/util.js';


const similarAds = createArrayAds();
const cardList = document.querySelector('.map__canvas');
const similarCard = document.querySelector('#card').content.querySelector('.popup');
const fragment = document.createDocumentFragment();
const housingTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

similarAds.forEach(({offer, author}) => {
  const adCard = similarCard.cloneNode(true);

  const popupTitle = adCard.querySelector('.popup__title');
  if(offer.title) {
    popupTitle.textContent = offer.title;
  }else{
    popupTitle.classList.add('hidden');
  }

  const popupTextAddress = adCard.querySelector('.popup__text--address');
  if(offer.address) {
    popupTextAddress.textContent = offer.address;
  }else{
    popupTextAddress.classList.add('hidden');
  }

  const popupTextPrice = adCard.querySelector('.popup__text--price');
  if(offer.price) {
    popupTextPrice.textContent = offer.price + ' ₽/ночь';
  }else{
    popupTextPrice.classList.add('hidden');
  }

  const popupType = adCard.querySelector('.popup__type');
  if(offer.type) {
    popupType.textContent = housingTypes[offer.type];
  }else{
    popupType.classList.add('hidden');
  }

  const popupTextCapacity = adCard.querySelector('.popup__text--capacity');
  if(offer.rooms && offer.guests) {
    popupTextCapacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  }else{
    popupTextCapacity.classList.add('hidden');
  }

  const popupTextTime = adCard.querySelector('.popup__text--time');
  if(offer.checkin && offer.checkout) {
    popupTextTime.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  }else{
    popupTextTime.classList.add('hidden');
  }

  const popupFeatures = adCard.querySelector('.popup__features');
  if(offer.features){
    popupFeatures.innerHTML = '';

    for(let i = 0; i < offer.features.length; i++){
      const feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add(`popup__feature--${offer.features[i]}`);
      popupFeatures.appendChild(feature);
    }
  }else{
    popupFeatures.classList.add('hidden');
  }

  const popupDescription = adCard.querySelector('.popup__description');
  if(offer.description) {
    popupDescription.textContent = offer.description;
  }else{
    popupDescription.classList.add('hidden');
  }

  const popupPhotos = adCard.querySelector('.popup__photos');
  if(offer.photos) {
    popupPhotos.innerHTML = '';

    for(let i = 0; i < offer.photos.length; i++) {
      const photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = offer.photos[i];
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      popupPhotos.appendChild(photo);
    }
  }else{
    popupPhotos.classList.add('hidden');
  }

  const popupAvatar = adCard.querySelector('.popup__avatar');
  if(author.avatar) {
    popupAvatar.src = author.avatar;
  }else{
    popupAvatar.classList.add('hidden');
  }

  fragment.appendChild(adCard);
});

const renderPopup = function (numberCard) {
  cardList.appendChild(fragment.children[numberCard]);
}

renderPopup(0);





