class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.id = `${row},${col}`;
        this.links_to_other_cells = {};
        this.north = null;
        this.south = null;
        this.west = null;
        this.east = null;
    }

    link(cell, bidirectional = true) {
        this.links_to_other_cells[cell] = true;

        if (bidirectional) {
            cell.link(this, false);
        }

        return this;
    }

    unlink(cell, bidirectional = true) {
        delete this.links_to_other_cells[cell];

        if (bidirectional) {
            cell.unlink(this, false);
        }

        return this;
    }

    toString() {
        return this.id;
    }

    links() {
        return Object.keys(this.links_to_other_cells);
    }

    isLinkedTo(cell) {
        return cell
            ? Object.keys(this.links_to_other_cells).includes(cell.toString())
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
}

module.exports = Cell;
