spriteimage = new Image()
spriteimage.src = './2000.png'

let board = []
const width = 30
const height = 15

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let canvasx = $(canvas).offset().left
let canvasy = $(canvas).offset().top

const drawSprite = (dx, dy, i, j) =>
    ctx.drawImage(spriteimage, dx, dy, 16, 16, i * 40, j * 40, 40, 40)

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

const updateBoard = () => {
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
}
