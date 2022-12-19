spriteimage = new Image()
spriteimage.src = './2000.png'

let board = []
const width = 30
const height = 15

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

// Runs each time the DOM window resize event fires.
// Resets the canvas dimensions to match window,
// then draws the new borders accordingly.

let canvasx = $(canvas).offset().left
let canvasy = $(canvas).offset().top

const drawSprite = (dx, dy, i, j) =>
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

function drawBoard() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            drawSprite(0, 0, i, j)
        }
    }
}
drawBoard()

const clearBoard = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBoard()
}

const updateBoard = (explodedMine, wrongMines) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].Item2) {
                ctx.font = '20px serif'
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
                        break
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
}

function initialize() {
    window.addEventListener('resize', resizeCanvas, false)
    resizeCanvas()
}
function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth, 1244)
    canvas.height = canvas.width / 2
    updateBoard([], [])
}

initialize()

const handleMouseDown = (e) => {
    let x = Math.floor(parseInt(e.clientX - canvasx) / (canvas.width / width))
    let y = Math.floor(parseInt(e.clientY - canvasy) / (canvas.height / height))
    if (board[x][y].Item3) {
        return
    }
    if (board[x][y].Item2) {
        if (board.some((x) => x.some((y) => y.Item2))) {
            //change sprite of all tiles non visible or flagged around the clicked tile to 16,0
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
