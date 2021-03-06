import { resetMarkerPosition } from './map.js';
import { sendUserData } from './api.js';
import { showErrorDispatch, showSuccessDispatch} from './popup.js';

const adForm = document.querySelector('.ad-form');
const resetAdForm = document.querySelector('.ad-form__reset')
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

const FILE__TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PHOTO_WIDTH = 70;
const PHOTO_HEIGHT = 70;
const AVATAR_DEFAULT = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housingPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const housingPhotoPreview = document.querySelector('.ad-form__photo-container');

avatarChooser.addEventListener('change', () => {
  const avatar = avatarChooser.files[0];
  const avatarName = avatar.name.toLowerCase();

  const matches = FILE__TYPES.some((it) => {
    return avatarName.endsWith(it);
  });

  if(matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(avatar);
  }
});

housingPhotoChooser.addEventListener('change', () =>{
  const housing = housingPhotoChooser.files[0];
  const housingName = housing.name.toLowerCase();

  const matches = FILE__TYPES.some((it) => {
    return housingName.endsWith(it);
  });

  if(matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const photoContainer = document.createElement('div');
      photoContainer.classList.add('ad-form__photo');
      const housingPhoto = document.createElement('img');
      housingPhoto.width = PHOTO_WIDTH;
      housingPhoto.height = PHOTO_HEIGHT;
      housingPhoto.src = reader.result;
      housingPhotoPreview.appendChild(photoContainer);
      photoContainer.appendChild(housingPhoto);
    });

    reader.readAsDataURL(housing);
  }
});

const resetAllPreviews = () => {
  avatarPreview.src = AVATAR_DEFAULT;
  while (housingPhotoPreview.children.length > 2) {
    housingPhotoPreview.removeChild(housingPhotoPreview.lastChild);
  }
};


const minPrice = {
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
  inputPrice.placeholder = minPrice[housingTypeSelect.value];
  inputPrice.min = minPrice[housingTypeSelect.value];
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

const disableForm = (form, fields) => {
  changeClassName();
  form.classList.add(className);
  fields.forEach((field) => {
    field.disabled = true;
  })
};

const enableForm = (form, fields) => {
  changeClassName();
  form.classList.remove(className);
  fields.forEach((field) => {
    field.disabled = false;
  })
};

const deactivatePage = () => {
  disableForm(adForm, adFormFields);
  disableForm(mapFilters, mapFiltersFields);
}

const activatePage = () => {
  enableForm(adForm, adFormFields);
  enableForm(mapFilters, mapFiltersFields);
}

deactivatePage();

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendUserData(showSuccessDispatch, showErrorDispatch, new FormData(evt.target));
  adForm.reset();
  resetAllPreviews();
});

resetAdForm.addEventListener('click', (evt) =>{
  evt.preventDefault();
  adForm.reset();
  mapFilters.reset();
  resetMarkerPosition();
  resetAllPreviews();
});

export { activatePage, adFormAddress, adForm, mapFilters };
