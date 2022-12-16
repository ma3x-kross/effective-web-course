import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        characters: 'characters',
        comics: 'comics',
        series: 'series',
        loadMore: 'Load more',
        provided: 'Data provided by ',
        charactersSearch: 'Search for characters by name',
        comicsSearch: 'Search for comics by title',
        seriesSearch: 'Search for series by title',
        notFound:
          "Page not found, perhaps it is the consequences of Thanos' snap",
        relatedComics: 'Related comics',
        relatedSeries: 'Related series',
        relatedCharacters: 'Related characters',
        favorites: 'favorites',
        emptyFavorites: "There's nothing here, yet("
      }
    },
    рус: {
      translation: {
        characters: 'персонажи',
        comics: 'комиксы',
        series: 'серии',
        loadMore: 'Загрузить еще',
        provided: 'Данные предоставлены ',
        charactersSearch: 'Поиск персонажей по имени',
        comicsSearch: 'Поиск комиксов по названию',
        seriesSearch: 'Поиск серий по названию',
        notFound:
          'Страница не найдена, возможно, это последствия щелчка Таноса',
        relatedComics: 'Связанные комиксы',
        relatedSeries: 'Связанные серии',
        relatedCharacters: 'Связанные персонажи',
        favorites: 'избранное',
        emptyFavorites: 'Здесь пока ничего нет('
      }
    }
  }
});
