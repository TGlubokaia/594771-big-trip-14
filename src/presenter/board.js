import SortView from '../view/sort.js';
import TripsListView from '../view/trips-list.js';
import FormCreateView from '../view/form-create.js';
import NoTripItemsView from '../view/no-trip-items.js';
import {citiesNames} from '../mock/point.js';
import {render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import ItemPresenter from './trip-item.js'


export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._sortViewComponent = new SortView();
    this._tripsListViewComponent = new TripsListView();
    this._formCreateViewComponent = new FormCreateView(citiesNames);
    this._noTripItemsViewComponent = new NoTripItemsView();
    this._allItemPresenters = {};

    this._handleItemChange = this._handleItemChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(boardItems) {
    // Метод для инициализации (начала работы) модуля,
    this._boardItems = boardItems.slice();
    this._renderBoard();
  }

  _handleItemChange(updatedItem) {
    this._boardItems = updateItem(this._boardItems, updatedItem);
    this._allItemPresenters[updatedItem.id].init(updatedItem);
  }


  _renderSort() {
    render(this._boardContainer, this._sortViewComponent, RenderPosition.AFTERBEGIN);
  }

  _renderListContainer() {
    render(this._boardContainer, this._tripsListViewComponent, RenderPosition.BEFOREEND);
  }

  _renderItem(item, cities) {
    const itemPresenter = new ItemPresenter(this._tripsListViewComponent, this._handleItemChange, this._handleModeChange);
    itemPresenter.init(item, cities);
    this._allItemPresenters[item.id] = itemPresenter;

  }

  _renderItems() {
    // Метод для рендеринга N-задач
    this._boardItems
    .forEach((boardItem) => this._renderItem(boardItem, citiesNames));
  }

  _renderNoItems() {
    render(this._boardContainer, this._noTripItemsViewComponent, RenderPosition.BEFOREEND);
  }

  _clearItemsList() {
    Object
      .values(this._allItemPresenters)
      .forEach((presenter) => presenter.destroy());
    this._allItemPresenters = {};
  }

  _renderItemsList() {
    this._renderItems();

  }

  _renderBoard() {
    if (this._boardItems.length === 0) {
      render(this._boardContainer, this._noTripItemsViewComponent, RenderPosition.BEFOREEND);
    } else {
      this._renderSort();
      this._renderListContainer();

      render(this._tripsListViewComponent, this._formCreateViewComponent, RenderPosition.AFTERBEGIN); // форма создания точки маршрута (позже удалить)
      this._renderItemsList();
    }
  }

  _handleModeChange() {
    Object
      .values(this._allItemPresenters)
      .forEach((presenter) => presenter.resetView());
  }

}
