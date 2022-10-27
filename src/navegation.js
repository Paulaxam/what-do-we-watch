/*Mobile menu function */

mobileMenuIcon.addEventListener("click", toggleMobileMenu);

function toggleMobileMenu() {
  menuList.classList.toggle("toggle-menu");
}

window.addEventListener("load", navegator, false);
window.addEventListener("hashchange", navegator, false);
menuHome.addEventListener("click", () => {
  location.hash = "";
  menuList.classList.remove("toggle-menu");
});
menuMovies.addEventListener("click", () => {
  location.hash = "#movies";
  menuList.classList.remove("toggle-menu");
});
menuTv.addEventListener("click", () => {
  location.hash = "#tv";
  menuList.classList.remove("toggle-menu");
});
menuCategories.addEventListener("click", () => {
  location.hash = "#categories";
  menuList.classList.remove("toggle-menu");
});
menuSearch.addEventListener("click", () => {
  location.hash = "#search";
  menuList.classList.remove("toggle-menu");
});

function navegator() {
  let hash = location.hash;

  if (hash.startsWith("#movies")) {
    moviesPage();
  } else if (hash.startsWith("#tv")) {
    tvPage();
  } else if (hash.startsWith("#search")) {
    searchPage();
  } else if (hash.startsWith("#movie_detail")) {
    movieDetailPage();
  } else {
    homePage();
  }
}

function homePage() {
  mainSection.classList.remove("inactive");
  moviesSection.classList.add("inactive");
  tvSection.classList.add("inactive");
  searchSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");
  logTrendingPreview("movie");
  logTrendingPreview("tv");
  mainPopularArticle.innerHTML = "";
  getRecomendedMovie("main");
  loadRandomCategories();
}

function moviesPage() {
  mainSection.classList.add("inactive");
  moviesSection.classList.remove("inactive");
  tvSection.classList.add("inactive");
  searchSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");
  logTrending("movie");
  moviesPopularArticle.innerHTML = "";
  moviesCategoriesContainer.innerHTML = "";
  logCategories("movie");
  getRecomendedMovie("movies");
}

function tvPage() {
  mainSection.classList.add("inactive");
  moviesSection.classList.add("inactive");
  tvSection.classList.remove("inactive");
  searchSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");
  logTrending("tv");
  tvPopularArticle.innerHTML = "";
  tvCategoriesContainer.innerHTML = "";
  logCategories("tv");
  getRecomendedMovie("tv");
}

function categoriesPage() {}

function categoriesPlusPage() {}

function searchPage() {}

function movieDetailPage() {}
