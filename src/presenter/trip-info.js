import TripInfoView from '../view/header-trip-info.js';
import TripInfoMainView from '../view/header-trip-info-main.js';
import TripInfoPriceView from '../view/header-trip-price.js';
import {render, RenderPosition} from '../utils/render.js';


export default class Info {
  constructor(tripInfoContainer) {
    this._tripInfoContainer = tripInfoContainer;
    // this._changeData = changeData;

    this._tripInfoViewComponent = new TripInfoView();
    this._tripInfoMainViewComponent = new TripInfoMainView();
    this._tripInfoPriceViewComponent = new TripInfoPriceView();
  }

  init() {
    this._renderTripInfoBoard();
  }

  _renderTripInfoContainer() {
    render(this._tripInfoContainer, this._tripInfoViewComponent, RenderPosition.AFTERBEGIN)
  }

  _renderTripInfoMain() {
    render(this._tripInfoViewComponent, this._tripInfoMainViewComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripInfoPrice() {
    render(this._tripInfoViewComponent, this._tripInfoPriceViewComponent, RenderPosition.BEFOREEND);

  }

  _renderTripInfoBoard() {
    this._renderTripInfoContainer();
    this._renderTripInfoMain();
    this._renderTripInfoPrice();


  }
}
