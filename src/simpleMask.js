const Mask = require('./mask');
const MaskedGrid = require('./maskedGrid');
const RecursiveBacktracker = require('./recursiveBacktracker');

function simpleMask() {
    const mask = Mask.fromText('mask.txt');

    const grid = new MaskedGrid(mask);
    RecursiveBacktracker.on(grid);

    return grid.toString();
}

module.exports = simpleMask;
