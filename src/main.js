import {createMenu} from './view/menu.js';
import {createFilters} from './view/filter.js';
import {createSort} from './view/sort.js';
import {createRoute} from './view/route.js';
import {createHeaderInfo} from './view/header-trip-info.js';
import {createPrice} from './view/price.js';
import {createTripsList} from './view/trips-list.js';
import {createForm} from './view/form-create.js';
import {createFormEdit} from './view/form-edit.js';
import {createRouteItem} from './view/destination-item.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderTripMain = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteListElement = siteMainElement.querySelector('.trip-events');

render(siteHeaderTripMain, createHeaderInfo(), 'afterbegin');

const siteHeaderTripInfo = siteHeaderElement.querySelector('.trip-info');
render(siteHeaderTripInfo, createRoute(), 'afterbegin');
render(siteHeaderTripInfo, createPrice(), 'beforeend');
render(siteMenuElement, createMenu(), 'beforeend');
render(siteFiltersElement, createFilters(), 'beforeend');
render(siteListElement, createSort(), 'afterbegin');
render(siteListElement, createTripsList(), 'beforeend');

const siteTripsList = siteMainElement.querySelector('.trip-events__list');
render(siteTripsList, createForm(), 'afterbegin');
render(siteTripsList, createFormEdit(), 'afterbegin');

for (let i = 0; i < 3; i++) {
  render(siteTripsList, createRouteItem(), 'beforeend');
}
