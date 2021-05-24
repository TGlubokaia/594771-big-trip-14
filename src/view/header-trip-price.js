import AbstractView from './abstract.js';

const createPriceTemplate =  function () {
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
</p>`;
};

export default class Price extends AbstractView {
  getTemplate() {
    return createPriceTemplate();
  }
}
