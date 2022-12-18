var connection = new signalR.HubConnectionBuilder().withUrl("/gamehub").build();
connection.start();

document.getElementById("test").addEventListener("click", () => {
    console.log("click");
    connection.invoke("click", 2, 1);
});

connection.on("update", function (data) {
    console.log(JSON.parse(data));
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

// for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//         // console.log(i + " " + j + " ", board[i][j]);
//         if (board[i][j].Item2) {
//             ctx.font = "20px serif";
//             switch (board[i][j].Item1) {
//                 case -1:
//                     ctx.fillText("BOOM", i * 40 + 10, j * 40 + 30);
//                     break;
//                 case 0:
//                     ctx.fillText(" ", i * 40 + 10, j * 40 + 30);
//                     break;
//                 default:
//                     ctx.fillText(board[i][j].Item1, i * 40 + 10, j * 40 + 30);
//                     break;
//             }
//         } else if (board[i][j].Item3) {
//             //display a flag
//         } else {
//             //display a blank square
//         }
//     }
// }

// Box width
var bw = canvas.width;
// Box height
var bh = canvas.height;
p = 0;

function drawBoard() {
    for (var x = 0; x <= bw; x += bw / width) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += bh / height) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(bw + p, 0.5 + x + p);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
}
$(canvas).on("click", function (e) {
    mousex = parseInt(e.clientX - canvasx);
    mousey = parseInt(e.clientY - canvasy);
    // console.log("X: " + mousex + " Y: " + mousey);
    let x = Math.floor(mousex / 40);
    let y = Math.floor(mousey / 40);
    connection.invoke("click", x, y);
    console.log("X: " + x + " Y: " + y);
    // console.log(board[x][y]);
});
drawBoard();
