const _ = require('lodash');

const Distances = require('./distances');

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.id = `${row},${col}`;
        this.linksToOtherCells = {};
        this.north = null;
        this.south = null;
        this.west = null;
        this.east = null;
    }

    link(cell, bidirectional = true) {
        this.linksToOtherCells[cell] = cell;

        if (bidirectional) {
            cell.link(this, false);
        }

        return this;
    }

    unlink(cell, bidirectional = true) {
        delete this.linksToOtherCells[cell];

        if (bidirectional) {
            cell.unlink(this, false);
        }

        return this;
    }

    toString() {
        return this.id;
    }

    links() {
        return Object.values(this.linksToOtherCells);
    }

    isLinkedTo(cell) {
        return cell
            ? Object.keys(this.linksToOtherCells).includes(cell.toString())
            : false;
    }

    neighbors() {
        const list = [];

        if (this.north) {
            list.push(this.north);
        }

        if (this.south) {
            list.push(this.south);
        }

        if (this.west) {
            list.push(this.west);
        }

        if (this.east) {
            list.push(this.east);
        }

        return list;
    }

    distances() {
        const currentCell = this;
        const distances = new Distances(currentCell);
        let frontier = [currentCell];

        while (frontier.length) {
            let newFrontier = [];

            frontier
                .forEach(cell => {
                    cell
                        .links()
                        .forEach(linkedCell => {
                            if (linkedCell === currentCell) {
                                _.noop();
                            } else if (!distances.get(linkedCell)) {
                                distances.set(
                                    linkedCell,
                                    distances.get(cell) + 1,
                                );

                                newFrontier.push(linkedCell);
                            }
                        });
                });

            frontier = newFrontier;
        }

        return distances;
    }
}

module.exports = Cell;
