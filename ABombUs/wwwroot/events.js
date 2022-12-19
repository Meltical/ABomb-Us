let audio = new Audio('./AmogusTrap.mp3')
$(document).ready(function () {
    //onmousedown use the sprite
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
            //If Flagged
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
    let flagCounter = 0
    $(canvas).on('contextmenu', function (e) {
        let [x, y] = getCoords(e)
        //If Visible
        if (board[x][y].Item2) {
            return
        }
        if (board[x][y].Item3) {
            flagCounter--
        } else {
            flagCounter++
        }
        $('#bombs').text(99 - flagCounter)
        connection.invoke('Flag', x, y)
    })

    //create canvas on mouse move and invoke
    $(canvas).on('mousemove', function (e) {
        connection.invoke('MouseMove', e.clientX, e.clientY)
    })
    $(canvas)
        .mousedown(function (e) {
            if ('buttons' in e) {
                if (e.buttons != 1) {
                    return
                }
                handleMouseDown(e)
                $(this).mousemove(function (e) {
                    updateBoard([], [])
                    handleMouseDown(e)
                })
            }
        })
        .mouseup(function () {
            $(this).unbind('mousemove')
        })
        .mouseout(function () {
            $(this).unbind('mousemove')
        })
})
