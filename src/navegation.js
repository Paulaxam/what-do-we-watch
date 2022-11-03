/*Mobile menu function */

mobileMenuIcon.addEventListener("click", toggleMobileMenu);

function toggleMobileMenu() {
  menuList.classList.toggle("toggle-menu");
}

window.addEventListener("load", navegator, false);
window.addEventListener("hashchange", navegator, false);

detailBackBtn.addEventListener("click", () => {
  window.history.back();
  menuList.classList.remove("toggle-menu");
});

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
menuSearch.addEventListener("click", () => {
  location.hash = "#search";
  menuList.classList.remove("toggle-menu");
});
searchBtn.addEventListener("click", () => {
  menuList.classList.remove("toggle-menu");
  const search = searchInput.value;
  if (search === "") {
    location.hash = "#search";
  } else {
    location.hash = `#search=${search}`;
    searchInput2.value = search;
  }
});

searchBtn2.addEventListener("click", () => {
  const search = searchInput2.value;
  location.hash = `#search=${search}`;
});

searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    const search = searchInput.value;
    if (search === "") {
      location.hash = "#search";
    } else {
      location.hash = `#search=${search}`;
      searchInput2.value = search;
    }
  }
});

searchInput2.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    const search = searchInput2.value;
    location.hash = `#search=${search}`;
  }
});

searchBack.addEventListener("click", () => {
  location.hash = "";
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
  } else if (hash.startsWith("#categories")) {
    categoriesPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function homePage() {
  mainSection.classList.remove("inactive");
  moviesSection.classList.add("inactive");
  tvSection.classList.add("inactive");
  searchSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");
  categoriesSection.classList.add("inactive");
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
  categoriesSection.classList.add("inactive");
  logTrending("movie");
  moviesCategoriesContainer.innerHTML = "";
  getRecomendedMovie1();
  logCategories("movie");
}

function tvPage() {
  mainSection.classList.add("inactive");
  moviesSection.classList.add("inactive");
  tvSection.classList.remove("inactive");
  searchSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");
  categoriesSection.classList.add("inactive");
  logTrending("tv");
  tvCategoriesContainer.innerHTML = "";
  logCategories("tv");
  getRecomendedTv();
}

function categoriesPage() {
  mainSection.classList.add("inactive");
  moviesSection.classList.add("inactive");
  tvSection.classList.add("inactive");
  searchSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");
  categoriesSection.classList.remove("inactive");
  categoryContainer.innerHTML = "";
  const [id, categoryName, mediaType] = location.hash.split("=")[1].split("_");
  loadCategory(id, categoryName, mediaType);
}

function searchPage() {
  mainSection.classList.add("inactive");
  moviesSection.classList.add("inactive");
  tvSection.classList.add("inactive");
  searchSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  categoriesSection.classList.add("inactive");
  moviesResultTitle.classList.add("inactive");
  tvResultTitle.classList.add("inactive");
  searchMoviesResultsContainer.innerHTML = "";
  searchTvResultsContainer.innerHTML = "";
  const query = location.hash.split("=")[1];
  if (query) {
    searchResults(query);
    moviesResultTitle.classList.remove("inactive");
    tvResultTitle.classList.remove("inactive");
  }
}

function movieDetailPage() {
  mainSection.classList.add("inactive");
  moviesSection.classList.add("inactive");
  tvSection.classList.add("inactive");
  searchSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");
  categoriesSection.classList.add("inactive");
  openDetailedView();
}
