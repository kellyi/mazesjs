const _ = require('lodash');

class Distances {
    constructor(root) {
        this.root = root;
        this.cells = {
            [root]: 0,
        };
    }

    get(cell) {
        return this.cells[cell];
    }

    set(cell, distance) {
        this.cells[cell] = distance;
    }

    cells() {
        return Object.keys(this.cells);
    }

    pathTo(goal) {
        let current = goal;
        const breadcrumbs = new Distances(this.root);
        breadcrumbs.set(current, this.get(current));

        while (current.toString() !== this.root.toString()) {
            try {
                current
                    .links()
                    .forEach(neighbor => {
                        if (this.get(neighbor) < this.get(current)) {
                            breadcrumbs.set(neighbor, this.get(neighbor));
                            current = neighbor;
                            throw new Error('break!');
                        }
                    });
            } catch (e) {
                _.noop();
            }
        }

        return breadcrumbs;
    }
}

module.exports = Distances;
