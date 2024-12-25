const raylib = require('raylib')
const setting = require('./setting')
const print = require('./print')
const Paddle = require('./paddle')

class CpuPaddle extends Paddle {
    Update(ballY) {
        if (ballY < this.y + this.height / 2 && this.y > 0) {
            this.y -= this.speed;
        } else if (ballY > this.y + this.height / 2 && this.y + this.height < setting.ScreenHeight) {
            this.y += this.speed;
        }
    }
}

module.exports = CpuPaddle;