import { Ball } from './BallClass.js'

const container = document.getElementById('container')
export let containerWidth = 1250;
export let containerHeight = 680;

// container styles 
container.style.width = containerWidth + 'px'
container.style.height = containerHeight + 'px'
container.style.border = '2px solid red'


function random(min, max) {
    let num
    num = Math.floor(Math.random() * (max - min)) + min
    return num
}


export let BallsArray = [] // to store each ball 

const ballLength = 200;
function MakeBall() {
    for (let i = 0; i < ballLength; i++) {
        const g = random(0, 255);
        const r = random(0, 255);
        const b = random(0, 255);

        const rgb = `rgb(${r},${g},${b})`;
        // for same width and height in order to make circle 
        const width = random(18, 40)

        // create new ball
        const newBall = new Ball(
            random(container.offsetLeft, containerWidth - width),
            random(container.offsetTop, containerHeight - width),
            width,
            width,
            random(1, 6),
            random(1, 6),
            rgb
        )
        BallsArray.push(newBall)
    }

}
MakeBall()

function DrawBall() {
    for (let newBall of BallsArray) {
        newBall.draw()
        container.appendChild(newBall.element)
        newBall.update()
        newBall.collisionDetect()
    }
}

// clear container to remove past ball
function clearContainer() {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

// to move ball in every second 

function updateBall() {
    requestAnimationFrame(updateBall)
    clearContainer()
    DrawBall()
}
updateBall()

