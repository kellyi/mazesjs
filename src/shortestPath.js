const DistanceGrid = require('./DistanceGrid');
const AldousBroder = require('./AldousBroder');

function shortestPath({
    size = 10,
    algorithm = AldousBroder,
    startingPosition = [0, 0]
} = {}) {
    const grid = new DistanceGrid(size, size);
    algorithm.on(grid);

    const start = grid.getCell(...startingPosition);

    const distances = start.distances();
    grid.distances = distances;

    grid.distances = distances.pathTo(
        grid.getCell(
            grid.rows - 1,
            0,
        ),
    );

    return grid.toString();
}

module.exports = shortestPath;
