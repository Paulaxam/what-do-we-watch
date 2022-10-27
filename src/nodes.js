function selector(query) {
  return document.querySelector(query);
}

function create(element) {
  return document.createElement(element);
}

/*Nav*/
const menuList = selector(".menu-list");
const mobileMenuIcon = selector(".mobile-menu");
const menuHome = selector("#menu-home");
const menuTv = selector("#menu-tv");
const menuMovies = selector("#menu-movies");
const menuCategories = selector("#menu-categories");
const menuSearch = selector("#menu-search");
const searchBar = selector("#search-bar");
const searchInput = selector("#search-input");
const searchBtn = selector("#search-button");

/*MAIN*/

/*Section-main*/
const mainSection = selector("#main");
const wellcomeArticle = selector(".wellcome");
const mainTrendingMovArticle = selector(".main-trending-movies");
const mainTrendingTvArticle = selector(".main-trending-series");
const mainPopularArticle = selector(".main-most-popular");
const mainRandomMovArticle = selector(".random-category-1");
const mainRandomTvArticle = selector(".random-category-2");

/*Section-movies*/
const moviesSection = selector("#movies");
const moviesTrendingMovArticle = selector(".movies-trending-movies");
const moviesPopularArticle = selector(".movies-most-popular");
const moviesCategoriesArticle = selector(".movies-categories");
const moviesCategoriesContainer = selector(".movies-categories-container");

/*Section-Tv*/
const tvSection = selector("#series");
const tvTrendingMovArticle = selector(".tv-trending-series");
const tvPopularArticle = selector(".tv-most-popular");
const tvCategoriesArticle = selector(".tv-categories");
const tvCategoriesContainer = selector(".tv-categories-container");

/*Section-Search*/
const searchSection = selector("#search");

/*Section-Movie-Detail*/
const movieDetailSection = selector("#movie--detail");
