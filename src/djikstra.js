const DistanceGrid = require('./DistanceGrid');
const BinaryTree = require('./BinaryTree');

const grid = new DistanceGrid(10, 10);
BinaryTree.on(grid);

const start = grid.getCell(0, 0);

const distances = start.distances();
grid.distances = distances;

console.log(grid.toString());

grid.distances = distances.pathTo(
    grid.getCell(
        grid.rows - 1,
        0,
    ),
);

console.log(grid.toString());
