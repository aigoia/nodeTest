const raylib = require('raylib')
const setting = require('./setting')

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
}

module.exports = Ball;