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
const moviePopularArticle = selector(".movies-most-popular");
const moviesCategoriesArticle = selector(".movies-categories");
const moviesCategoriesContainer = selector(".movies-categories-container");
const moviePopularTitle = selector(".carrousel-movie-title");
const movieLeftArrow = selector("#movie-left-arrow");
const movieRigthArrow = selector("#movie-rigth-arrow");
const moviePopularRaiting = selector("#carrousel-movie-raiting");

/*Section-Tv*/
const tvSection = selector("#series");
const tvTrendingMovArticle = selector(".tv-trending-series");
const tvPopularArticle = selector(".tv-most-popular");
const tvCategoriesArticle = selector(".tv-categories");
const tvCategoriesContainer = selector(".tv-categories-container");
const tvPopularTitle = selector(".popular-tv-title");
const tvLeftArrow = selector("#left-arrow");
const tvRigthArrow = selector("#rigth-arrow");
const tvPopularRaiting = selector("#popular-tv-raiting");

/*Section-Search*/
const searchSection = selector("#search");
const searchBack = selector("#search-back");
const searchInput2 = selector("#search-input2");
const searchBtn2 = selector("#search-button2");
const searchMoviesResultsContainer = selector(
  ".movie-search-results-container"
);
const searchTvResultsContainer = selector(".tv-search-results-container");
const moviesResultTitle = selector(".h3-movie-results");
const tvResultTitle = selector(".h3-tv-results");

/*Section-Movie-Detail*/
const movieDetailSection = selector("#movie-detail");
const backImg = selector(".decoration1");
const frontImg = selector(".detail-img");
const detailBackBtn = selector("#detail-back-btn");
const spanRating = selector("#raiting");
const spanTime = selector("#time");
const spanRelesed = selector("#released");
const detailTitle = selector("#detail-title");
const detailOverview = selector("#detail-overview");
const companyBtn = selector("#logo-btn");
const logoImg = selector("#logo-img");
const detailCategories = selector(".detail-categories-container");
const spanMediaType = selector(".mediaType");
const similarMoviesContainer = selector("#similar-results");

/*Section - Categories */
const categoriesSection = selector("#categories");
const categorySelected = selector(".cat-name");
const categoryContainer = selector(".cat-container");
