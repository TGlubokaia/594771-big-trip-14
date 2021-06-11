export const createOption = function(citiesNames) {
  let options = '';
  for (const city of citiesNames) {
    options += `<option value="${city}"></option>`;
  }
  return options;
};

const getWeightForNull = (keyA, keyB) => {
  if (keyA === null && keyB === null) {
    return 0;
  }

  if (keyA === null) {
    return 1;
  }

  if (keyB === null) {
    return -1;
  }

  return null;
};

export const sortTime = (itemA, itemB) => {
  const weight = getWeightForNull(itemA.duration, itemB.duration);

  if (weight !== null) {
    return weight;
  }

  return itemB.duration - itemA.duration;
};

export const sortPrice = (itemA, itemB) => {
  const weight = getWeightForNull(itemA.price, itemB.price);

  if (weight !== null) {
    return weight;
  }

  return itemB.price - itemA.price;
};

