const _ = require('lodash');

class RecursiveBacktracker {
    static on(grid, startAt = grid.getRandomCell()) {
        let stack = [];
        stack.push(startAt);

        while (stack.length) {
            let current = _.last(stack);
            let neighbors = current
                .neighbors()
                .filter(n => n.links().length === 0);

            if (!neighbors.length) {
                stack.pop();
            } else {
                let neighbor = _.sample(neighbors);
                current.link(neighbor);
                stack.push(neighbor);
            }
        }

        return grid;
    }
}

module.exports = RecursiveBacktracker;
