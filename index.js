const raylib = require('raylib')
const setting = require('./setting')
const print = require('./print')

const initGame = () => {
    print("hello pong!")
    raylib.InitWindow(setting.ScreenWidth, setting.ScreenHeight, setting.GameName)
    raylib.SetTargetFPS(setting.Frame)
}

const updateGame = () => {
    
}

const drawGame = () => {
    raylib.BeginDrawing()
    raylib.ClearBackground(setting.Mint)
    
    raylib.EndDrawing()    
}


initGame()
while (!raylib.WindowShouldClose()) {
    updateGame()
    drawGame()
}
raylib.CloseWindow()