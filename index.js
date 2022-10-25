const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

/*Trending preview movies and series */
async function getTrendingPreview(mediaType) {
  try {
    const { data } = await api(`trending/${mediaType}/day`);

    if (mediaType === "movie") {
      const mainTrendingMoviesContainer = document.querySelector(
        ".main-trending-movies-container"
      );
      const movies = data.results;
      movies.forEach((movie) => {
        /*movie poster*/
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-data-container");
        const movieImg = document.createElement("img");
        movieImg.classList.add("movie-img");
        movieImg.alt = `${movie.title}`;
        movieImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

        mainTrendingMoviesContainer.appendChild(movieContainer);
        movieContainer.appendChild(movieImg);

        /*movie raiting */
        const movieRaitingContainer = document.createElement("div");
        movieRaitingContainer.classList.add("raiting-number");
        const movieRaitingP = document.createElement("p");
        const movieRaiting = Number(movie.vote_average).toFixed(2);
        movieRaitingP.innerHTML = movieRaiting;

        movieContainer.appendChild(movieRaitingContainer);
        movieRaitingContainer.appendChild(movieRaitingP);
      });
    } else if (mediaType === "tv") {
      const mainTrendingSeriesContainer = document.querySelector(
        ".main-trending-series-container"
      );
      const series = data.results;
      series.forEach((serie) => {
        /*movie poster*/
        const serieContainer = document.createElement("div");
        serieContainer.classList.add("movie-data-container");
        const serieImg = document.createElement("img");
        serieImg.classList.add("movie-img");
        serieImg.alt = `${serie.title}`;
        serieImg.src = `https://image.tmdb.org/t/p/w300${serie.poster_path}`;

        mainTrendingSeriesContainer.appendChild(serieContainer);
        serieContainer.appendChild(serieImg);

        /*movie raiting */
        const serieRaitingContainer = document.createElement("div");
        serieRaitingContainer.classList.add("raiting-number");
        const serieRaitingP = document.createElement("p");
        const serieRaiting = Number(serie.vote_average).toFixed(2);
        serieRaitingP.innerHTML = serieRaiting;

        serieContainer.appendChild(serieRaitingContainer);
        serieRaitingContainer.appendChild(serieRaitingP);
      });
    }

    console.log(data.results);
  } catch (error) {
    console.log(error);
  }
}

getTrendingPreview("movie");
getTrendingPreview("tv");

/*Recomended movie */

async function getRecomendedMovie() {
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
    const mainPopularContainer = document.querySelector(".main-most-popular");
    const popularMovieContainer = document.createElement("div");
    popularMovieContainer.classList.add("most-popular-container");
    const movieImg = document.createElement("img");
    movieImg.alt = choosenMovie.title;
    if (viewWidth <= 400) {
      movieImg.src = `https://image.tmdb.org/t/p/w300${choosenMovie.poster_path}`;
    } else if (viewWidth <= 600) {
      movieImg.src = `https://image.tmdb.org/t/p/w780${choosenMovie.poster_path}`;
    } else {
      movieImg.src = `https://image.tmdb.org/t/p/w1280${choosenMovie.poster_path}`;
    }
    const movieDetailContainer = document.createElement("div");
    movieDetailContainer.classList.add("most-popular-txt");
    const movieTitle = document.createElement("h3");
    const movieDescription = document.createElement("p");

    movieTitle.innerHTML = choosenMovie.title;
    movieDescription.innerHTML = choosenMovie.overview;

    mainPopularContainer.appendChild(popularMovieContainer);
    popularMovieContainer.appendChild(movieImg);
    popularMovieContainer.appendChild(movieDetailContainer);
    movieDetailContainer.appendChild(movieTitle);
    movieDetailContainer.appendChild(movieDescription);

    /*movie raiting */
    const movieRaitingContainer = document.createElement("div");
    movieRaitingContainer.classList.add("most-popular-raiting-number");
    const movieRaitingP = document.createElement("p");
    const movieRaiting = Number(choosenMovie.vote_average).toFixed(2);
    movieRaitingP.innerHTML = movieRaiting;

    popularMovieContainer.appendChild(movieRaitingContainer);
    movieRaitingContainer.appendChild(movieRaitingP);

    console.log(data.results);
  } catch (error) {
    /*HACER ALGO CON EL ERROR DE QUE NO CARGUE LA DATA QUE CORRESPONDE!!! */
    console.log(error);
  }
}

getRecomendedMovie();

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
  const randomMovieArticle = document.querySelector(".movie-category");
  const randomTvArticle = document.querySelector(".serie-category");
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
    const randomTvContainer = document.querySelector(".random-tv-container");

    randomTvList.forEach((tvSerie) => {
      const tvContainer = document.createElement("div");
      tvContainer.classList.add("movie-data-container");
      const tvImg = document.createElement("img");
      tvImg.classList.add("movie-img");
      const raitingDiv = document.createElement("div");
      raitingDiv.classList.add("raiting-number");
      const raitingP = document.createElement("p");

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
    const randomMovieContainer = document.querySelector(
      ".random-movie-container"
    );

    randomMovieList.forEach((movie) => {
      const movieContainer = document.createElement("div");
      movieContainer.classList.add("movie-data-container");
      const movieImg = document.createElement("img");
      movieImg.classList.add("movie-img");
      const raitingDiv = document.createElement("div");
      raitingDiv.classList.add("raiting-number");
      const raitingP = document.createElement("p");

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

loadRandomCategories();

/*Mobile menu function */
const menuList = document.querySelector(".menu-list");
const mobileMenuIcon = document.querySelector(".mobile-menu");
mobileMenuIcon.addEventListener("click", toggleMobileMenu);

function toggleMobileMenu() {
  menuList.classList.toggle("toggle-menu");
}
