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

    $(canvas).on('click', function (e) {
        let [x, y] = getCoords(e)

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
        let bombsDefault = parseInt(document.getElementById('bombs').innerHTML)
        let [x, y] = getCoords(e)
        if (board[x][y].Item2) {
            return
        }
        if (board[x][y].Item3) {
            bombsDefault++
        } else {
            bombsDefault--
        }
        $('#bombs').text(bombsDefault)
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
