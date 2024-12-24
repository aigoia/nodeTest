const raylib = require('raylib')
const setting = require('./setting')
const print = require('./print')

const countdown = async (start = init_count) => {
    for (let i = start; i > 0; i--) {
        raylib.BeginDrawing()
        raylib.ClearBackground(setting.Snow)
    
        raylib.DrawText(`${i}`, (setting.ScreenWidth - setting.ScoreMargin) / 2, setting.ScreenHeight / 2 - setting.ScoreSize, setting.ScoreSize, setting.Mint)

        raylib.EndDrawing()
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
}

const initGame = async() => {
    print("hello pong!")
    raylib.InitWindow(setting.ScreenWidth, setting.ScreenHeight, setting.GameName)
    raylib.SetTargetFPS(setting.Frame)

    await countdown(setting.InitCount)
}

const updateGame = () => {
    
}

const drawGame = () => {
    raylib.BeginDrawing()
    raylib.ClearBackground(setting.Mint)
    
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
