let connection = new signalR.HubConnectionBuilder().withUrl('/gamehub').build()
connection.start()

playing = false
document.getElementById('new-game-button').addEventListener('click', () => {
    clearBoard()
    playing = false
})

connection.on('updateBoard', function (response) {
    let data = JSON.parse(response)
    board = data.board
    let state = data.state // Playing, Won, Lost
    let explodedMine = data.exploded_mine // null if state != Lost, otherwise a tuple of x and y
    console.log(board[0][0])
    updateBoard()
})
