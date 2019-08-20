const _ = require('lodash');

class AldousBroder {
    static on(grid) {
        let cell = grid.getRandomCell();
        let unvisited = grid.size - 1;

        while (unvisited > 0) {
            let neighbor = _.head(_.shuffle(cell.neighbors()));

            if (!neighbor.links().length) {
                cell.link(neighbor);
                unvisited = unvisited - 1;
            }

            cell = neighbor;
        }

        return grid;
    }
}

module.exports = AldousBroder;
