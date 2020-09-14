const CANVAS = document.getElementById('canvas');
const ctx = CANVAS.getContext('2d');

const minus = document.getElementById('minus')
const plus = document.getElementById('plus')
const clear = document.getElementById('clear')
const sizeBrush = document.getElementById('sizeBrush')
const COLOR = document.getElementById('color')

let size = 14; // width of brush
sizeBrush.innerText = size
let isPressed = false;
let color = 'black'
let x
let y


CANVAS.addEventListener('mousedown', (e) => {
    isPressed = true
    x = e.offsetX
    y = e.offsetY
})
CANVAS.addEventListener('mouseup', (e) => {
    isPressed = false
    x = undefined
    y = undefined
})
CANVAS.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const X = e.offsetX;
        const Y = e.offsetY;
        // drawLine(x, y, X, Y)
        drawCircle(X, Y)
    }
})

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill();
}
function drawLine(x, y, x2, y2) {  // WOWOWOWOWOWWWWWWWWWWWWWWWOOOOOOOOOW
    ctx.beginPath();
    ctx.moveTo(x, y)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size
    ctx.stroke();
}

minus.addEventListener('click', ()=> {
    size -= 2;
    if(size < 2) {
        size = 2
    }
    sizeBrush.innerText = size
})
plus.addEventListener('click', ()=> {
    size += 2;
    if(size > 50) {
        size = 50
    }
    sizeBrush.innerText = size
})
clear.addEventListener('click', ()=> {
    cleanUp()
})
COLOR.addEventListener('change', (e) => {
    color = e.target.value
})
function cleanUp(){
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
}
