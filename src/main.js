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
import {render, RenderPosition, replace} from './utils/render';

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
  const formEditViewComponent = new FormEditView(item, cities);

  const replaceCardToForm = () => {
    replace(formEditViewComponent, routeItemViewComponent);
    document.addEventListener('keydown', onEscKeyDown); // <- корректно?
  };

  const replaceFormToCard = () => {
    replace(routeItemViewComponent, formEditViewComponent);
    document.removeEventListener('keydown', onEscKeyDown); // <- корректно?
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  routeItemViewComponent.setEditClickHandler(() => {
    replaceCardToForm();
    // document.addEventListener('keydown', onEscKeyDown);
  });

  formEditViewComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    // document.removeEventListener('keydown', onEscKeyDown);
  });

  formEditViewComponent.setFormHideClickHandler(() => {
    replaceFormToCard();
  });

  render(listElement, routeItemViewComponent, RenderPosition.BEFOREEND);
};

render(siteHeaderTripMain, new TripInfoView(), RenderPosition.AFTERBEGIN);

const siteHeaderTripInfo = siteHeaderElement.querySelector('.trip-info');
render(siteHeaderTripInfo, new RouteView(), RenderPosition.AFTERBEGIN);
render(siteHeaderTripInfo, new PriceView(), RenderPosition.BEFOREEND);
render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteFiltersElement, new FiltersView(), RenderPosition.BEFOREEND);

if (items.length === 0) {
  render(siteListElement, new NoRouteItemsView(), RenderPosition.BEFOREEND);
} else {
  render(siteListElement, new SortView(), RenderPosition.AFTERBEGIN);

  const tripsListViewComponent = new TripsListView();
  render(siteListElement, tripsListViewComponent, RenderPosition.BEFOREEND);
  render(tripsListViewComponent, new FormCreateView(citiesNames), RenderPosition.AFTERBEGIN);

  for (let i = 0; i < ITEMS_COUNT; i++) {
    renderRouteItem(tripsListViewComponent.getElement(), items[i], citiesNames);
  }
}
