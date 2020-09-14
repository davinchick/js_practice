const API_URL = "https://api.github.com/users/"

const USER = document.querySelector('.user')
const FORM = document.querySelector('form')
const INPUT = document.querySelector('input')

getPerson('davinchick')

async function getPerson(name){
    const resp = await fetch(API_URL + name)
    const data = await resp.json()
    drawUser(data)
    getRepos(name)
}

function drawUser(data){
    USER.innerHTML = ''

    const userEl = `
        <div class="card">
            <div class="ava-cont">
                <img class="ava" src="${data.avatar_url}" alt="${data.name? data.name : 'unknown guy...'}">
            </div>
            <div class="user-info">
                <h2>${data.name? data.name : 'unknown guy...'}</h2>
                <p>${data.bio? data.bio : 'just the shy guy'}</p>
                <ul class="info">
                    <li><img src="eye.png" alt="eye">${data.followers || 0}</li>
                    <li><img src="like.png" alt="eye">${data.following || 0}</li>
                    <li><img src="cloud.png" alt="eye">${data.public_repos || 0}</li>
                </ul>
                <h4>Repos: </h4>
                <div class="repos" id="repos"></div>
            </div>
        </div>              
        `
    USER.innerHTML =userEl
}

async function getRepos(user){
    const resp = await fetch(API_URL + user + "/repos")
    const data = await resp.json()
    addToCard(data)
}

function addToCard(data) {
    const repos = document.getElementById('repos')
    data.slice(0, 12).forEach(el => {
        const a = document.createElement('a')
        a.classList.add("repo")
        a.href = el.html_url
        a.target = "_blank"
        a.innerText = el.name
        repos.appendChild(a)
    })
}

FORM.addEventListener('submit', (e)=> {
    e.preventDefault()
    const search = INPUT.value

    if(search){
        getPerson(search)
        INPUT.value = ''
    }
})