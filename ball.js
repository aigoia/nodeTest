const raylib = require('raylib')
const setting = require('./setting')
const print = require('./print')

class Ball {
    constructor(x, y, radius, speedX, speedY) {
        this.x = x       
        this.y = y
        this.radius = radius
        this.speedX = speedX
        this.speedY = speedY

        this.playerScore = 0
        this.cpuScore = 0
    }

    Draw() {
        raylib.DrawCircle(this.x, this.y, this.radius, setting.Gold)
    }

    Update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.HandleWallCollision();
    }

    HandleWallCollision() {
        if ((this.y - this.radius) <= 0 || (this.y + this.radius) >= setting.ScreenHeight) {
            this.speedY = this.speedY * -1; 
        }
    }
}

module.exports = Ball;