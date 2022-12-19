let connection = new signalR.HubConnectionBuilder().withUrl('/gamehub').build()
connection.start()

connection.on('connected', function () {
    connection.invoke('GetBoard')
})

document.getElementById('new-game-button').addEventListener('click', () => {
    connection.invoke('NewGame')
})

document.getElementById('overlay-button').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none'
    document.getElementById('overlay-text').innerHTML = ''
    connection.invoke('NewGame')
})

connection.on('updateBoard', function (response) {
    let data = JSON.parse(response)
    board = data.board
    let state = data.state // Playing, Won, Lost
    let explodedMines = data.exploded_mines
    let wrongMines = data.wrong_mines
    if (state == 'Lost') {
        var audio = new Audio('./vine-boom.mp3')
        audio.volume = 0.3
        audio.play()
        document.getElementById('overlay').style.display = 'flex'
        document.getElementById('overlay-text').innerHTML = 'You Lost!'
    }
    if (state == 'Won') {
        var audio = new Audio('./ファンファーレ.mp3')
        audio.play()
        document.getElementById('overlay').style.display = 'flex'
        document.getElementById('overlay-text').innerHTML = 'You Won!'
    }
    updateBoard(explodedMines, wrongMines)
})

connection.on('mouseMove', function (x, y) {
    console.log(x, y)
})

const mute = () => {
    audio.muted = !audio.muted
}
