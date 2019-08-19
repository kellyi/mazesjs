const _ = require('lodash');
const Grid = require('./grid');

class DistanceGrid extends Grid {
    contentsOf(cell) {
        return (this.distances && !_.isNil(this.distances.get(cell)))
            ? this.distances.get(cell).toString(36)
            : ' ';
    }
}

module.exports = DistanceGrid;
