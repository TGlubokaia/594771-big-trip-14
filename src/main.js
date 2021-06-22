import SiteMenuView from './view/menu.js';
import FiltersView from './view/filter.js';
import BoardPresenter from './presenter/board.js';
import TripInfoPresenter from './presenter/trip-info.js';
import {createPoint} from './mock/point.js';
import {render, RenderPosition} from './utils/render.js';


const ITEMS_COUNT = 16;

const items = new Array(ITEMS_COUNT).fill().map(createPoint);

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderTripMainContainer = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteListContainer = siteMainElement.querySelector('.trip-events');
const boardPresenter = new BoardPresenter(siteListContainer, siteHeaderTripMainContainer);

render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteFiltersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);


boardPresenter.init(items);
