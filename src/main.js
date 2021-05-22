import SiteMenuView from './view/menu.js';
import FiltersView from './view/filter.js';
import SortView from './view/sort.js';
import RouteView from './view/header-trip-route.js';
import TripInfoView from './view/header-trip-info.js';
import PriceView from './view/header-trip-price.js';
import TripsListView from './view/trips-list.js';
import FormCreateView from './view/form-create.js';
import FormEditView from './view/form-edit.js';
import RouteItemView from './view/route-item.js';
import NoRouteItemsView from './view/no-route-items.js';
import {createPoint, citiesNames} from './mock/point.js';
import {render, RenderPosition} from './utils.js';

const ITEMS_COUNT = 17;

const items = new Array(ITEMS_COUNT).fill().map(createPoint);

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderTripMain = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteListElement = siteMainElement.querySelector('.trip-events');

const renderRouteItem = (listElement, item, cities) => {
  const routeItemViewComponent = new RouteItemView(item);
  const FormEditViewComponent = new FormEditView(item, cities);

  const replaceCardToForm = () => {
    listElement.replaceChild(FormEditViewComponent.getElement(), routeItemViewComponent.getElement());
    document.addEventListener('keydown', onEscKeyDown); // <- корректно?
  };

  const replaceFormToCard = () => {
    listElement.replaceChild(routeItemViewComponent.getElement(), FormEditViewComponent.getElement());
    document.removeEventListener('keydown', onEscKeyDown); // <- корректно?
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  routeItemViewComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    // document.addEventListener('keydown', onEscKeyDown);
  });

  FormEditViewComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    // document.removeEventListener('keydown', onEscKeyDown);
  });

  FormEditViewComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToCard();
  });

  render(listElement, routeItemViewComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteHeaderTripMain, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);

const siteHeaderTripInfo = siteHeaderElement.querySelector('.trip-info');
render(siteHeaderTripInfo, new RouteView().getElement(), RenderPosition.AFTERBEGIN);
render(siteHeaderTripInfo, new PriceView().getElement(), RenderPosition.BEFOREEND);
render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteFiltersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

if (items.length === 0) {
  render(siteListElement, new NoRouteItemsView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(siteListElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);

  const tripsListViewComponent = new TripsListView();
  render(siteListElement, tripsListViewComponent.getElement(), RenderPosition.BEFOREEND);
  render(tripsListViewComponent.getElement(), new FormCreateView(citiesNames).getElement(), RenderPosition.AFTERBEGIN);

  for (let i = 0; i < ITEMS_COUNT; i++) {
    renderRouteItem(tripsListViewComponent.getElement(), items[i], citiesNames);
  }
}
