import { activatePage, adFormAddress} from './ad-form.js';
import { createCard } from './render-popup.js';
import { getServerData } from './api.js';
import { displayMessage } from './popup.js';

const SCALE_MAP = 10;
const MAIN_PIN_SRC = '../img/main-pin.svg';
const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR = [26, 52];
const REGULAR_PIN_SRC = '../img/pin.svg';
const REGULAR_PIN_SIZE = [40, 40];
const REGULAR_PIN_ANCHOR = [20, 40];
const DECIMAL_PLACE = 5;
const CENTER_TOKYO = {
  lat: '35.68407',
  lng: '139.75708',
}

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
    adFormAddress.value = `${CENTER_TOKYO.lat}, ${CENTER_TOKYO.lng}`;
  })
  .setView({
    lat: CENTER_TOKYO.lat,
    lng: CENTER_TOKYO.lng,
  }, SCALE_MAP);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_SRC,
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
});

const  mainPinMarker = L.marker(
  {
    lat: CENTER_TOKYO.lat,
    lng: CENTER_TOKYO.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

mainPinMarker.on('moveend', (evt) => {
  adFormAddress.value = `${evt.target.getLatLng().lat.toFixed(DECIMAL_PLACE)}, ${evt.target.getLatLng().lng.toFixed(DECIMAL_PLACE)}`;
});

const createRegularPin = similarAds => {

  similarAds.forEach((descriptionAd) => {
    const {location} = descriptionAd;

    const regularPin = L.icon ({
      iconUrl: REGULAR_PIN_SRC,
      iconSize: REGULAR_PIN_SIZE,
      iconAnchor: REGULAR_PIN_ANCHOR,
    });

    const marker = L.marker (
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        regularPin,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        createCard(descriptionAd),
        {
          keepInView: true,
        },
      );
  });
};

getServerData(createRegularPin, displayMessage);

const resetMarkerPosition = () => {
  map.setView(CENTER_TOKYO, SCALE_MAP);
  map.closePopup();
  mainPinMarker.setLatLng(CENTER_TOKYO);
  adFormAddress.value = `${CENTER_TOKYO.lat}, ${CENTER_TOKYO.lng}`;
}

export { resetMarkerPosition };
