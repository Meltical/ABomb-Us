$(document).ready(function () {
    //onmousedown use the sprite

    $(canvas).on('click', function (e) {
        let x = Math.floor(parseInt(e.clientX - canvasx) / 40)
        let y = Math.floor(parseInt(e.clientY - canvasy) / 40)
        if (board[x][y].Item3 === true) {
            return
        }
        connection.invoke('Click', x, y)
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
