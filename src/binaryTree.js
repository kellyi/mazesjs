const _ = require('lodash');

class BinaryTree {
    static on(grid) {
        grid
            .eachCell(cell => {
                const neighbors = [];

                if (cell.north) {
                    neighbors.push(cell.north);
                }

                if (cell.east) {
                    neighbors.push(cell.east);
                }

                const index = _.random(neighbors.length - 1);

                const neighbor = neighbors[index];

                if (neighbor) {
                    cell.link(neighbor);
                }
            });

        return grid;
    }
}

module.exports = BinaryTree;
