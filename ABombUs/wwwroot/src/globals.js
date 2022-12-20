const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
//TODO: Replace this by the offset of the canvas caontainer
const canvasx = $(canvas).offset().left
const canvasy = $(canvas).offset().top

const canvasHover = document.getElementById('canvasHover')
const ctxHover = canvasHover.getContext('2d')

let board = []
const width = 30
const height = 15

let currentState

spriteimage = new Image()
spriteimage.src = './assets/2000.png'

let intervalId
