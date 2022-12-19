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
            handleMouseDown(e)
            $(this).mousemove(function (e) {
                updateBoard([], [])
                handleMouseDown(e)
            })
        })
        .mouseup(function () {
            $(this).unbind('mousemove')
        })
        .mouseout(function () {
            $(this).unbind('mousemove')
        })
    //onmousedown change the sprite, onmouseup change the sprite back
    // $(canvas).on('mousedown', function (e) {
    //     let x = Math.floor(
    //         parseInt(e.clientX - canvasx) / (canvas.width / width)
    //     )
    //     let y = Math.floor(
    //         parseInt(e.clientY - canvasy) / (canvas.height / height)
    //     )
    //     if (board[x][y].Item2) {
    //         if (board.some((x) => x.some((y) => y.Item2))) {
    //             //change sprite of all tiles non visible or flagged around the clicked tile to 16,0
    //             for (let i = x - 1; i <= x + 1; i++) {
    //                 for (let j = y - 1; j <= y + 1; j++) {
    //                     if (i < 0 || i >= width || j < 0 || j >= height) {
    //                         continue
    //                     }
    //                     if (!board[i][j].Item2 && !board[i][j].Item3) {
    //                         drawSprite(16, 0, i, j)
    //                     }
    //                 }
    //             }
    //         } else {
    //             drawSprite(16, 0, x, y)
    //         }
    //     }
    // })
    // $(canvas).on('mouseup', function (e) {
    //     let x = Math.floor(
    //         parseInt(e.clientX - canvasx) / (canvas.width / width)
    //     )
    //     let y = Math.floor(
    //         parseInt(e.clientY - canvasy) / (canvas.height / height)
    //     )
    //     if (board.some((x) => x.some((y) => y.Item2))) {
    //         return
    //     }
    //     drawSprite(0, 0, x, y)
    // })

    // //on hover draw a rectangle around the tile and delete it on mouseout
    // $(canvas).on('hover', function (e) {
    //     let x = Math.floor(
    //         parseInt(e.clientX - canvasx) / (canvas.width / width)
    //     )
    //     let y = Math.floor(
    //         parseInt(e.clientY - canvasy) / (canvas.height / height)
    //     )
    //     ctx.strokeRect(
    //         (x * canvas.width) / width,
    //         (y * canvas.height) / height,
    //         canvas.width / width,
    //         canvas.height / height
    //     )
    // })
    // $(canvas).on('mouseout', function (e) {
    //     let x = Math.floor(
    //         parseInt(e.clientX - canvasx) / (canvas.width / width)
    //     )
    //     let y = Math.floor(
    //         parseInt(e.clientY - canvasy) / (canvas.height / height)
    //     )
    //     drawSprite(0, 0, x, y)
    // })
})
