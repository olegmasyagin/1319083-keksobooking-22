const adForm = document.querySelector('.ad-form');
const housingTypeSelect = adForm.querySelector('#type');
const inputPrice = adForm.querySelector('#price');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');
const adFormAddress = adForm.querySelector('#address');
const numberRooms = adForm.querySelector('#room_number');
const capacityRooms = adForm.querySelector('#capacity');
const titleAdInput = adForm.querySelector('#title');

const MinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const MIN_DESC_LENGTH = 30;
const MAX_DESC_LENGTH = 100;

const checkingRoomsAndGuests = (rooms, guests) => {
  if (rooms.value === '1' && rooms.value !== guests.value ) {
    guests.setCustomValidity('1 комната - «для 1 гостя»');
  }else if (rooms.value === '2' && guests.value !== '2' && guests.value !== '1') {
    guests.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
  }else if (rooms.value === '3' && guests.value !== '3' && guests.value !== '2' && guests.value !== '1') {
    guests.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  }else if (rooms.value === '100' && guests.value !== '0') {
    guests.setCustomValidity('100 комнат — «не для гостей»');
  }else{
    guests.setCustomValidity('');
  }

  guests.reportValidity();
}

titleAdInput.addEventListener('input' , () => {
  const valueLength = titleAdInput.value.length;

  if (valueLength < MIN_DESC_LENGTH) {
    titleAdInput.setCustomValidity('Ещё ' + (MIN_DESC_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_DESC_LENGTH) {
    titleAdInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_DESC_LENGTH) + ' симв.');
  } else {
    titleAdInput.setCustomValidity('');
  }

  titleAdInput.reportValidity();
} );

numberRooms.addEventListener('input', () => {
  checkingRoomsAndGuests(numberRooms, capacityRooms);
});

capacityRooms.addEventListener('input', () => {
  checkingRoomsAndGuests(numberRooms, capacityRooms);
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

const mapFilters = document.querySelector('.map__filters');
const mapFiltersFields = mapFilters.querySelectorAll('label, input, select');
const adFormFields = adForm.querySelectorAll('label, input, select, textarea, button');

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
