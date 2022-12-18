let connection = new signalR.HubConnectionBuilder().withUrl('/gamehub').build()
connection.start()

document.getElementById('new-game-button').addEventListener('click', () => {
    clearBoard()
})

connection.on('updateBoard', function (response) {
    let data = JSON.parse(response)
    board = data.board
    let state = data.state // Playing, Won, Lost
    let explodedMines = data.exploded_mines
    let wrongMines = data.wrong_mines
    updateBoard(explodedMines, wrongMines)
})

const mute = () => {
    audio.muted = !audio.muted
}
