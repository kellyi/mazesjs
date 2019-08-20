const Grid = require('./Grid');
const AldousBroder = require('./aldousBroder');

function maze({
    size = 10,
    algorithm = AldousBroder,
} = {}) {
    const grid = new Grid(size, size);
    algorithm.on(grid);

    return grid.toString();
}

module.exports = maze;
