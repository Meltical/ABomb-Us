var connection = new signalR.HubConnectionBuilder().withUrl("/gamehub").build();
connection.start();

document.getElementById("new-game-button").addEventListener("click", () => {
    clearBoard();
    connection.invoke("NewGame");
    //connection.invoke('Click', x, y);
    //connection.invoke('Flag', x, y);
});
let board = [];
connection.on("updateBoard", function (data) {
    board = JSON.parse(data);
    updateBoard();
});

const width = 30;
const height = 15;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = (last_mousey = 0);
var mousex = (mousey = 0);
var mousedown = false;
var tooltype = "draw";

var mouse_down = false;

clearMousePositions = function () {
    last_mousex = 0;
    last_mousey = 0;
};

spriteimage = new Image();
spriteimage.src = "./2000.png";

const updateBoard = () => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].Item2) {
                ctx.font = "20px serif";
                switch (board[i][j].Item1) {
                    case -1:
                        ctx.drawImage(
                            spriteimage,
                            80,
                            0,
                            16,
                            16,
                            i * 40,
                            j * 40,
                            40,
                            40
                        );
                        break;
                    case 0:
                        ctx.drawImage(
                            spriteimage,
                            16,
                            0,
                            16,
                            16,
                            i * 40,
                            j * 40,
                            40,
                            40
                        );
                        break;
                    case 1:
                        ctx.drawImage(
                            spriteimage,
                            0,
                            16,
                            16,
                            16,
                            i * 40,
                            j * 40,
                            40,
                            40
                        );
                        break;
                    case 2:
                        ctx.drawImage(
                            spriteimage,
                            16,
                            16,
                            16,
                            16,
                            i * 40,
                            j * 40,
                            40,
                            40
                        );
                        break;
                    case 3:
                        ctx.drawImage(
                            spriteimage,
                            32,
                            16,
                            16,
                            16,
                            i * 40,
                            j * 40,
                            40,
                            40
                        );
                        break;
                    case 4:
                        ctx.drawImage(
                            spriteimage,
                            48,
                            16,
                            16,
                            16,
                            i * 40,
                            j * 40,
                            40,
                            40
                        );
                        break;
                    case 5:
                        ctx.drawImage(
                            spriteimage,
                            64,
                            16,
                            16,
                            16,
                            i * 40,
                            j * 40,
                            40,
                            40
                        );
                        break;
                    case 6:
                        ctx.drawImage(
                            spriteimage,
                            80,
                            16,
                            16,
                            16,
                            i * 40,
                            j * 40,
                            40,
                            40
                        );
                        break;
                    case 7:
                        ctx.drawImage(
                            spriteimage,
                            96,
                            16,
                            16,
                            16,
                            i * 40,
                            j * 40,
                            40,
                            40
                        );
                        break;
                    case 8:
                        ctx.drawImage(
                            spriteimage,
                            112,
                            16,
                            16,
                            16,
                            i * 40,
                            j * 40,
                            40,
                            40
                        );
                        break;
                }
            } else if (board[i][j].Item3) {
                ctx.drawImage(
                    spriteimage,
                    32,
                    0,
                    16,
                    16,
                    i * 40,
                    j * 40,
                    40,
                    40
                );
            } else {
                //display a blank square
            }
        }
    }
};

const clearBoard = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
};

// Box width
var bw = canvas.width;
// Box height
var bh = canvas.height;
p = 0;

function drawBoard() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            ctx.drawImage(spriteimage, 0, 0, 16, 16, i * 40, j * 40, 40, 40);
        }
    }
}
$(canvas).on("click", function (e) {
    let x = Math.floor(parseInt(e.clientX - canvasx) / 40);
    let y = Math.floor(parseInt(e.clientY - canvasy) / 40);
    connection.invoke("Click", x, y);
});

$(canvas).on("contextmenu", function (e) {
    console.log("right click");
    let x = Math.floor(parseInt(e.clientX - canvasx) / 40);
    let y = Math.floor(parseInt(e.clientY - canvasy) / 40);
    connection.invoke("Flag", x, y);
});

drawBoard();
