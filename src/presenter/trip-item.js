import FormEditView from '../view/form-edit.js';
import TripItemView from '../view/trip-item.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Item {
  constructor(itemsListContainer) {
    this._itemsListContainer = itemsListContainer;

    this._tripItemViewComponent = null;
    this._formEditViewComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFormHide = this._handleFormHide.bind(this);
  }

  init(item, cities) {
    this._item = item;

    this._tripItemViewComponent = new TripItemView(item);
    this._formEditViewComponent = new FormEditView(item, cities);

    this._tripItemViewComponent.setEditClickHandler(this._handleEditClick);
    this._formEditViewComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formEditViewComponent.setFormHideClickHandler(this._handleFormHide);

    render(this._itemsListContainer, this._tripItemViewComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._formEditViewComponent, this._tripItemViewComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._tripItemViewComponent, this._formEditViewComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }

  _handleFormHide() {
    this._replaceFormToCard();
  }
}
