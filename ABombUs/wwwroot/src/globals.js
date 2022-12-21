const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
//TODO: Replace this by the offset of the canvas caontainer
const canvasx = $(canvas).offset().left
const canvasy = $(canvas).offset().top

const canvasEvent = document.getElementById('canvasEvent')

let board = []
const width = 30
const height = 15

let currentState

spriteimage = new Image()
spriteimage.src = './assets/2000.png'

let intervalId

let mouseColor = '#ff0000'
