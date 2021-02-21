const adForm = document.querySelector('.ad-form');
const housingTypeSelect = adForm.querySelector('#type');
const inputPrice = adForm.querySelector('#price');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');
const adFormAddress = adForm.querySelector('#address')

const MinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};


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
