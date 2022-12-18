let connection = new signalR.HubConnectionBuilder().withUrl('/gamehub').build()
connection.start()

let audio = new Audio('./AmogusTrap.mp3')
playing = false
document.getElementById('new-game-button').addEventListener('click', () => {
    clearBoard()
    playing = false
    audio.loop = true
    audio.play()
})

connection.on('updateBoard', function (response) {
    let data = JSON.parse(response)
    board = data.board
    let state = data.state // Playing, Won, Lost
    let explodedMine = data.exploded_mine // null if state != Lost, otherwise a tuple of x and y
    updateBoard(explodedMine)
})

const mute = () => {
    audio.muted = !audio.muted
}
