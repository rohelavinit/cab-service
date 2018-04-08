const expect = require('chai').expect
var calculateMinSquareDistance  = require('../common/mathOperation')

describe('Math Operations', () => {

  it('calculate minimmn square distance for cab', () => {
    var minimunDistance = calculateMinSquareDistance(10,20,30,40);
    expect(minimunDistance).to.equal(200);
  })

  it('calculate minimum square distance for cab', () => {
    var minimunDistance = calculateMinSquareDistance(0,20,0,10);
    expect(minimunDistance).to.equal(500);
  })
})