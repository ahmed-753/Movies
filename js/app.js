const APY_KEY = '4dde909d-2335-47aa-aad2-195741978360';

const APY_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';

const APY_URL_SORT = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

const API_URL_MOVIE_DETAIL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

getMovies(APY_URL_POPULAR)

async function getMovies(url) {
    const response = await fetch(url, {
        headers: {
            'X-API-KEY': '4dde909d-2335-47aa-aad2-195741978360',
            'Content-Type': 'application/json',
        },
    })
    const responseData = await response.json();
    showMovies(responseData.films);
}

function getColor(rating) {
    if (rating >= 7) {
        return 'green'
    } else if (rating >= 5) {
        return 'orange'
    } else if(rating >= rating > '%'){
        return ''
    } else {
        return 'red'
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies')
    moviesEl.innerHTML = ``

    data.forEach((movie) => {
        let movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
      <div class="movie__cover-inner">
        <img
                src="${movie.posterUrlPreview}"
                class="movie__cover"
                alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map((el) => " " + el.genre)}</div>
        <div class="movie__average movie__average 
        movie__average--${getColor(movie.rating)}">
          ${movie.rating}
        </div>
      </div>
         `;
        movieEl.addEventListener('click', () => openModal(movie.filmId));
        moviesEl.append(movieEl)
    });
}

const form = document.querySelector('form')

const inp = document.querySelector('.header__search')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const api = `${APY_URL_SORT}${inp.value}`
    inp.value && getMovies(api)
    if (inp.value) {
        getMovies(api)
        inp.value = '';
    }
});


// modal
const modal = document.querySelector('.modal')


async function openModal(id) {

    const response = await fetch(`${API_URL_MOVIE_DETAIL}${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '4dde909d-2335-47aa-aad2-195741978360',
        },

    });
    const responseData = await response.json();


    modal.classList.add('modal--show')

    modal.innerHTML = `
       <div class="modal__card">
        <img class="modal__movie-backdrop" src="${responseData.posterUrlPreview}" alt="${responseData.nameRu}">
        <h2>
          <span class="modal__movie-title" >${responseData.nameRu}</span>
          <span  class="modal__movie_release_year">${responseData.year}</span>
        </h2>
        <ul class="modal__movie-info ">
        <div class="loren">
          <li class="modal__movie-genre">
            Жанор-${responseData.genres.map((el) => `<span>${el.genre + ''}</span>`)}
          </li>
          <li>
            <span> Время-${responseData.filmLength}</span>
          </li>
          <li>
            Сайт:<a class="modal__movie-site" target="_blank" href="example.com">${responseData.webUrl}</a>
          </li>
          <li class="modal__movie-overview"> Описание -
            ${responseData.description}
          </li>
        
        </div>
        </ul>
        <button class="modal__button-close">закрыть</button>
      </div>
     `;
    let btnClose = document.querySelector('.modal__button-close')
    btnClose.addEventListener('click', () => closeModal());
}

function closeModal() {
    modal.classList.remove('modal--show')
}

window.addEventListener('click', (e) => {
    if (e.target === modal){
        closeModal()
    }
});

window.addEventListener('keydown', (e) => {
   if(e.keyCode === 27){
       closeModal()
   }
});

