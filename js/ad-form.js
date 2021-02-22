const adForm = document.querySelector('.ad-form');
const housingTypeSelect = adForm.querySelector('#type');
const inputPrice = adForm.querySelector('#price');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');
const adFormAddress = adForm.querySelector('#address');
const numberRooms = adForm.querySelector('#room_number');
const capacityRooms = adForm.querySelector('#capacity');
const titleAdInput = adForm.querySelector('#title');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFields = mapFilters.querySelectorAll('label, input, select');
const adFormFields = adForm.querySelectorAll('label, input, select, textarea, button');

const MinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const MIN_DESC_LENGTH = 30;
const MAX_DESC_LENGTH = 100;

const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const onRoomsNumberSelect = (peopleAmount) => {
  const seatingCapacityOptions = capacityRooms.querySelectorAll('option');

  seatingCapacityOptions.forEach((option) => {
    option.disabled = true;
  });

  roomValues[peopleAmount].forEach((seatsAmount) => {
    seatingCapacityOptions.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};


const onTitleChange = () => {
  const valueLength = titleAdInput.value.length;

  if (valueLength < MIN_DESC_LENGTH) {
    titleAdInput.setCustomValidity('Ещё ' + (MIN_DESC_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_DESC_LENGTH) {
    titleAdInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_DESC_LENGTH) + ' симв.');
  } else {
    titleAdInput.setCustomValidity('');
  }

  titleAdInput.reportValidity();
};

numberRooms.addEventListener('input', () => {
  onRoomsNumberSelect(numberRooms.value);
});

titleAdInput.addEventListener('input', () => {
  onTitleChange();
});

housingTypeSelect.addEventListener('input', () => {
  inputPrice.placeholder = MinPrice[housingTypeSelect.value];
});

timeinSelect.addEventListener('input', () => {
  timeoutSelect.value = timeinSelect.value;
});

timeoutSelect.addEventListener('input', () => {
  timeinSelect.value = timeoutSelect.value;
});

let className = undefined;

const changeClassName = () => {
  mapFilters ? className = 'map__filters--disabled' : className = 'ad-form--disabled';
}

//Отключение формы
const disableForm = (form, fields) => {
  changeClassName();
  form.classList.add(className);
  fields.forEach((field) => {
    field.disabled = true;
  })
};

//Включение формы
const enableForm = (form, fields) => {
  changeClassName();
  form.classList.remove(className);
  fields.forEach((field) => {
    field.disabled = false;
  })
};

//Деактивация страницы
const deactivatePage = () => {
  disableForm(adForm, adFormFields);
  disableForm(mapFilters, mapFiltersFields);
}

//Активация страницы
const activatePage = () => {
  enableForm(adForm, adFormFields);
  enableForm(mapFilters, mapFiltersFields);
}

deactivatePage();

export {activatePage, adFormAddress};
