$(document).ready(function () {
    $(canvasEvent).on('click', function (e) {
        const [x, y] = getCoordsFromEvent(e)
        if (currentState == 'Playing') {
            if (!board[x][y].Item3) {
                invokeClick(x, y)
            }
        } else if (currentState == 'Empty') {
            invokeStartGame(x, y)
        }
    })

    $(canvasEvent).on('contextmenu', function (e) {
        const [x, y] = getCoordsFromEvent(e)
        if (!board[x][y].Item2) {
            connection.invoke('Flag', x, y)
        }
    })

    $(canvasEvent).on('mousemove', function (e) {
        const [c, r] = getCoordsFromEvent(e)
        invokeMouseMove(c, r)
        if (e.buttons == 1) {
            //TODO: Draw hover effects above the board canvas
            updateBoard([], [])
            drawMouseDownEffect(e)
        }
    })

    $(canvasEvent).on('mousedown', function (e) {
        if (e.buttons == 1) {
            //TODO: Draw hover effects above the board canvas
            updateBoard([], [])
            drawMouseDownEffect(e)
        }
    })
})
