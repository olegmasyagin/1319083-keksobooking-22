import { mapFilters } from './ad-form.js';

const filterType = mapFilters.querySelector('#housing-type');
const filterPrice = mapFilters.querySelector('#housing-price');
const filterRooms = mapFilters.querySelector('#housing-rooms');
const filterGuests = mapFilters.querySelector('#housing-guests');
const filterFeatures = mapFilters.querySelector('#housing-features');

const getPriceFilter = (data) => {

  const lowPrice = 10000;
  const highPrice = 50000;

  switch (filterPrice.value) {
    case 'low': return data.offer.price < lowPrice;
    case 'middle': return data.offer.price > lowPrice && data.offer.price < highPrice;
    case 'high': return data.offer.price > highPrice;
    default: return true;
  }
};

const checkedType = (data) => {
  return filterType.value === 'any' || data.offer.type === filterType.value;
};

const checkedRooms = (data) => {
  return filterRooms.value === 'any' || data.offer.rooms === parseInt(filterRooms.value, 10);
};

const checkedGuests = (data) => {
  if(filterGuests.value !== 'any') {
    return data.offer.guests === parseInt(filterGuests.value, 10);
  }

  return true;
}

const selectFeatures = (data) => {
  let result = true;

  filterFeatures.querySelectorAll('input:checked').forEach((item) =>{
    if(data.indexOf(item.value) === -1) {
      result = false;
    }
  });

  return result;
}


const getFilteredAds = (data) => {
  return (
    checkedType(data) &&
    checkedRooms(data) &&
    checkedGuests(data) &&
    selectFeatures(data.offer.features) &&
    getPriceFilter(data)
  )
}


const setFilterChange = (cb) => {
  mapFilters.addEventListener('change', () =>{
    cb();
  });
};

const setFilterReset = (cb) => {
  mapFilters.addEventListener('reset', () => {
    setTimeout(() => {
      cb();
    }, 0);
  });
};

export { getFilteredAds, setFilterChange, setFilterReset};
