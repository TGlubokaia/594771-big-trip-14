import FormEditView from '../view/form-edit.js';
import TripItemView from '../view/trip-item.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Item {
  constructor(itemsListContainer, changeData, changeMode) {
    this._tripItemsListContainer = itemsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripItemViewComponent = null;
    this._formEditViewComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFormHide = this._handleFormHide.bind(this);
  }

  init(item) {
    this._item = item;

    const prevTripItemViewComponent = this._tripItemViewComponent;
    const prevItemEditViewComponent = this._formEditViewComponent;


    this._tripItemViewComponent = new TripItemView(item);
    this._formEditViewComponent = new FormEditView(item);

    this._tripItemViewComponent.setEditClickHandler(this._handleEditClick);
    this._tripItemViewComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._formEditViewComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formEditViewComponent.setFormHideClickHandler(this._handleFormHide);

    if (prevTripItemViewComponent === null || prevItemEditViewComponent === null) {
      render(this._tripItemsListContainer, this._tripItemViewComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripItemViewComponent, prevTripItemViewComponent)
    }

    if (this._mode === Mode.EDITING) {
      replace(this._formEditViewComponent, prevItemEditViewComponent);
    }

    remove(prevTripItemViewComponent);
    remove(prevItemEditViewComponent);
  }

  destroy() {
    remove(this._tripItemViewComponent);
    remove(this._formEditViewComponent);

  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._formEditViewComponent, this._tripItemViewComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripItemViewComponent, this._formEditViewComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._item,
        {
          isFavorite: !this._item.isFavorite,
        },
      ),
    );
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(item) {
    this._changeData(item);
    this._replaceFormToCard();
  }

  _handleFormHide() {
    this._replaceFormToCard();
  }
}
