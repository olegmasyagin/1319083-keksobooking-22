'use strict';

//Нахождение случайного целого числа от и до включительно

const getRandomNumber = function(min, max) {
  if(min >= 0 && max > min){
    return Math.floor(Math.random() * ((max-min) + 1) + min);
  }
  throw ('Ошибка ввода данных');
}

//Нахождение случайного дробного числа с указанной точностью знаков после запятой.

const getRandomFloatPoint = function(min, max, fix) {
  if(min >= 0 && max > min) {
    return (Math.random() * (max - min) + min).toFixed(fix);
  }
  throw ('Ошибка ввода данных');
}

// getRandomNumber(0, 10);
// getRandomFloatPoint(1, 7, 2);

const amountObjects = 10;

const amountAvatars = [1, 2, 3, 4, 5, 6, 7, 8];
const titleOffer = ['Квартира на окраине', 'Дворец в центре', 'Дом в частном секторе', 'Бунгало на берегу озера'];
const priceMin = 0;
const priceMax = 10000;
const propertyType = ['palace', 'flat', 'house', 'bungalow'];
const amountRoomsMin = 1;
const amountRoomsMax = 5;
const quantityGuestsMin = 1;
const quantityGuestsMax = 10;
const checkinTime = ['12:00', '13:00', '14:00'];
const checkoutTime = ['12:00', '13:00', '14:00'];
const featuresOffer = ['wifi', 'dishwasher', 'parking','washer','elevator', 'conditioner'];
const descriptionOffer = ['Тишина и покой для желающих отдохнуть', 'Красота и роскошь', 'Лучшее место для отдыха', 'Вдали от суеты'];
const photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const latitudeMinX = 35.65000;
const latitudeMaxX = 35.70000;
const longitudeMinY = 139.70000;
const longitudeMaxY = 139.80000;

// Функция нахождения случайного элемента в массиве

const getRandomArrElement = function (array) {
  let element = array[getRandomNumber(0, array.length -1)];
  return element;
}

//Генерация массива случайной длины

const getRandomАrr = function (array) {
  let index = getRandomNumber(0, array.length -1);
  let newArr = array.slice(index, index + getRandomNumber(1, array.length -1));
  return newArr;
}


const createAd = function () {
  let locationX = (getRandomFloatPoint(latitudeMinX, latitudeMaxX, 5));
  let locationY = (getRandomFloatPoint(longitudeMinY, longitudeMaxY, 5));
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomArrElement(amountAvatars) + '.png',
    },

    offer: {
      title: getRandomArrElement(titleOffer),
      address: locationX + ', ' + locationY,
      price: getRandomNumber(priceMin, priceMax),
      type: getRandomArrElement(propertyType),
      rooms: getRandomNumber(amountRoomsMin, amountRoomsMax),
      quests: getRandomNumber(quantityGuestsMin, quantityGuestsMax),
      checkin: getRandomArrElement(checkinTime),
      checkout: getRandomArrElement(checkoutTime),
      features: getRandomАrr(featuresOffer),
      description: getRandomArrElement(descriptionOffer),
      photos: getRandomАrr(photos),
    },

    location: {
      x: locationX,
      y: locationY,
    },
  }
};

const createArrayAds = function () {
  let arrAds = [];
  for (let i = 0; i < amountObjects; i++) {
    arrAds.push(createAd());
  }
  return arrAds;
};

createArrayAds();

