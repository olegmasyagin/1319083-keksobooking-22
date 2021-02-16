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

const createElement = function (tagName, className, modifier, source) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if(modifier) {
    element.classList.add(modifier);
  }
  if(source) {
    element.src = source;
  }

  return element;
}

export {getRandomNumber, getRandomFloatPoint, getRandomArrElement, getRandomАrr, createElement};
