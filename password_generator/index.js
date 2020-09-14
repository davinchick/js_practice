const PW = document.getElementById('pw')
const copy = document.getElementById('copy')
const length = document.getElementById('length')
const upper = document.getElementById('upper')
const lower = document.getElementById('lower')
const number = document.getElementById('number')
const symbolEl = document.getElementById('symbols')
const generate = document.getElementById('generate')



const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowers = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '1234567890'
const symbols = '!@#$%^&*()_+'

function getUppers(){
    return uppers[Math.floor(Math.random()* uppers.length)]
}
function getLower(){
    return lowers[Math.floor(Math.random()* lowers.length)]
}
function getNum(){
    return numbers[Math.floor(Math.random()* numbers.length)]
}
function getSymbol(){
    return symbols[Math.floor(Math.random()* symbols.length)]
}

generate.addEventListener('click', () => {
    generatePass()
    PW.innerText = ''
})

function generatePass(){
    const len = length.value
    let password = ''
    for (let i = 0; i <len; i++) {
        const x = generateX()
        password += x
    }

    PW.innerText = password;
}

function generateX() {
    const text = []
    if(upper.checked){
        text.push(getUppers())
    }
    if(lower.checked){
        text.push(getLower())
    }
    if(number.checked){
        text.push(getNum())
    }
    if(symbolEl.checked){
        text.push(getSymbol())
    }
    return text.length ? text[Math.floor(Math.random()*text.length )] : 0;
}

copy.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const pass = PW.innerText
    if(!pass){return}

    textarea.value = pass;
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove();
    alert('Copied!')
})