const updateBombCount = () => {
    $('#bombs').text(
        99 - board.reduce((acc, x) => acc + x.filter((y) => y.Item3).length, 0)
    )
}

const updateTimer = (timerString) => $('#timer').text(timerString)

function initializeOverlay() {
    const resizeCanvas = () => {
        canvas.width = Math.min(window.innerWidth, 1400)
        canvas.height = canvas.width / 2
        canvasHover.width = canvas.width
        canvasHover.height = canvas.height
        document.getElementById('offset').style.width = canvas.width + 'px'
        document.getElementById('offset').style.height = canvas.height + 'px'
        document.getElementById('menu').style.width = canvas.width + 'px'
        updateBoard([], [])
    }

    window.addEventListener('resize', resizeCanvas, false)
    resizeCanvas()
}
initializeOverlay()

const resetOverlay = () => {
    document.getElementById('bombs').innerHTML = '99'
    document.getElementById('overlay').style.display = 'none'
    document.getElementById('overlay-text').innerHTML = ''
    updateTimer('00:00:00')
}

const displayOverlayLost = () => {
    document.getElementById('overlay').style.display = 'flex'
    document.getElementById('overlay-text').innerHTML = 'You Lost!'
}

const diplsayOverlayWon = () => {
    document.getElementById('overlay').style.display = 'flex'
    document.getElementById('overlay-text').innerHTML = 'You Won!'
}
