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

        this.out = false
    }

    Draw() {
        raylib.DrawCircle(this.x, this.y, this.radius, setting.Gold)
    }

    Update() {
        this.x += this.speedX
        this.y += this.speedY
        this.HandleWallCollision()
    }

    HandleWallCollision() {
        if ((this.y - this.radius) <= 0 || (this.y + this.radius) >= setting.ScreenHeight) {
            this.speedY = this.speedY * -1
        }
    }

    CheckOutOfBounds() {
        if (this.x + this.radius >= setting.ScreenWidth) {
            this.cpuScore = this.ResetBall(this.cpuScore) + 1
        }
        if (this.x - this.radius <= 0) {
            this.playerScore = this.ResetBall(this.playerScore) + 1
        }
    
        return this.out
    }
    
    ResetBall(score) {
        this.out = true
    
        let positions = [2]
        positions.push((this.cpuScore === this.playerScore) ? 1 : 2)
        positions.push((this.cpuScore === this.layerScore) ? 3 : 2)
    
        print('start positions:', positions)
    
        for (let i = 0; i < positions.length; i++) {
            positions[i] = positions[i] * setting.ScreenHeight / 4
        }
    
        this.x = setting.ScreenWidth / 2
        this.y = positions[raylib.GetRandomValue(0, positions.length - 1)]
    
        let speedChoices = [-1, 1]
        this.speedX = this.speedX * speedChoices[raylib.GetRandomValue(0, 1)]
        this.speedY = this.speedX * speedChoices[raylib.GetRandomValue(0, 1)]
    
        return score + 1
    }
}

module.exports = Ball