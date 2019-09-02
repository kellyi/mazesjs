const fs = require('fs');
const path = require('path');
const argparse = require('argparse');
const text2png = require('text2png');

const Grid = require('./src/grid');
const DistanceGrid = require('./src/distanceGrid');
const BinaryTree = require('./src/binaryTree');
const Sidewinder = require('./src/sidewinder');
const AldousBroder = require('./src/aldousBroder');
const Wilson = require('./src/wilson');
const HuntAndKill = require('./src/huntAndKill');
const RecursiveBacktracker = require('./src/recursiveBacktracker');
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

    parser.addArgument(['-d', '--djikstra'], {
        help: 'Print shortest path from NW to SW corner',
    });

    parser.addArgument(['-c', '--cost'], {
        help: 'Print cost distance of each cell starting from NW corner',
    });

    const { algorithm, file, size, djikstra, cost } = parser.parseArgs();

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
        if (djikstra || cost) {
            return DistanceGrid;
        }

        return Grid;
    })();

    const grid = new GridClass(size || 4, size || 4);
    AlgorithmClass.on(grid);

    if (djikstra) {
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
    const grid = longestPath({ algorithm: AldousBroder });

    console.log(grid);

    const otherGrid = new DistanceGrid(10, 10);
    RecursiveBacktracker.on(otherGrid);
    console.log(otherGrid.toString());

    fs.writeFileSync('maze.png', text2png(grid.toString(), {
        font: '50px LispM',
        localFontName: 'LispM',
        localFontPath: path.join(__dirname, '../../Library/Fonts/LispM-Monospace(1).ttf'),
        backgroundColor: 'white',
        color: 'black',
    }));
}

