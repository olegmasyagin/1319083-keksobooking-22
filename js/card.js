//Создание элемента

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

//Добавлениe контента

const assignContent = function (varName, value) {
  if(value) {
    varName.textContent = value;
  }else{
    varName.classList.add('hidden');
  }
};


//Добавление src

const assignContentSrc = function (varName, value) {
  if(value) {
    varName.src = value;
  }else{
    varName.classList.add('hidden');
  }
};

//Рендер преимуществ

const renderFeatures = function (offers, varName) {
  if(offers) {
    varName.innerHTML = '';

    offers.forEach(function(item) {
      const element = createElement('li', 'popup__feature', `popup__feature--${item}`);
      varName.appendChild(element);
    });
  }else{
    varName.classList.add('hidden');
  }
};

//Рендер фотографий

const renderPhotos = function (offers, varName) {
  if(offers) {
    varName.innerHTML = '';

    offers.forEach(function(item) {
      const photo = createElement('img', 'popup__photo', false, item);
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      varName.appendChild(photo);
    });
  }else{
    varName.classList.add('hidden');
  }
};

export {assignContent, assignContentSrc, renderPhotos, renderFeatures};
