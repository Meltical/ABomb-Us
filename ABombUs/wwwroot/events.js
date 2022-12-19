let audio = new Audio('./AmogusTrap.mp3')
$(document).ready(function () {
    $(canvas).on('click', function (e) {
        let x = Math.floor(
            parseInt(e.clientX - canvasx) / (canvas.width / width)
        )
        let y = Math.floor(
            parseInt(e.clientY - canvasy) / (canvas.height / height)
        )

        if (board.some((x) => x.some((y) => y.Item2))) {
            if (board[x][y].Item3) {
                return
            }
            connection.invoke('Click', x, y)
        } else {
            connection.invoke('StartGame', x, y)
            audio.loop = true
            audio.volume = 0.5
            audio.play()
        }
    })

    $(canvas).on('contextmenu', function (e) {
        let x = Math.floor(
            parseInt(e.clientX - canvasx) / (canvas.width / width)
        )
        let y = Math.floor(
            parseInt(e.clientY - canvasy) / (canvas.height / height)
        )

        if (board[x][y].Item2) {
            return
        }
        connection.invoke('Flag', x, y)
    })

    $(canvas).on('mousemove', function (e) {
        connection.invoke('MouseMove', e.clientX, e.clientY)
        if (e.buttons == 1) {
            updateBoard([], [])
            handleMouseDown(e)
        }
    })

    $(canvas).on('mousedown', function (e) {
        if (e.buttons == 1) {
            updateBoard([], [])
            handleMouseDown(e)
        }
    })
})
