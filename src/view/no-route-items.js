import {createElement} from '../utils.js';

const createNoItemsTemplate = function () {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

export default class NoItems {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoItemsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
