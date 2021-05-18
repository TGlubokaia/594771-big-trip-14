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
import {createPoint} from './mock/point.js';
import {renderTemplate} from './utils.js';

const ITEMS_COUNT = 17;

const items = new Array(ITEMS_COUNT).fill().map(createPoint);


const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderTripMain = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteListElement = siteMainElement.querySelector('.trip-events');

renderTemplate(siteHeaderTripMain, createHeaderInfo(), 'afterbegin');

const siteHeaderTripInfo = siteHeaderElement.querySelector('.trip-info');
renderTemplate(siteHeaderTripInfo, createRoute(), 'afterbegin');
renderTemplate(siteHeaderTripInfo, createPrice(), 'beforeend');
renderTemplate(siteMenuElement, createMenu(), 'beforeend');
renderTemplate(siteFiltersElement, createFilters(), 'beforeend');
renderTemplate(siteListElement, createSort(), 'afterbegin');
renderTemplate(siteListElement, createTripsList(), 'beforeend');

const siteTripsList = siteMainElement.querySelector('.trip-events__list');
renderTemplate(siteTripsList, createForm(), 'afterbegin');
renderTemplate(siteTripsList, createFormEdit(items[0]), 'afterbegin');

for (let i = 1; i < ITEMS_COUNT; i++) {
  renderTemplate(siteTripsList, createRouteItem(items[i]), 'beforeend');
}
