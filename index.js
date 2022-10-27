const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

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

/*Recomended movie */

async function getRecomendedMovie(section) {
  const actualYear = new Date().getFullYear();
  try {
    const { data } = await api("/discover/movie", {
      params: {
        sort_by: "popularity.desc",
        include_adult: false,
        primary_release_year: actualYear,
        "vote_average.gte": 9,
      },
    });
    const movies = data.results;
    const movieAmount = movies.length;
    const choosenMovie = movies[Math.floor(Math.random() * movieAmount)];
    const viewWidth = window.screen.width;

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
    if (viewWidth <= 400) {
      movieImg.src = `https://image.tmdb.org/t/p/w300${choosenMovie.poster_path}`;
    } else if (viewWidth <= 600) {
      movieImg.src = `https://image.tmdb.org/t/p/w780${choosenMovie.poster_path}`;
    } else {
      movieImg.src = `https://image.tmdb.org/t/p/w1280${choosenMovie.poster_path}`;
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
    });
  }
}

logCategories("tv");
