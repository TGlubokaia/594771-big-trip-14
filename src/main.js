import SiteMenuView from './view/menu.js';
import FiltersView from './view/filter.js';
import SortView from './view/sort.js';
import RouteView from './view/header-trip-route.js';
import TripInfoView from './view/header-trip-info.js';
import PriceView from './view/header-trip-price.js';
import TripsListView from './view/trips-list.js';
import {createForm} from './view/form-create.js';
import FormEditView from './view/form-edit.js';
import {createRouteItem} from './view/route-item.js';
import {createPoint, pointName} from './mock/point.js';
import {renderElement, RenderPosition} from './utils.js';

const ITEMS_COUNT = 17;

const items = new Array(ITEMS_COUNT).fill().map(createPoint);


const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderTripMain = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteListElement = siteMainElement.querySelector('.trip-events');

renderElement(siteHeaderTripMain, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);

const siteHeaderTripInfo = siteHeaderElement.querySelector('.trip-info');
renderElement(siteHeaderTripInfo, new RouteView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteHeaderTripInfo, new PriceView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteFiltersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteListElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);

const tripsListViewComponent = new TripsListView();
renderElement(siteListElement, tripsListViewComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(tripsListViewComponent.getElement(), createForm(), RenderPosition.AFTERBEGIN);
renderElement(tripsListViewComponent.getElement(), createFormEdit(items[0]), RenderPosition.AFTERBEGIN);

for (let i = 1; i < ITEMS_COUNT; i++) {
  renderElement(tripsListViewComponent.getElement(), createRouteItem(items[i]), RenderPosition.BEFOREEND);
}
