const updateBoardFromServer = (boardDto) => {
    let data
    try {
        data = JSON.parse(boardDto)
    } catch {
        return
    }
    board = data.board
    const newState = data.state
    const explodedMines = data.exploded_mines
    const wrongMines = data.wrong_mines
    if (currentState == 'Playing' && newState == 'Lost') {
        handleGameLost()
    } else if (currentState == 'Playing' && newState == 'Won') {
        handleGameWon()
    } else if (
        (currentState == 'Won' ||
            currentState == 'Lost' ||
            currentState == 'Playing') &&
        newState == 'Empty'
    ) {
        handleNewGame()
    } else if (currentState == 'Empty' && newState == 'Playing') {
        handleStartGame()
    }
    currentState = newState
    updateBoard(explodedMines, wrongMines)
}

const connection = new signalR.HubConnectionBuilder()
    .withUrl('/gamehub')
    .build()

connection.start().then(() => {
    startBackgroundMusic()
    updateBoardFromServer(invokeGetBoard())
})

//TODO: Refactor with png canvas
connection.on('disconnect', (id) => document.getElementById(id)?.remove())
connection.on('updateBoard', (boardDto) => updateBoardFromServer(boardDto))
connection.on('mouseMove', (id, x, y) => drawMouseIcon(id, x, y))

document
    .getElementById('new-game-button')
    .addEventListener('click', invokeNewGame)
document
    .getElementById('overlay-button')
    .addEventListener('click', invokeNewGame)
