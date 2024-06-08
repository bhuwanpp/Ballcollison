const container = document.getElementById('container')

let containerWidth = 1200;
let containerHeight = 600;

container.style.width = containerWidth + 'px'
container.style.height = containerHeight + 'px'
container.style.border = '1px solid red'
container.style.margin = 'auto'
container.style.marginTop = '50px'

function random(min, max) {
    let num
    num = Math.floor(Math.random() * (max - min)) + min
    return num
}

let dy = 1;
const speed = 1;


class Ball {
    constructor(x, y, w, h, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = vx;
        this.vy = vy
        this.color = color
    }

    draw() {
        this.element = document.createElement('div')
        this.element.style.width = `${this.w}px`;
        this.element.style.height = `${this.h}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.position = `absolute`;
        this.element.style.background = this.color;
        this.element.style.borderRadius = '50%';
    }

    update() {
        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`
        this.x += this.vx
        this.y += this.vy
        if (this.x + this.vx >= containerWidth || this.x + this.vx < container.offsetLeft) {
            this.vx *= -1
        }
        if (this.y + this.vy >= containerHeight || this.y + this.vy < container.offsetTop) {
            this.vy *= -1
        }
    }
    checkOverlap() {

    }
    collisionDetect() {
        for (let checkBall of BallsArray) {
            //check for self collision 
            if (!(this === checkBall)) {
                const dx = this.x - checkBall.x
                const dy = this.y - checkBall.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const colliding = distance < this.w / 2 + checkBall.w / 2

                //https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional
                if (colliding) {

                    let angle = Math.atan2(dy, dx);
                    let sin = Math.sin(angle);
                    let cos = Math.cos(angle);

                    // The overall velocity of each body must be split into two perpendicular velocities:

                    let vx1 = (this.vx * cos + this.vy * sin);
                    let vy1 = (this.vy * cos - this.vx * sin);

                    let vx2 = (checkBall.vx * cos + checkBall.vy * sin);
                    let vy2 = (checkBall.vy * cos - checkBall.vx * sin);

                    // swapping the x velocity (y is parallel so doesn't matter)
                    // and rotating back the adjusted perpendicular velocities
                    this.vx = vx2 * cos - vy1 * sin;
                    this.vy = vy1 * cos + vx2 * sin;
                    checkBall.vx = vx1 * cos - vy2 * sin;
                    checkBall.vy = vy2 * cos + vx1 * sin;

                }
            }


        }
    }
}

const ballLength = 100;
let BallsArray = []
function MakeBall() {
    for (let i = 0; i < ballLength; i++) {
        const g = random(0, 255);
        const r = random(0, 255);
        const b = random(0, 255);

        const rgb = `rgb(${r},${g},${b})`;
        const width = random(20, 50)
        const newBall = new Ball(
            random(container.offsetLeft, container.offsetWidth),
            random(container.offsetTop, container.offsetHeight),
            width,
            width,
            random(1, 5),
            random(1, 5),
            rgb
        )
        BallsArray.push(newBall)
    }

}
MakeBall()

function DrawBall() {
    for (let nball of BallsArray) {
        nball.draw()
        container.appendChild(nball.element)
        nball.update()
        nball.collisionDetect()
    }
}

// clear canvas to remove past ball
function clearCanvas() {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

function updateBall() {
    requestAnimationFrame(updateBall)
    clearCanvas()
    DrawBall()
}

updateBall()

