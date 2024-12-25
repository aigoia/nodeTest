const raylib = require('raylib')
const setting = require('./setting')
const print = require('./print')
const Ball = require('./ball')
const Paddle = require('./paddle')
const CpuPaddle = require('./cpuPaddle')

const ball = new Ball(setting.ScreenWidth / 2, setting.ScreenHeight / 2, setting.BallSize, setting.BallSpeed, setting.BallSpeed)
const player = new Paddle(setting.ScreenWidth - setting.PaddleWidth - setting.PaddleMargin, (setting.ScreenHeight - setting.PaddleHeight) / 2, setting.PaddleWidth, setting.PaddleHeight, setting.PlayerSpeed)
const cpu = new CpuPaddle(setting.PaddleMargin, (setting.ScreenHeight - setting.PaddleHeight) / 2, setting.PaddleWidth, setting.PaddleHeight, setting.CpuSpeed)
let initDone = false

const countdown = async (start = setting.InitCount) => {
    for (let i = start; i > 0; i--) {
        raylib.BeginDrawing()
        raylib.ClearBackground(setting.Snow)
    
        raylib.DrawText(`${i}`, (setting.ScreenWidth - setting.ScoreMargin) / 2, setting.ScreenHeight / 2 - setting.ScoreSize, setting.ScoreSize, setting.Mint)

        if (initDone) {
            raylib.DrawText(ball.cpuScore.toString(), setting.ScreenWidth / 4 - setting.ScoreMargin, setting.ScoreMargin, setting.ScoreSize, setting.Mint)
            raylib.DrawText(ball.playerScore.toString(), (3 * setting.ScreenWidth) / 4 - setting.ScoreMargin, setting.ScoreMargin, setting.ScoreSize, setting.Mint)
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

const checkGame = async () => {
    if (ball.CheckOutOfBounds()) {
        ball.out = false
        await countdown()
    }
}

const updateGame = () => {
    ball.Update()
    player.Update()
    cpu.Update(ball.y)

    ball.speedX = raylib.CheckCollisionCircleRec(raylib.Vector2(ball.x, ball.y), ball.radius, 
                    { x: player.x, y: player.y, width: player.width, height: player.height }) 
                    ? ball.speedX * -1 : ball.speedX;

    ball.speedX = raylib.CheckCollisionCircleRec(raylib.Vector2(ball.x, ball.y), ball.radius, 
                    { x: cpu.x, y: cpu.y, width: cpu.width, height: cpu.height }) 
                    ? ball.speedX * -1 : ball.speedX;
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
        await checkGame()
        updateGame()
        drawGame()
    }
    raylib.CloseWindow()
}
main()
