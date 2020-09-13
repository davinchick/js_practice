// https://www.themealdb.com/api.php


const mealsBox = document.getElementById('meals')
const favoritesBox = document.getElementById('favorites')
const search = document.getElementById('search')
const searchInput = document.getElementById('search-inp')

const popup = document.getElementById('popup')
const inform = document.getElementById('meal-info')
const closePop = document.getElementById('close-info')
const ingredients = document.getElementById('ingredients')


async function getRandomMeal () {
    const randomMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const res = await randomMeal.json()
    const meal = res.meals[0]

    addMeal(meal, true)
}

async function getMealById(id) {
    const meal = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const mealData = await meal.json()
    const res = mealData.meals[0]
    return res
}

async function getMealBySearch(name) {
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+name)
    const mealsData = await meals.json()
    const res = mealsData.meals
    return res
}

function addMeal(mealData, isRandom = false) {
    const mealEl = document.createElement('div');
    mealEl.classList.add("meal");
    mealEl.innerHTML = `<div class="meal-header">
                    ${isRandom ? `<span class="random">Random recipe</span>` : ""}
                    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                </div>
                <div class="meal-body">
                    <h4>${mealData.strMeal}</h4>
                    <button class="heart"></button>
                </div>
    `;
    mealEl.querySelector(".heart").addEventListener('click', (e) => {
        if(e.target.classList.contains('active')){
            removeFromLocaleStorage(mealData.idMeal)
            e.target.classList.remove('active')
        } else {
            updateLocaleStorage(mealData.idMeal)
            e.target.classList.add('active')
        }
        fetchFavMeals()
    });
    mealEl.querySelector('img').addEventListener('click', ()=>{
        showRecipe(mealData)
    })
    mealsBox.appendChild(mealEl)
}

function addMealToFav(mealData) {
    const mealEl = document.createElement('li');
    mealEl.innerHTML = ` 
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <span>${mealData.strMeal}</span>
            <button class="remove-fav">x</button>
    `;
    const btn = mealEl.querySelector('button');
    btn.addEventListener('click', () => {
        removeFromLocaleStorage(mealData.idMeal)
        fetchFavMeals()
    })
    mealEl.addEventListener('click', ()=> {
        showRecipe(mealData)
    })
    favoritesBox.appendChild(mealEl)
}

getRandomMeal()
fetchFavMeals()

function updateLocaleStorage(newmeal) {
    const mealIds = getFromStorage()
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, newmeal]))
}
function removeFromLocaleStorage(mealId) {
    const mealIds = getFromStorage()
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(el => el !== mealId)))
}
function getFromStorage(){
    const res = JSON.parse(localStorage.getItem('mealIds'))
    return res === null ? [] : res
}

async function fetchFavMeals(){
    favoritesBox.innerHTML = ''

    const mealIds = getFromStorage()

    for (let i = 0; i <mealIds.length; i+=1){
        const meal = await getMealById(mealIds[i])
        addMealToFav(meal)
    }
}

search.addEventListener('click', async ()=> {

    const text = searchInput.value
    const result = await getMealBySearch(text)

    if(result) {
        mealsBox.innerHTML = ''
        result.forEach(el => {
            addMeal(el)
        })
    }
})




closePop.addEventListener('click', ()=>{
    popup.classList.add('hide')
})

function showRecipe(mealData){
    ingredients.innerHTML = ''
    popup.classList.remove('hide')

    const ingreds = []
    for (let i = 0; i <20 ; i++) {
        const ing = mealData['strIngredient'+i]
        if(ing){
            ingreds.push(`${ing} / ${mealData['strMeasure'+i]}`)
        }
    }
    const info = `<h1>${mealData.strMeal}</h1>
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <p>${mealData.strInstructions}</p>
          <ul>${ingreds.map(el => `<li>${el}</li>`).join('')}</ul>`
    ingredients.innerHTML = info
}