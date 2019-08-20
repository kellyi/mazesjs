const _ = require('lodash');
const Grid = require('./grid');

class DistanceGrid extends Grid {
    contentsOf(cell) {
        if (this.distances && !_.isNil(this.distances.get(cell))) {
            return this.distances.get(cell).toString(36);
        }

        return ' ';
    }
}

module.exports = DistanceGrid;
