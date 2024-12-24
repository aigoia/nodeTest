const raylib = require('raylib')
const settings = require('./setting.js')
const print = require('./helper.js')

const initGame = () => {
    print("hello pong!")
    raylib.InitWindow(settings.ScreenWidth, settings.ScreenHeight, settings.GameName)
    raylib.SetTargetFPS(settings.Frame)
}

const updateGame = () => {
    
}

const drawGame = () => {
    raylib.BeginDrawing()
    raylib.ClearBackground(settings.Mint)
    
    raylib.EndDrawing()    
}


initGame()
while (!raylib.WindowShouldClose()) {
    updateGame()
    drawGame()
}
raylib.CloseWindow()