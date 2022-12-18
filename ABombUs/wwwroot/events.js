$(document).ready(function () {
    //onmousedown use the sprite

    $(canvas).on('click', function (e) {
        let x = Math.floor(parseInt(e.clientX - canvasx) / 40)
        let y = Math.floor(parseInt(e.clientY - canvasy) / 40)
        if (board[x][y].Item3 === true) {
            return
        }
        if (playing) {
            connection.invoke('Click', x, y)
        } else {
            connection.invoke('NewGame', x, y)
            playing = true
        }
    })

    $(canvas).on('contextmenu', function (e) {
        let x = Math.floor(parseInt(e.clientX - canvasx) / 40)
        let y = Math.floor(parseInt(e.clientY - canvasy) / 40)

        if (board[x][y].Item2 === true) {
            return
        }

        connection.invoke('Flag', x, y)
    })
})
