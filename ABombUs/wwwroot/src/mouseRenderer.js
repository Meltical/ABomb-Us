const drawMouseIcon = (id, c, r) => {
    let canvasOtherHover = document.getElementById('canvas-' + id)
    //TODO: Draw mouse as png on a separate canvas (the highest z-index canvas)
    //TODO: get color from server
    const color = 'red'
    // Remove Color from parameters and use the color from the server
    drawMouseHover(id, c, r, color)
    if (!canvasOtherHover) {
        //TODO: Draw each players' mouse hover effects on a separate canvas (between the board and the mouse canvas) (One canvas by player)
        let canvasOtherHover = document.createElement('canvas')
        canvasOtherHover.id = 'canvas-' + id
        canvasOtherHover.width = canvas.width
        canvasOtherHover.height = canvas.height
        canvasOtherHover.style.zIndex = 3
        document.body.appendChild(canvasOtherHover)

        // const mouseDummy = document.getElementById('mouse-dummy')
        // mouse = mouseDummy.cloneNode(true)
        // mouse.id = id
        // mouse.style.display = 'unset'
        // mouse.style.position = 'absolute'
        // mouse.style.zIndex = 4
        // document.body.appendChild(mouse)
    }
    // const x = 16 + (c * canvasHover.width) / width
    // const y = 16 + (r * canvasHover.height) / height
    // mouse.style.left = x + 'px'
    // mouse.style.top = y + 'px'
    // mouse.children[0].style.fill = color
}

const drawMouseHover = (id, c, r, color) => {
    let canvasOtherHover = document.getElementById('canvas-' + id)
    if (!canvasOtherHover) {
        return
    }
    const ctxOtherHover = canvasOtherHover.getContext('2d')
    ctxOtherHover.clearRect(
        0,
        0,
        canvasOtherHover.width,
        canvasOtherHover.height
    )
    ctxOtherHover.fillStyle = color
    ctxOtherHover.globalAlpha = 0.15
    ctxOtherHover.fillRect(
        (c * canvasOtherHover.width) / width,
        (r * canvasOtherHover.height) / height,
        canvasOtherHover.width / width,
        canvasOtherHover.height / height
    )
    ctxOtherHover.globalAlpha = 1
}
