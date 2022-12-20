const startBackgroundMusic = () => {
    const audio = new Audio('./assets/AmogusTrap.mp3')
    audio.loop = true
    audio.volume = 0.5
    audio.play()
}

const playLostSound = () => {
    const audio = new Audio('./assets/vine-boom.mp3')
    audio.volume = 0.3
    audio.play()
}

const playWonSound = () => {
    const audio = new Audio('./assets/ファンファーレ.mp3')
    audio.play()
}
