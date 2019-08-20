const fs = require('fs');
const argparse = require('argparse');

const Grid = require('./src/grid');
const DistanceGrid = require('./src/distanceGrid');
const BinaryTree = require('./src/binaryTree');
const Sidewinder = require('./src/sidewinder');
const shortestPath = require('./src/shortestPath');
const longestPath = require('./src/longestPath');
const binaryTree = 'binaryTree';
const sidewinder = 'sidewinder';

if (process.env.BUILD_ENVIRONMENT !== 'development') {
    const parser = new argparse.ArgumentParser({
        description: 'Maze CLI',
        version: '0.0.0',
    });

    parser.addArgument(['-a', '--algorithm'], {
        help: 'Algorithm to use',
    });

    parser.addArgument(['-f', '--file'], {
        help: 'File name for saving image',
    });

    parser.addArgument(['-s', '--size'], {
        help: 'Size of the maze',
    });

    parser.addArgument(['-d', '--shortestPath'], {
        help: 'Print shortest path from NW to SW corner',
    });

    parser.addArgument(['-c', '--cost'], {
        help: 'Print cost distance of each cell starting from NW corner',
    });

    const { algorithm, file, size, shortestPath, cost } = parser.parseArgs();

    const AlgorithmClass = (() => {
        switch (algorithm) {
            case sidewinder:
                return Sidewinder;
            case binaryTree:
            default:
                return BinaryTree;
        }
    })();

    const GridClass = (() => {
        if (shortestPath || cost) {
            return DistanceGrid;
        }

        return Grid;
    })();

    const grid = new GridClass(size || 4, size || 4);
    AlgorithmClass.on(grid);

    if (shortestPath) {
        const start = grid.getCell(0, 0);
        const distances = start.distances();
        grid.distances = distances.pathTo(grid.getCell(grid.rows - 1, 0));
    } else if (cost) {
        const start = grid.getCell(0, 0);
        const distances = start.distances();
        grid.distances = distances;
    }

    const maze = grid.toString();

    if (file) {
        fs.writeFileSync(`${__dirname}/${file}`, maze, 'utf8');
    }

    console.log(maze);
} else {
    const grid = longestPath();
    console.log(grid);
}
