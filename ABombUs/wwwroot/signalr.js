updateBoardFromServer = (response) => {
let connection = new signalR.HubConnectionBuilder().withUrl('/gamehub').build()
connection.start()

document.getElementById('new-game-button').addEventListener('click', () => {
    clearIntervalIds()
    startClock()
    document.getElementById('bombs').innerHTML = '99'
    connection.invoke('NewGame')
})

document.getElementById('overlay-button').addEventListener('click', () => {
    clearIntervalIds()
    startClock()
    document.getElementById('bombs').innerHTML = '99'
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
        clearIntervalIds()
        var audio = new Audio('./vine-boom.mp3')
        audio.volume = 0.3
        audio.play()
        document.getElementById('overlay').style.display = 'flex'
        document.getElementById('overlay-text').innerHTML = 'You Lost!'
    }
    if (state == 'Won') {
        clearIntervalIds()
        var audio = new Audio('./ファンファーレ.mp3')
        audio.play()
        document.getElementById('overlay').style.display = 'flex'
        document.getElementById('overlay-text').innerHTML = 'You Won!'
    }
    updateBoard(explodedMines, wrongMines)
}

let connection = new signalR.HubConnectionBuilder().withUrl('/gamehub').build()
connection.start().then(function () {
    updateBoardFromServer(connection.invoke('GetBoard'))
})

connection.on('updateBoard', function (response) {
    updateBoardFromServer(response)
})

document.getElementById('new-game-button').addEventListener('click', () => {
    connection.invoke('NewGame')
})

connection.on('mouseMove', function (id, x, y) {
    let mouse = document.getElementById(id)
    if (!mouse) {
        let mouseDummy = document.getElementById('mouse-dummy')
        mouse = mouseDummy.cloneNode(true)
        mouse.id = id
        mouse.style.display = 'unset'
        mouse.style.position = 'absolute'
        document.body.appendChild(mouse)
    }
    mouse.style.left = x + 'px'
    mouse.style.top = y + 'px'
    mouse.children[0].style.fill = 'red'
})

const mute = () => {
    audio.muted = !audio.muted
}

connection.on('disconnect', function (id) {
    document.getElementById(id)?.remove()
})
