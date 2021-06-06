import SiteMenuView from './view/menu.js';
import FiltersView from './view/filter.js';
import TripInfoMainView from './view/header-trip-info-main.js';
import TripInfoView from './view/header-trip-info.js';
import PriceView from './view/header-trip-price.js';
import BoardPresenter from './presenter/board.js';
import {createPoint} from './mock/point.js';
import {render, RenderPosition} from './utils/render.js';


const ITEMS_COUNT = 17;

const items = new Array(ITEMS_COUNT).fill().map(createPoint);

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderTripMain = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteListContainer = siteMainElement.querySelector('.trip-events');
const boardPresenter = new BoardPresenter(siteListContainer);

render(siteHeaderTripMain, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);

const siteHeaderTripInfo = siteHeaderElement.querySelector('.trip-info');
render(siteHeaderTripInfo, new TripInfoMainView().getElement(), RenderPosition.AFTERBEGIN);
render(siteHeaderTripInfo, new PriceView().getElement(), RenderPosition.BEFOREEND);
render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteFiltersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

boardPresenter.init(items);
