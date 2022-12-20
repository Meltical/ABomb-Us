let audio = new Audio('./AmogusTrap.mp3')
$(document).ready(function () {
    const getCoords = (e) => {
        let x = Math.floor(
            parseInt(e.clientX - canvasx) / (canvas.width / width)
        )
        let y = Math.floor(
            parseInt(e.clientY - canvasy) / (canvas.height / height)
        )
        return [x, y]
    }

    $(canvasHover).on('click', function (e) {
        let [x, y] = getCoords(e)
        if (currentState == 'Playing') {
            if (board[x][y].Item3) {
                return
            }
            connection.invoke('Click', x, y)
        } else if (currentState == 'Empty') {
            connection.invoke('StartGame', x, y)
            audio.loop = true
            audio.volume = 0.5
            audio.play()
        }
    })
    $(canvasHover).on('contextmenu', function (e) {
        let [x, y] = getCoords(e)
        if (board[x][y].Item2) {
            return
        }
        connection.invoke('Flag', x, y)
    })

    $(canvasHover).on('mousemove', function (e) {
        connection.invoke('MouseMove', e.clientX, e.clientY)
        if (e.buttons == 1) {
            updateBoard([], [])
            handleMouseDown(e)
        }
    })

    $(canvasHover).on('mousedown', function (e) {
        if (e.buttons == 1) {
            updateBoard([], [])
            handleMouseDown(e)
        }
    })
})
