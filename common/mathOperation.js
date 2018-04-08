function calculateMinSquareDistance(x1, x2, y1, y2){
    return (Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
}

module.exports = calculateMinSquareDistance