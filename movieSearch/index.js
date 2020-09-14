const APIKEY = "04c35731a5ee918f014970082a0088b1"
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="+APIKEY+"&page=1"
const IMGPATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?&api_key="+APIKEY+"&query="

const MAIN = document.querySelector('.main')
const FORM = document.getElementById('form')
const INPUT = document.getElementById('input')


getMovie()

async function getMovie(){
    const resp = await fetch(API_URL)
    const data = await resp.json()
    drawMovie(data)
}

async function getMovieBySearch(text){
    const resp = await fetch(SEARCH_URL+text)
    const data = await resp.json()
    drawMovie(data)
}

function getClassByVote(vote) {
    if(vote >= 8){
        return 'green'
    } else if(vote >=5){
        return 'orange'
    }
    return 'red'
}

function drawMovie(data){
    MAIN.innerHTML = ''
    data.results.forEach(el => {
        const container = document.createElement('div')
        container.classList.add('movie')
        container.innerHTML = `
                <img src="${IMGPATH+el.poster_path}" alt="${el.title}">
                <div class="info">
                    <h3>${el.title}</h3>
                    <span class="${getClassByVote(el.vote_average)}">${el.vote_average}</span>
                </div>
                <div class="overview">
                    <h4>Overview: </h4>${el.overview}
                </div>
        `
        MAIN.appendChild(container)
    })
}

FORM.addEventListener('submit', (e)=> {
    e.preventDefault()
    const text = INPUT.value
    if(text){
        getMovieBySearch(text)
        INPUT.value = ''
    }
})