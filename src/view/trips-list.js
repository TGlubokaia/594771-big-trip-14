import AbstractView from './abstract.js';

const createTripsListTemplate =  function () {
  return `<ul class="trip-events__list">
  </ul>`;
};

export default class TripsList extends AbstractView {
  getTemplate() {
    return createTripsListTemplate();
  }
}
