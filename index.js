const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

/*Movie data container creator function */

function moviePreviewCreator(container, imgSrc, movieName, raiting) {
  const movieContainer = create("div");
  movieContainer.classList.add("movie-data-container");
  const movieImg = create("img");
  movieImg.classList.add("movie-img");
  const raitingDiv = create("div");
  raitingDiv.classList.add("raiting-number");
  const raitingP = create("p");

  movieImg.src = `https://image.tmdb.org/t/p/w300${imgSrc}`;
  movieImg.alt = movieName;
  raitingP.innerHTML = raiting;

  container.appendChild(movieContainer);
  movieContainer.appendChild(movieImg);
  movieContainer.appendChild(raitingDiv);
  raitingDiv.appendChild(raitingP);
}

/*Get trending movies - tv series */

async function getTrendingMedia(mediaType) {
  try {
    const { data } = await api(`trending/${mediaType}/day`);
    return data.results;
  } catch (error) {
    return "Ha ocurrido un error";
  }
}

/*Trending preview movies and series */
async function logTrendingPreview(mediaType) {
  try {
    if (mediaType === "movie") {
      const mainTrendingMoviesContainer = selector(
        ".main-trending-movies-container"
      );
      const movies = await getTrendingMedia(mediaType);
      movies.forEach((movie) => {
        /*movie poster*/
        const movieContainer = create("div");
        movieContainer.classList.add("movie-data-container");
        const movieImg = create("img");
        movieImg.classList.add("movie-img");
        movieImg.alt = `${movie.title}`;
        movieImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

        mainTrendingMoviesContainer.appendChild(movieContainer);
        movieContainer.appendChild(movieImg);

        /*movie raiting */
        const movieRaitingContainer = create("div");
        movieRaitingContainer.classList.add("raiting-number");
        const movieRaitingP = create("p");
        const movieRaiting = Number(movie.vote_average).toFixed(2);
        movieRaitingP.innerHTML = movieRaiting;

        movieContainer.appendChild(movieRaitingContainer);
        movieRaitingContainer.appendChild(movieRaitingP);
      });
    } else if (mediaType === "tv") {
      const mainTrendingSeriesContainer = selector(
        ".main-trending-series-container"
      );
      const series = await getTrendingMedia(mediaType);
      series.forEach((serie) => {
        /*movie poster*/
        const serieContainer = create("div");
        serieContainer.classList.add("movie-data-container");
        const serieImg = create("img");
        serieImg.classList.add("movie-img");
        serieImg.alt = `${serie.title}`;
        serieImg.src = `https://image.tmdb.org/t/p/w300${serie.poster_path}`;

        mainTrendingSeriesContainer.appendChild(serieContainer);
        serieContainer.appendChild(serieImg);

        /*movie raiting */
        const serieRaitingContainer = create("div");
        serieRaitingContainer.classList.add("raiting-number");
        const serieRaitingP = create("p");
        const serieRaiting = Number(serie.vote_average).toFixed(2);
        serieRaitingP.innerHTML = serieRaiting;

        serieContainer.appendChild(serieRaitingContainer);
        serieRaitingContainer.appendChild(serieRaitingP);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

/*Home Recomended movie */

async function getRecomendedMovie(section) {
  const actualYear = new Date().getFullYear();
  try {
    const { data } = await api("/discover/movie", {
      params: {
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: true,
        primary_release_year: actualYear,
        "vote_average.gte": 9,
        with_original_language: "en",
        without_genres: [10751, 10402, 10770, 37, 10752],
      },
    });
    const movies = data.results;
    const movieAmount = movies.length;
    const choosenMovie = movies[Math.floor(Math.random() * movieAmount)];
    const viewWidth = window.screen.width;
    console.log(movies);
    /*popular-movie-poster*/
    let mainPopularContainer;
    if (section === "main") {
      mainPopularContainer = selector(".main-most-popular");
    } else if (section === "movies") {
      mainPopularContainer = selector(".movies-most-popular");
    }
    const popularMovieContainer = create("div");
    popularMovieContainer.classList.add("most-popular-container");
    const movieImg = create("img");
    movieImg.alt = choosenMovie.title;
    if (viewWidth <= 500) {
      if (choosenMovie.backdrop_path !== null) {
        movieImg.src = `https://image.tmdb.org/t/p/w780${choosenMovie.backdrop_path}`;
      } else {
        movieImg.src = `https://image.tmdb.org/t/p/w780${choosenMovie.poster_path}`;
        movieImg.style.top = "-50%";
      }
    } else {
      if (choosenMovie.backdrop_path !== null) {
        movieImg.src = `https://image.tmdb.org/t/p/w1280${choosenMovie.backdrop_path}`;
      } else {
        movieImg.src = `https://image.tmdb.org/t/p/w1280${choosenMovie.poster_path}`;
      }
    }
    const movieDetailContainer = create("div");
    movieDetailContainer.classList.add("most-popular-txt");
    const movieTitle = create("h3");
    const movieDescription = create("p");

    movieTitle.innerHTML = choosenMovie.title;
    movieDescription.innerHTML = choosenMovie.overview;

    mainPopularContainer.appendChild(popularMovieContainer);
    popularMovieContainer.appendChild(movieImg);
    popularMovieContainer.appendChild(movieDetailContainer);
    movieDetailContainer.appendChild(movieTitle);
    movieDetailContainer.appendChild(movieDescription);

    /*movie raiting */
    const movieRaitingContainer = create("div");
    movieRaitingContainer.classList.add("most-popular-raiting-number");
    const movieRaitingP = create("p");
    const movieRaiting = Number(choosenMovie.vote_average).toFixed(2);
    movieRaitingP.innerHTML = movieRaiting;

    popularMovieContainer.appendChild(movieRaitingContainer);
    movieRaitingContainer.appendChild(movieRaitingP);
  } catch (error) {
    /*HACER ALGO CON EL ERROR DE QUE NO CARGUE LA DATA QUE CORRESPONDE!!! */
    console.log(error);
  }
}

/*Recomended Serie*/

async function getRecomendedTv() {
  try {
    const { data } = await api("/tv/popular");
    const popularTvShows = data.results;
    tvPopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${popularTvShows[0].backdrop_path})`;
    tvPopularTitle.innerHTML = popularTvShows[0].name;
    tvPopularRaiting.innerHTML = popularTvShows[0].vote_average;
    let counter = 1;
    console.log(popularTvShows);
    let interval = setInterval(() => {
      tvPopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${popularTvShows[counter].backdrop_path})`;
      tvPopularTitle.innerHTML = popularTvShows[counter].name;
      tvPopularRaiting.innerHTML = popularTvShows[counter].vote_average;
      if (counter < popularTvShows.length - 1) {
        counter++;
      } else {
        counter = 0;
      }
    }, 6000);

    /*Tv most popular arrow functions */

    tvLeftArrow.addEventListener("click", moveLeftManually);
    tvRigthArrow.addEventListener("click", moveRigthManually);

    function moveLeftManually() {
      clearInterval(interval);
      if (counter > 1) {
        counter--;
        tvPopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${
          popularTvShows[counter - 1].backdrop_path
        })`;
        tvPopularTitle.innerHTML = popularTvShows[counter - 1].name;
        tvPopularRaiting.innerHTML = popularTvShows[counter - 1].vote_average;
      } else {
        tvPopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${popularTvShows[0].backdrop_path})`;
        tvPopularTitle.innerHTML = popularTvShows[0].name;
        tvPopularRaiting.innerHTML = popularTvShows[0].vote_average;
      }
    }

    function moveRigthManually() {
      clearInterval(interval);
      if (counter < popularTvShows.length) {
        counter++;
        tvPopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${
          popularTvShows[counter - 1].backdrop_path
        })`;
        tvPopularTitle.innerHTML = popularTvShows[counter - 1].name;
        tvPopularRaiting.innerHTML = popularTvShows[counter - 1].vote_average;
      } else {
        tvPopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${
          popularTvShows[popularTvShows.length - 1].backdrop_path
        })`;
        tvPopularTitle.innerHTML =
          popularTvShows[popularTvShows.length - 1].name;
        tvPopularRaiting.innerHTML =
          popularTvShows[popularTvShows.length - 1].vote_average;
      }
    }

    window.addEventListener("hashchange", stopInterval, false);

    function stopInterval() {
      let hash = location.hash;

      if (hash !== "#tv") {
        clearInterval(interval);
      }
    }
  } catch (error) {}
}

/*Recomended Movie*/

async function getRecomendedMovie1() {
  try {
    const { data } = await api("/movie/popular");
    const popularMovies = data.results;
    moviePopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${popularMovies[0].backdrop_path})`;
    moviePopularTitle.innerHTML = popularMovies[0].title;
    moviePopularRaiting.innerHTML = popularMovies[0].vote_average;
    let counter = 1;
    let interval = setInterval(() => {
      moviePopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${popularMovies[counter].backdrop_path})`;
      moviePopularTitle.innerHTML = popularMovies[counter].title;
      moviePopularRaiting.innerHTML = popularMovies[counter].vote_average;
      if (counter < popularMovies.length - 1) {
        counter++;
      } else {
        counter = 0;
      }
    }, 6000);

    /*Movie most popular arrow functions */

    movieLeftArrow.addEventListener("click", moveLeftManually);
    movieRigthArrow.addEventListener("click", moveRigthManually);

    function moveLeftManually() {
      clearInterval(interval);
      if (counter > 1) {
        counter--;
        moviePopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${
          popularMovies[counter - 1].backdrop_path
        })`;
        moviePopularTitle.innerHTML = popularMovies[counter - 1].title;
        moviePopularRaiting.innerHTML = popularMovies[counter - 1].vote_average;
      } else {
        moviePopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${popularMovies[0].backdrop_path})`;
        moviePopularTitle.innerHTML = popularMovies[0].title;
        moviePopularRaiting.innerHTML = popularMovies[0].vote_average;
      }
    }

    function moveRigthManually() {
      clearInterval(interval);
      if (counter < popularMovies.length) {
        counter++;
        moviePopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${
          popularMovies[counter - 1].backdrop_path
        })`;
        moviePopularTitle.innerHTML = popularMovies[counter - 1].title;
        moviePopularRaiting.innerHTML = popularMovies[counter - 1].vote_average;
      } else {
        moviePopularArticle.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${
          popularMovies[popularMovies.length - 1].backdrop_path
        })`;
        moviePopularTitle.innerHTML =
          popularMovies[popularMovies.length - 1].title;
        moviePopularRaiting.innerHTML =
          popularMovies[popularMovies.length - 1].vote_average;
      }
    }

    window.addEventListener("hashchange", stopInterval, false);

    function stopInterval() {
      let hash = location.hash;

      if (hash !== "#movies") {
        clearInterval(interval);
      }
    }
  } catch (error) {}
}

/*Get the list of movie and serie genres*/

let genreList = {};
async function getGenres() {
  async function getLists(mediaType) {
    try {
      const { data } = await api(`/genre/${mediaType}/list`);
      return data.genres;
    } catch (error) {
      return "Ha ocurrido un error";
    }
  }
  let tvGenres = await getLists("tv");
  let movieGenres = await getLists("movie");

  return (genreList = { tv: tvGenres, movie: movieGenres });
}

/*Main random movie and serie category */

async function loadRandomCategories() {
  const randomMovieArticle = selector(".movie-category");
  const randomTvArticle = selector(".serie-category");
  try {
    genreList = await getGenres();

    /*Tv */
    const randomTvCategory =
      genreList.tv[Math.floor(Math.random() * genreList.tv.length)];
    randomTvArticle.innerHTML = randomTvCategory.name;
    const { data } = await api("/discover/tv", {
      params: {
        include_adult: false,
        with_genres: randomTvCategory.id,
      },
    });

    const randomTvList = data.results;
    const randomTvContainer = selector(".random-tv-container");

    randomTvList.forEach((tvSerie) => {
      const tvContainer = create("div");
      tvContainer.classList.add("movie-data-container");
      const tvImg = create("img");
      tvImg.classList.add("movie-img");
      const raitingDiv = create("div");
      raitingDiv.classList.add("raiting-number");
      const raitingP = create("p");

      tvImg.src = `https://image.tmdb.org/t/p/w300${tvSerie.poster_path}`;
      tvImg.alt = tvSerie.name;
      raitingP.innerHTML = tvSerie.vote_average;

      randomTvContainer.appendChild(tvContainer);
      tvContainer.appendChild(tvImg);
      tvContainer.appendChild(raitingDiv);
      raitingDiv.appendChild(raitingP);
    });

    /*Movies */
    const randomMovieCategory =
      genreList.movie[Math.floor(Math.random() * genreList.movie.length)];
    randomMovieArticle.innerHTML = randomMovieCategory.name;
    const res = await api("/discover/movie", {
      params: {
        include_adult: false,
        with_genres: randomMovieCategory.id,
      },
    });

    const randomMovieList = res.data.results;
    const randomMovieContainer = selector(".random-movie-container");

    randomMovieList.forEach((movie) => {
      const movieContainer = create("div");
      movieContainer.classList.add("movie-data-container");
      const movieImg = create("img");
      movieImg.classList.add("movie-img");
      const raitingDiv = create("div");
      raitingDiv.classList.add("raiting-number");
      const raitingP = create("p");

      movieImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
      movieImg.alt = movie.name;
      raitingP.innerHTML = movie.vote_average;

      randomMovieContainer.appendChild(movieContainer);
      movieContainer.appendChild(movieImg);
      movieContainer.appendChild(raitingDiv);
      raitingDiv.appendChild(raitingP);
    });
  } catch (error) {
    console.log(error);
  }
}

/*Log trending movies in Movies Section*/
async function logTrending(mediaType) {
  try {
    if (mediaType === "movie") {
      const TrendingMoviesContainer = selector(
        ".movies-trending-movies-container"
      );
      const movies = await getTrendingMedia(mediaType);
      movies.forEach((movie) => {
        /*movie poster*/
        const movieContainer = create("div");
        movieContainer.classList.add("movie-data-container");
        const movieImg = create("img");
        movieImg.classList.add("movie-img");
        movieImg.alt = `${movie.title}`;
        movieImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

        TrendingMoviesContainer.appendChild(movieContainer);
        movieContainer.appendChild(movieImg);

        /*movie raiting */
        const movieRaitingContainer = create("div");
        movieRaitingContainer.classList.add("raiting-number");
        const movieRaitingP = create("p");
        const movieRaiting = Number(movie.vote_average).toFixed(2);
        movieRaitingP.innerHTML = movieRaiting;

        movieContainer.appendChild(movieRaitingContainer);
        movieRaitingContainer.appendChild(movieRaitingP);
      });
    } else if (mediaType === "tv") {
      const TrendingSeriesContainer = selector(".tv-trending-series-container");
      const series = await getTrendingMedia(mediaType);
      series.forEach((serie) => {
        /*series poster*/
        const serieContainer = create("div");
        serieContainer.classList.add("movie-data-container");
        const serieImg = create("img");
        serieImg.classList.add("movie-img");
        serieImg.alt = `${serie.title}`;
        serieImg.src = `https://image.tmdb.org/t/p/w300${serie.poster_path}`;

        TrendingSeriesContainer.appendChild(serieContainer);
        serieContainer.appendChild(serieImg);

        /*series raiting */
        const serieRaitingContainer = create("div");
        serieRaitingContainer.classList.add("raiting-number");
        const serieRaitingP = create("p");
        const serieRaiting = Number(serie.vote_average).toFixed(2);
        serieRaitingP.innerHTML = serieRaiting;

        serieContainer.appendChild(serieRaitingContainer);
        serieRaitingContainer.appendChild(serieRaitingP);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

/*Log movie and tv categories*/
async function logCategories(mediaType) {
  /*Categories selection*/
  async function selectCategories(mediaType) {
    try {
      genreList = await getGenres();
      let categories;
      if (mediaType === "movie") {
        categories = genreList.movie;
      } else if (mediaType === "tv") {
        categories = genreList.tv;
      }
      console.log(mediaType, categories);
      return categories;
    } catch (error) {
      return "Categories not found";
    }
  }

  if (mediaType === "movie") {
    movieCategories = await selectCategories("movie");
    movieCategories.forEach((category) => {
      const categoryName = category.name;
      const categoryBanner = create("div");
      categoryBanner.classList.add("category-banner");
      categoryBanner.classList.add(`c${category.id}`);
      const categoryP = create("p");
      categoryP.classList.add("category-name");
      categoryP.innerHTML = categoryName;

      moviesCategoriesContainer.appendChild(categoryBanner);
      categoryBanner.appendChild(categoryP);

      categoryBanner.addEventListener("click", () => {
        location.hash = `#categories=${category.id}_${category.name}_movie`;
      });
    });
  } else if (mediaType === "tv") {
    tvCategories = await selectCategories("tv");
    tvCategories.forEach((category) => {
      const categoryName = category.name;
      const categoryBanner = create("div");
      categoryBanner.classList.add("category-banner");
      categoryBanner.classList.add(`c${category.id}`);
      const categoryP = create("p");
      categoryP.classList.add("category-name");
      categoryP.innerHTML = categoryName;

      tvCategoriesContainer.appendChild(categoryBanner);
      categoryBanner.appendChild(categoryP);
      categoryBanner.addEventListener("click", () => {
        location.hash = `#categories=${category.id}_${category.name}_tv`;
      });
    });
  }
}

/*Load categories selection */

async function loadCategory(id, categoryName, mediaType) {
  const newCategoryName = categoryName.replace("%20", " ");
  categorySelected.innerHTML = newCategoryName;
  try {
    if (mediaType === "movie") {
      const { data } = await api("/discover/movie", {
        params: {
          include_adult: false,
          with_genres: id,
        },
      });
      const movieList = data.results;
      console.log("movieList", movieList);

      /*Load movies*/
      movieList.forEach((movie) => {
        const movieDataContainer = create("div");
        movieDataContainer.classList.add("movie-data-container");
        const movieImg = create("img");
        movieImg.classList.add("movie-img");
        movieImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
        movieImg.alt = movie.title;
        const raitingDiv = create("div");
        raitingDiv.classList.add("raiting-number");
        const raitingP = create("p");
        raitingP.innerHTML = movie.vote_average;

        categoryContainer.appendChild(movieDataContainer);
        movieDataContainer.appendChild(movieImg);
        movieDataContainer.appendChild(raitingDiv);
        raitingDiv.appendChild(raitingP);
      });
    } else if (mediaType === "tv") {
      const { data } = await api("/discover/tv", {
        params: {
          include_adult: false,
          with_genres: id,
        },
      });
      const tvShowsList = data.results;
      console.log("TVList", tvShowsList);

      /*Load tv Shows*/
      tvShowsList.forEach((tvShow) => {
        const showDataContainer = create("div");
        showDataContainer.classList.add("movie-data-container");
        const showImg = create("img");
        showImg.classList.add("movie-img");
        showImg.src = `https://image.tmdb.org/t/p/w300${tvShow.poster_path}`;
        showImg.alt = tvShow.name;
        const raitingDiv = create("div");
        raitingDiv.classList.add("raiting-number");
        const raitingP = create("p");
        raitingP.innerHTML = tvShow.vote_average;

        categoryContainer.appendChild(showDataContainer);
        showDataContainer.appendChild(showImg);
        showDataContainer.appendChild(raitingDiv);
        raitingDiv.appendChild(raitingP);
      });
    }
  } catch (error) {}
}

/*Search Section */

async function searchResults(query) {
  try {
    const movieRes = await api("/search/movie", {
      params: {
        include_adult: false,
        query,
      },
    });
    const tvRes = await api("/search/tv", {
      params: {
        include_adult: false,
        query,
      },
    });
    const movieResults = movieRes.data.results.filter(
      (movie) => movie.poster_path
    );
    const tvResults = tvRes.data.results.filter((show) => show.poster_path);

    movieResults.forEach((movie) => {
      moviePreviewCreator(
        searchMoviesResultsContainer,
        movie.poster_path,
        movie.title,
        movie.vote_average
      );
    });

    tvResults.forEach((show) => {
      moviePreviewCreator(
        searchTvResultsContainer,
        show.poster_path,
        show.name,
        show.vote_average
      );
    });

    console.log(query, movieResults, tvResults);
  } catch (error) {}
}
