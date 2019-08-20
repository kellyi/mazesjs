const _ = require('lodash');

class Wilson {
    static on(grid) {
        let unvisited = {};
        grid
            .eachCell(cell => {
                unvisited[cell] = cell;
            });

        let first = _.sample(unvisited);
        delete unvisited[first];

        while (!_.isEmpty(unvisited)) {
            let cell = _.sample(unvisited);
            let path = [cell];

            while (unvisited[cell]) {
                cell = _.sample(cell.neighbors());
                let position = path.indexOf(cell);

                if (position > -1) {
                    path = path.slice(0, position + 1);
                } else {
                    path.push(cell);
                }
            }

            _.range(0, path.length - 1).forEach(index => {
                path[index].link(path[index + 1]);
                delete unvisited[path[index]];
            });
        }

        return grid;
    }
}

module.exports = Wilson;
