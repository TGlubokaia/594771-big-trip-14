export const createOption = function(citiesNames) {
  let options = '';
  for (const city of citiesNames) {
    options += `<option value="${city}"></option>`;
  }
  return options;
};
