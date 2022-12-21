const handleMouseMove = (id, c, r, color) => {
    drawMouseHover(id, c, r, color)
    drawMouseIcon(id, c, r, color)
}

const drawMouseHover = (id, c, r, color) => {
    let canvasOtherHover = document.getElementById('canvas-' + id)
    if (!canvasOtherHover) {
        let canvasOtherHover = document.createElement('canvas')
        canvasOtherHover.id = 'canvas-' + id
        canvasOtherHover.width = canvas.width
        canvasOtherHover.height = canvas.height
        canvasOtherHover.style.zIndex = 3
        document.body.appendChild(canvasOtherHover)
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

const drawMouseIcon = (id, c, r, color) => {
    let mouse = document.getElementById('mouse-' + id)
    if (!mouse) {
        const mouseDummy = document.getElementById('mouse-dummy')
        mouse = mouseDummy.cloneNode(true)
        mouse.id = 'mouse-' + id
        mouse.style.display = 'unset'
        mouse.style.position = 'absolute'
        mouse.style.zIndex = 4
        document.body.appendChild(mouse)
    }
    const x = ((c + 0.5) * canvas.width) / width
    const y = ((r + 0.5) * canvas.height) / height
    mouse.style.left = x + 'px'
    mouse.style.top = y + 'px'
    mouse.children[0].style.fill = color
}

//use the <input> to change the color of the mouse
$('#colorPicker').on('change', function () {
    mouseColor = $(this).val()
})
