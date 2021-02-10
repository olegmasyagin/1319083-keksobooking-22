'use strict';

//Нахождение случайного целого числа от и до включительно

const getRandomNumber = function(min, max) {
  if(min >= 0 && max > min){
    return Math.floor(Math.random() * ((max-min) + 1) + min);
  }
  throw new Error ('Ошибка ввода данных');
}

//Нахождение случайного дробного числа с указанной точностью знаков после запятой.

const getRandomFloatPoint = function(min, max, fix) {
  if(min >= 0 && max > min) {
    return (Math.random() * (max - min) + min).toFixed(fix);
  }
  throw new Error ('Ошибка ввода данных');
}

// getRandomNumber(0, 10);
// getRandomFloatPoint(1, 7, 2);

const AMOUNT_OBJECTS = 10;

const AMOUNT_AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
const TITLE_OFFER = ['Квартира на окраине', 'Дворец в центре', 'Дом в частном секторе', 'Бунгало на берегу озера'];
const PRICE_MIN = 0;
const PRICE_MAX = 10000;
const PROPERTY_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const AMOUNT_ROOMS_MIN = 1;
const AMOUNT_ROOMS_MAX = 5;
const QUANTITY_GUESTS_MIN = 1;
const QUANTITY_GUESTS_MAX = 10;
const CHECKIN_TIME = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES_OFFER = ['wifi', 'dishwasher', 'parking','washer','elevator', 'conditioner'];
const DESCRIPTION_OFFER = ['Тишина и покой для желающих отдохнуть', 'Красота и роскошь', 'Лучшее место для отдыха', 'Вдали от суеты'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const LATITUDE_MIN_X = 35.65000;
const LATITUDE_MAX_X = 35.70000;
const LONGITUDE_MIN_Y = 139.70000;
const LONGITUDE_MAX_Y = 139.80000;

// Функция нахождения случайного элемента в массиве

const getRandomArrElement = function (array) {
  const element = array[getRandomNumber(0, array.length -1)];
  return element;
}

//Генерация массива случайной длины

const getRandomАrr = function (array) {
  const index = getRandomNumber(0, array.length -1);
  const newArr = array.slice(index, index + getRandomNumber(1, array.length -1));
  return newArr;
}


const createAd = function () {
  const locationX = (getRandomFloatPoint(LATITUDE_MIN_X, LATITUDE_MAX_X, 5));
  const locationY = (getRandomFloatPoint(LONGITUDE_MIN_Y, LONGITUDE_MAX_Y, 5));
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomArrElement(AMOUNT_AVATARS) + '.png',
    },

    offer: {
      title: getRandomArrElement(TITLE_OFFER),
      address: locationX + ', ' + locationY,
      price: getRandomNumber(PRICE_MIN, PRICE_MAX),
      type: getRandomArrElement(PROPERTY_TYPE),
      rooms: getRandomNumber(AMOUNT_ROOMS_MIN, AMOUNT_ROOMS_MAX),
      quests: getRandomNumber(QUANTITY_GUESTS_MIN, QUANTITY_GUESTS_MAX),
      checkin: getRandomArrElement(CHECKIN_TIME),
      checkout: getRandomArrElement(CHECKOUT_TIME),
      features: getRandomАrr(FEATURES_OFFER),
      description: getRandomArrElement(DESCRIPTION_OFFER),
      photos: getRandomАrr(PHOTOS),
    },

    location: {
      x: locationX,
      y: locationY,
    },
  }
};

const createArrayAds = function () {
  const arrAds = [];
  for (let i = 0; i < AMOUNT_OBJECTS; i++) {
    arrAds.push(createAd());
  }
  return arrAds;
};

createArrayAds();

