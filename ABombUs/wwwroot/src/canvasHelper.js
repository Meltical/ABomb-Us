const getCoordsFromEvent = (e) => {
    const x = Math.floor(parseInt(e.clientX - canvasx) / (canvas.width / width))
    const y = Math.floor(
        parseInt(e.clientY - canvasy) / (canvas.height / height)
    )
    return [x, y]
}

const getCoordsFromMousePosition = (x, y) => {
    const c = Math.floor(parseInt(x - canvasx) / (canvas.width / width))
    const r = Math.floor(parseInt(y - canvasy) / (canvas.height / height))
    return [c, r]
}
