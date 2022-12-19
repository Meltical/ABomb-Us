let audio = new Audio('./AmogusTrap.mp3')
$(document).ready(function () {
    //onmousedown use the sprite

    $(canvas).on('click', function (e) {
        let x = Math.floor(
            parseInt(e.clientX - canvasx) / (canvas.width / width)
        )
        let y = Math.floor(
            parseInt(e.clientY - canvasy) / (canvas.height / height)
        )

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

    $(canvas).on('contextmenu', function (e) {
        let x = Math.floor(
            parseInt(e.clientX - canvasx) / (canvas.width / width)
        )
        let y = Math.floor(
            parseInt(e.clientY - canvasy) / (canvas.height / height)
        )

        //If Visible
        if (board[x][y].Item2) {
            return
        }
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
