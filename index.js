const argparse = require('argparse');

const Grid = require('./src/grid');
const BinaryTree = require('./src/binaryTree');
const Sidewinder = require('./src/sidewinder');

const binaryTree = 'binaryTree';
const sidewinder = 'sidewinder';

if (process.env.BUILD_ENVIRONMENT !== 'development') {
    const parser = new argparse.ArgumentParser({
        description: 'Maze CLI',
        version: '0.0.0',
    });

    parser.addArgument(
        ['-a', '--algorithm'],
        {
            help: 'Algorithm to use',
        },
    );

    parser.addArgument(
        ['-s', '--size'],
        {
            help: 'Size of the maze',
        },
    );

    const {
        algorithm,
        file,
        size,
    } = parser.parseArgs();

    const AlgorithmClass = (() => {
        switch (algorithm) {
            case sidewinder:
                return Sidewinder;
            case binaryTree:
            default:
                return BinaryTree;
        }
    })();

    const grid = new Grid(size || 4, size || 4);
    AlgorithmClass.on(grid);
    console.log(grid.toString());
} else {
    const grid = new Grid(4, 4);
    Sidewinder.on(grid);
    console.log(grid.toString());
}
