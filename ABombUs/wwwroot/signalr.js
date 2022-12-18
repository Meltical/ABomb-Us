let connection = new signalR.HubConnectionBuilder().withUrl('/gamehub').build()
connection.start()

connection.on('connected', function () {
    connection.invoke('GetBoard')
})

document.getElementById('new-game-button').addEventListener('click', () => {
    connection.invoke('NewGame')
})

connection.on('updateBoard', function (response) {
    let data = JSON.parse(response)
    board = data.board
    let state = data.state // Playing, Won, Lost
    let explodedMines = data.exploded_mines
    let wrongMines = data.wrong_mines
    updateBoard(explodedMines, wrongMines)
})

connection.on('mouseMove', function (x, y) {
    console.log(x, y)
})

const mute = () => {
    audio.muted = !audio.muted
}
