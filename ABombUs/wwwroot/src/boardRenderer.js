const drawSprite = (dx, dy, i, j) => {
    ctx.drawImage(
        spriteimage,
        dx,
        dy,
        16,
        16,
        (i * canvas.width) / 30,
        j * (canvas.height / 15),
        canvas.width / 30,
        canvas.height / 15
    )
}

function drawEmptyBoard() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            drawSprite(0, 0, i, j)
        }
    }
}

const updateBoard = (explodedMine, wrongMines) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].Item2) {
                switch (board[i][j].Item1) {
                    case -1:
                        drawSprite(80, 0, i, j)
                        break
                    case 0:
                        drawSprite(16, 0, i, j)
                        break
                    case 1:
                        drawSprite(0, 16, i, j)
                        break
                    case 2:
                        drawSprite(16, 16, i, j)
                        break
                    case 3:
                        drawSprite(32, 16, i, j)
                        break
                    case 4:
                        drawSprite(48, 16, i, j)
                        break
                    case 5:
                        drawSprite(64, 16, i, j)
                        break
                    case 6:
                        drawSprite(80, 16, i, j)
                        break
                    case 7:
                        drawSprite(96, 16, i, j)
                        break
                    case 8:
                        drawSprite(112, 16, i, j)
                }
            } else if (board[i][j].Item3) {
                drawSprite(32, 0, i, j)
            } else {
                drawSprite(0, 0, i, j)
            }
        }
    }
    if (explodedMine.length > 0) {
        for (let i = 0; i < explodedMine.length; i++) {
            drawSprite(96, 0, explodedMine[i].Item1, explodedMine[i].Item2)
        }
    }
    if (wrongMines.length > 0) {
        for (let i = 0; i < wrongMines.length; i++) {
            drawSprite(112, 0, wrongMines[i].Item1, wrongMines[i].Item2)
        }
    }
    updateBombCount()
}

const drawMouseDownEffect = (e) => {
    const [x, y] = getCoordsFromEvent(e)
    if (board[x][y].Item3) {
        return
    }
    if (board[x][y].Item2) {
        if (board.some((x) => x.some((y) => y.Item2))) {
            for (let i = x - 1; i <= x + 1; i++) {
                for (let j = y - 1; j <= y + 1; j++) {
                    if (i < 0 || i >= width || j < 0 || j >= height) {
                        continue
                    }
                    if (!board[i][j].Item2 && !board[i][j].Item3) {
                        drawSprite(16, 0, i, j)
                    }
                }
            }
        }
    } else {
        drawSprite(16, 0, x, y)
    }
}

//TODO: Nécessaire ?
drawEmptyBoard()
