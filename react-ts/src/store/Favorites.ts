import { makeAutoObservable } from "mobx";
import { CardProps } from "types/CardProps";
import { getLocalStorage, setLocalStorage } from "utils/localStorage";

class Favorites {
  constructor() {
    makeAutoObservable(this);
  }

  favorites: CardProps[] = getLocalStorage('store');

  addToFavorites( item : CardProps) {
	this.favorites = [...this.favorites, item];
  setLocalStorage('store', this.favorites)
  }

  isFavorite(id:number){
	return this.favorites.some(el=>el.id===id)
  }

  removeFromFavorites(id:number) {
	this.favorites = this.favorites.filter(el=>el.id!==id)
  setLocalStorage('store', this.favorites);
  }
}

export default new Favorites()