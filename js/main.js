'use strict';

const getRandomNumber = function(min, max) {
  if(min >= 0 && max > min){
    return Math.floor(Math.random() * ((max-min) + 1) + min);
  }
  throw ('Ошибка ввода данных');
}

const getRandomFloatPoint = function(min, max, fix) {
  if(min >= 0 && max > min) {
    return (Math.random() * ((max - min) + 1) + min).toFixed(fix);
  }
  throw ('Ошибка ввода данных');
}

getRandomNumber(0, 10);
getRandomFloatPoint(1, 7, 2);
