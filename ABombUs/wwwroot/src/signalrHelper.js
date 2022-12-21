const invokeNewGame = () => connection.invoke('NewGame')
const invokeFlag = (x, y) => connection.invoke('Flag', x, y)
const invokeGetBoard = () => connection.invoke('GetBoard')
const invokeMouseMove = (x, y) =>
    connection.invoke('MouseMove', x, y, mouseColor)
const invokeClick = (x, y) => connection.invoke('Click', x, y)
const invokeStartGame = (x, y) => connection.invoke('StartGame', x, y)
