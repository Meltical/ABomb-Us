const updateBombCount = () => {
    $('#bombs').text(
        99 - board.reduce((acc, x) => acc + x.filter((y) => y.Item3).length, 0)
    )
}

const updateTimer = (timerString) => $('#timer').text(timerString)

function initializeOverlay() {
    const resizeCanvas = () => {
        document.querySelectorAll('canvas').forEach((canvas) => {
            canvas.width = Math.min(window.innerWidth, 1080)
            canvas.height = canvas.width / 2
            //tried to center the canvas but we must then move the eventlistener
            // canvas.style.left = (window.innerWidth - canvas.width) / 2 + 'px'
        })
        document.getElementById('offset').style.width = canvas.width + 'px'
        document.getElementById('offset').style.height = canvas.height + 'px'
        let menu = document.getElementById('menu')
        menu.style.width = canvas.width + 'px'
        // menu.style.marginLeft = (window.innerWidth - canvas.width) / 2 + 'px'
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
