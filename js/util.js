const getRandomNumber = (min, max) => {
  if(min >= 0 && max > min){
    return Math.floor(Math.random() * ((max-min) + 1) + min);
  }
  throw new Error ('Ошибка ввода данных');
}

const getRandomFloatPoint = (min, max, fix) => {
  if(min >= 0 && max > min) {
    return (Math.random() * (max - min) + min).toFixed(fix);
  }
  throw new Error ('Ошибка ввода данных');
}

const getRandomArrElement = (array) => {
  const element = array[getRandomNumber(0, array.length -1)];
  return element;
}

const getRandomАrr = (array) => {
  const index = getRandomNumber(0, array.length -1);
  const newArr = array.slice(index, index + getRandomNumber(1, array.length -1));
  return newArr;
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

export { getRandomNumber, getRandomFloatPoint, getRandomArrElement, getRandomАrr, isEscEvent };
