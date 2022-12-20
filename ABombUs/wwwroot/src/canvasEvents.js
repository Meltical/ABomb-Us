$(document).ready(function () {
    $(canvasHover).on('click', function (e) {
        const [x, y] = getCoordsFromEvent(e)
        if (currentState == 'Playing') {
            if (!board[x][y].Item3) {
                invokeClick(x, y)
            }
        } else if (currentState == 'Empty') {
            invokeStartGame(x, y)
        }
    })

    $(canvasHover).on('contextmenu', function (e) {
        const [x, y] = getCoordsFromEvent(e)
        if (!board[x][y].Item2) {
            connection.invoke('Flag', x, y)
        }
    })

    $(canvasHover).on('mousemove', function (e) {
        const [c, r] = getCoordsFromEvent(e)
        invokeMouseMove(c, r)
        if (e.buttons == 1) {
            //TODO: Draw hover effects above the board canvas
            updateBoard([], [])
            drawMouseDownEffect(e)
        }
    })

    $(canvasHover).on('mousedown', function (e) {
        if (e.buttons == 1) {
            //TODO: Draw hover effects above the board canvas
            updateBoard([], [])
            drawMouseDownEffect(e)
        }
    })
})
