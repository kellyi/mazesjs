const _ = require('lodash');
const Cell = require('./cell');

class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.grid = this.prepareGrid();
        this.configureCells();
    }

    prepareGrid() {
        return _.map(
            _.range(this.rows),
            row => _.map(
                _.range(this.cols),
                col => new Cell(row, col),
            ),
        );
    }

    configureCells() {
        return this
            .grid
            .flat()
            .forEach(cell => {
                const row = cell.row;
                const col = cell.col;

                if (row - 1 > -1) {
                    cell.north = this.getCell(row - 1, col);
                }

                if (row + 1 < this.rows) {
                    cell.south = this.getCell(row + 1, col);
                }

                if (col - 1 > -1) {
                    cell.west = this.getCell(row, col - 1);
                }

                if (col + 1 < this.cols) {
                    cell.east = this.getCell(row, col + 1);
                }
            });
    }

    getCell(row, col) {
        return _.get(this.grid, `[${row}][${col}]`, null);
    }

    getRandomCell() {
        const row = _.random(this.rows - 1);
        const col = _.random(this.grid[row].length - 1);

        return this.getCell(row, col);
    }

    eachRow(fn) {
        return this
            .grid
            .forEach(fn);
    }

    eachCell(fn) {
        return this
            .grid
            .flat()
            .forEach(fn);
    }

    contentsOf(cell) {
        return ' ';
    }

    toString() {
        let output = '+' + '---+'.repeat(this.cols) + '\n';

        this
            .eachRow(row => {
                let top = '|';
                let bottom = '+';

                row
                    .forEach(cell => {
                        const cellForString = cell || new Cell(-1, -1);
                        const body = (() => {
                            const contents = this.contentsOf(cell);

                            if (contents.length === 1) {
                                return ` ${contents} `;
                            }

                            if (contents.length === 2) {
                                return ` ${contents}`;
                            }

                            return contents;
                        })();

                        const eastBoundary = cell.isLinkedTo(cell.east) ? ' ' : '|';

                        top += body;
                        top += eastBoundary;

                        const southBoundary = cell.isLinkedTo(cell.south) ? '   ' : '---';
                        const corner = '+';

                        bottom += southBoundary;
                        bottom += corner;
                    });

                output += top;
                output += '\n';
                output += bottom;
                output += '\n';
            });

        return output;
    }
}

module.exports = Grid;
