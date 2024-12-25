const raylib = require('raylib')
const setting = require('./setting')
const print = require('./print')
const Ball = require('./ball')
const Paddle = require('./paddle')
const CpuPaddle = require('./cpuPaddle')

const ball = new Ball(setting.ScreenWidth / 2, setting.ScreenHeight / 2, setting.BallSize, setting.BallSpeed, setting.BallSpeed)
const player = new Paddle(setting.ScreenWidth - setting.PaddleWidth - setting.PaddleMargin, (setting.ScreenHeight - setting.PaddleHeight) / 2, setting.PaddleWidth, setting.PaddleHeight, setting.PlayerSpeed);
const cpu = new CpuPaddle(setting.PaddleMargin, (setting.ScreenHeight - setting.PaddleHeight) / 2, setting.PaddleWidth, setting.PaddleHeight, setting.CpuSpeed);
let initDone = false

const countdown = async (start = init_count) => {
    for (let i = start; i > 0; i--) {
        raylib.BeginDrawing()
        raylib.ClearBackground(setting.Snow)
    
        raylib.DrawText(`${i}`, (setting.ScreenWidth - setting.ScoreMargin) / 2, setting.ScreenHeight / 2 - setting.ScoreSize, setting.ScoreSize, setting.Mint)

        if (initDone) {
            raylib.DrawText(ball.cpuScore.toString(), setting.ScreenWidth / 4 - setting.ScoreMargin, setting.ScoreMargin, setting.ScoreSize, setting.Snow)
            raylib.DrawText(ball.playerScore.toString(), (3 * setting.ScreenWidth) / 4 - setting.ScoreMargin, setting.ScoreMargin, setting.ScoreSize, setting.Snow)
        }

        raylib.EndDrawing()
        await new Promise(resolve => setTimeout(resolve, setting.CountTime))
    }
}

const initGame = async () => {
    print("hello pong!")
    raylib.InitWindow(setting.ScreenWidth, setting.ScreenHeight, setting.GameName)
    raylib.SetTargetFPS(setting.Frame)

    await countdown(setting.InitCount)
    initDone = true
}

const updateGame = () => {
    ball.Update()
    player.Update()
    cpu.Update(ball.y)
}

const drawGame = () => {
    raylib.BeginDrawing()
    raylib.ClearBackground(setting.Mint)
    raylib.DrawLine(setting.ScreenWidth / 2, 0, setting.ScreenWidth / 2 + 1, setting.ScreenHeight, setting.Snow)
    raylib.DrawLine(setting.ScreenWidth / 2, 0, setting.ScreenWidth / 2 - 1, setting.ScreenHeight, setting.Snow)

    ball.Draw()
    player.Draw()
    cpu.Draw()

    raylib.DrawText(ball.cpuScore.toString(), setting.ScreenWidth / 4 - setting.ScoreMargin, setting.ScoreMargin, setting.ScoreSize, setting.Snow)
    raylib.DrawText(ball.playerScore.toString(), (3 * setting.ScreenWidth) / 4 - setting.ScoreMargin, setting.ScoreMargin, setting.ScoreSize, setting.Snow)
    
    raylib.EndDrawing()    
}

const main = async () => {    
    await initGame()
    while (!raylib.WindowShouldClose()) {
        updateGame()
        drawGame()
    }
    raylib.CloseWindow()
}
main()
