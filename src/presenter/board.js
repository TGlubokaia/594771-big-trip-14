import SortView from '../view/sort.js';
import TripsListView from '../view/trips-list.js';
import FormCreateView from '../view/form-create.js';
import NoTripItemsView from '../view/no-trip-items.js';
import {citiesNames} from '../mock/point.js';
import {render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import ItemPresenter from './trip-item.js';
import TripInfoPresenter from './trip-info.js';
import {SortType} from '../utils/common.js';
import {sortPrice, sortTime} from '../utils/trip.js';


export default class Board {
  constructor(boardContainer, tripInfoContainer) {
    this._boardContainer = boardContainer;
    this._tripInfoContainer = tripInfoContainer;

    this._sortViewComponent = new SortView();
    this._tripsListViewComponent = new TripsListView();
    this._formCreateViewComponent = new FormCreateView(citiesNames);
    this._noTripItemsViewComponent = new NoTripItemsView();
    this._allItemPresenters = {};
    this._currentSortType = SortType.DEFAULT;

    this._handleItemChange = this._handleItemChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardItems) {
    // Метод для инициализации (начала работы) модуля,
    this._boardItems = boardItems.slice();
    this._sourcedItems = boardItems.slice();
    this._renderBoard();
  }

  _handleItemChange(updatedItem) {
    this._boardItems = updateItem(this._boardItems, updatedItem);
    this._sourcedItems = updateItem(this._sourcedItems, updatedItem);
    this._allItemPresenters[updatedItem.id].init(updatedItem);
  }

  _sortItems(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._boardItems.sort(sortTime);
        break;
      case SortType.PRICE:
        this._boardItems.sort(sortPrice);
        break;
      case SortType.DISABLED:
        break;
      default:
        this._boardItems = this._sourcedItems.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortItems(sortType);
    this._clearItemsList();
    this._renderItemsList();
  }

  _renderSort() {
    render(this._boardContainer, this._sortViewComponent, RenderPosition.AFTERBEGIN);
    this._sortViewComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
  _renderTripInfo() {
    this._tripInfoPresenter = new TripInfoPresenter(this._tripInfoContainer);
    this._tripInfoPresenter.init();
  }

  _renderBoard() {
    if (this._boardItems.length === 0) {
      render(this._boardContainer, this._noTripItemsViewComponent, RenderPosition.BEFOREEND);
    } else {
      this._renderTripInfo();
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
