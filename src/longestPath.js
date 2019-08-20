const DistanceGrid = require('./DistanceGrid');
const BinaryTree = require('./BinaryTree');

function longestPath({
    size = 10,
    algorithm = BinaryTree,
    startingPosition = [0, 0],
} = {}) {
    const grid = new DistanceGrid(size, size);
    algorithm.on(grid);

    const start = grid.getCell(...startingPosition);
    const distances = start.distances();

    const [
        newStart,
        newDistance,
    ] = distances.max();

    const newDistances = newStart.distances();
    const [
        goal,
        distance,
    ] = newDistances.max();

    grid.distances = newDistances.pathTo(goal);

    return grid.toString();
}

module.exports = longestPath;
