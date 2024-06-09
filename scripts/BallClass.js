import { containerHeight, containerWidth, BallsArray } from './index.js'


// make class for each ball 
export class Ball {
    constructor(x, y, w, h, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = vx;
        this.vy = vy
        this.color = color
    }
    // ball styles 
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

        // move the ball 
        this.x += this.vx
        this.y += this.vy

        // check wall collision 
        if (this.x + this.w >= containerWidth || this.x <= container.offsetLeft) {
            // change velocity to bounce back
            this.vx *= -1

            // change position also to not go outside of the wall 
            this.x = this.x <= container.offsetLeft ? container.offsetLeft : containerWidth - this.w
        }
        if (this.y + this.h >= containerHeight || this.y <= container.offsetTop) {
            this.vy *= -1
            this.y = this.y <= container.offsetTop ? container.offsetTop : containerHeight - this.h
        }

    }
    collisionDetect() {
        for (let checkBall of BallsArray) {
            //check for self collision 
            if (!(this === checkBall)) {
                const dx = this.x - checkBall.x
                const dy = this.y - checkBall.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const sumOfRadius = this.w / 2 + checkBall.w / 2

                // if distance < sumOfRadius its collide 
                const colliding = distance < sumOfRadius

                // check for overlap 
                if (colliding) {
                    // if overlap =  sumOfRadius > distance 
                    const overlapValue = sumOfRadius - distance;

                    // dx / distance = how much circle overlap in x axis

                    // 0.5 -> to ensure both circles move away from each other by equal amount to resolve the overlap. 
                    const changeX = (dx / distance) * overlapValue * 0.5;
                    const changeY = (dy / distance) * overlapValue * 0.5;

                    // if  overlap change the position 

                    this.x += changeX;
                    this.y += changeY;

                    checkBall.x -= changeX;
                    checkBall.y -= changeY;
                }


                // https://www.youtube.com/watch?v=51IFubnEAsU

                // in elastic collision they exchange velocities

                if (colliding) {
                    // swap the velocity 
                    const tempVx = this.vx
                    const tempVy = this.vy

                    this.vx = checkBall.vx
                    this.vy = checkBall.vy

                    checkBall.vx = tempVx
                    checkBall.vy = tempVy
                }
            }


        }
    }
}

