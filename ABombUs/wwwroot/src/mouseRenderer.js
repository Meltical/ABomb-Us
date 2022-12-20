const drawMouseIcon = (id, c, r) => {
    let mouse = document.getElementById(id)
    //TODO: get color from server
    //TODO: Draw mouse as png on a separate canvas (the highest z-index canvas)
    //TODO: Draw each players' mouse hover effects on a separate canvas (between the board and the mouse canvas) (One canvas by player)
    const color = 'red'
    drawMouseHover(c, r, color)
    if (!mouse) {
        const mouseDummy = document.getElementById('mouse-dummy')
        mouse = mouseDummy.cloneNode(true)
        mouse.id = id
        mouse.style.display = 'unset'
        mouse.style.position = 'absolute'
        mouse.style.zIndex = 4
        document.body.appendChild(mouse)
    }
    const x = 16 + (c * canvasHover.width) / width
    const y = 16 + (r * canvasHover.height) / height
    mouse.style.left = x + 'px'
    mouse.style.top = y + 'px'
    mouse.children[0].style.fill = color
}

const drawMouseHover = (c, r, color) => {
    ctxHover.clearRect(0, 0, canvasHover.width, canvasHover.height)
    ctxHover.fillStyle = color
    ctxHover.globalAlpha = 0.15
    ctxHover.fillRect(
        (c * canvasHover.width) / width,
        (r * canvasHover.height) / height,
        canvasHover.width / width,
        canvasHover.height / height
    )
    ctxHover.globalAlpha = 1
}
