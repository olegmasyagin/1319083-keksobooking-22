const adForm = document.querySelector('.ad-form');
const housingTypeSelect = adForm.querySelector('#type');
const inputPrice = adForm.querySelector('#price');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');

const minPrice = {
  bungalow : 0,
  flat : 1000,
  house: 5000,
  palace : 10000,
};


housingTypeSelect.addEventListener('input', function () {
  inputPrice.placeholder = minPrice[housingTypeSelect.value];
});

timeinSelect.addEventListener('input', function () {
  timeoutSelect.value = timeinSelect.value;
});

timeoutSelect.addEventListener('input', function () {
  timeinSelect.value = timeoutSelect.value;
});






