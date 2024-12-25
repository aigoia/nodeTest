const raylib = require('raylib')
const setting = require('./setting')
const print = require('./print')

class Paddle {
    constructor(x, y, width, height, speed) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
    }

    Update() {
        this.y = raylib.IsKeyDown(raylib.KEY_UP) && this.y > 0 ? this.y - this.speed : this.y
        this.y = raylib.IsKeyDown(raylib.KEY_DOWN) && this.y + this.height < setting.ScreenHeight ? this.y + this.speed : this.y
    }

    Draw() {
        raylib.DrawRectangle(this.x, this.y, this.width, this.height, setting.Snow)
    }
}

module.exports = Paddle
