const handleGameLost = () => {
    stopTimer()
    playLostSound()
    displayOverlayLost()
}

const handleGameWon = () => {
    stopTimer()
    playWonSound()
    diplsayOverlayWon()
}

const handleNewGame = () => {
    stopTimer()
    resetOverlay()
}

const handleStartGame = () => {
    stopTimer()
    startTimer()
}
