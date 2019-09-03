const _ = require('lodash');

const Grid = require('./grid');
const Cell = require('./cell');

class MaskedGrid extends Grid {
    constructor(mask) {
        super(mask.rows, mask.columns, true);
        this.mask = mask;
        this.grid = this.prepareGrid();
        this.configureCells();
    }

    prepareGrid() {
        return _
            .chain(this.rows)
            .range()
            .map(row => _.map(
                _.range(this.cols),
                column => {
                    if (this.mask.getCell(row, column)) {
                        return new Cell(row, column);
                    }

                    return null;
                }
            ))
            .value();
    }

    getRandomCell() {
        return this.getCell(
            ...this.mask.randomLocation(),
        );
    }

    size() {
        return this.mask.count();
    }
}

module.exports = MaskedGrid;
