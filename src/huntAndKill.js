const _ = require('lodash');

class HuntAndKill {
    static on(grid) {
        let current = grid.getRandomCell();

        while (current !== null) {
            let unvisitedNeighbors = _.filter(
                current.neighbors(),
                n => _.isEmpty(n.links()),
            );

            if (unvisitedNeighbors.length) {
                let neighbor = _.sample(unvisitedNeighbors);
                current.link(neighbor);
                current = neighbor;
            } else {
                current = null;

                try {
                    grid
                        .eachCell(cell => {
                            let visitedNeighbors = _.filter(
                                cell.neighbors(),
                                n => _.isEmpty(n.links()),
                            );

                            if (_.isEmpty(cell.links()) && !_.isEmpty(visitedNeighbors)) {
                                current = cell;

                                let neighbor = _.sample(visitedNeighbors);
                                current.link(neighbor);

                                throw 'break';
                            }
                        });
                } catch (control) {
                    _.noop();
                }
            }
        }

        return grid;
    }
}

module.exports = HuntAndKill;
