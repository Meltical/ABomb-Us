const startTimer = () => {
    //TODO: Remove date when we have a server start time, then use a counter
    const startDate = new Date()
    intervalId = setInterval(showTime, 1000)
    function showTime() {
        const now = new Date()
        const diff = now - startDate
        const seconds = ('0' + (Math.floor(diff / 1000) % 60)).slice(-2)
        const minutes = ('0' + (Math.floor(diff / 60000) % 60)).slice(-2)
        const hours = ('0' + Math.floor(diff / 3600000)).slice(-2)
        const currentTime = `${hours}:${minutes}:${seconds}`
        updateTimer(currentTime)
    }
}

const stopTimer = () => clearInterval(intervalId)
