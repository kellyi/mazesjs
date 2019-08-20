const _ = require('lodash');

class Distances {
    constructor(root) {
        this.root = root;
        this.cells = {
            [root]: {
                distance: 0,
                cell: root,
            },
        };
    }

    get(cell) {
        return _.get(this.cells, `${cell.toString()}.distance`, null);
    }

    set(cell, distance) {
        this.cells[cell] = {
            distance,
            cell,
        };
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

    max() {
        let maxDistance = 0;
        let maxCell = this.root;

        Object
            .entries(this.cells)
            .forEach(([cellID, { distance, cell }]) => {
                if (distance > maxDistance) {
                    maxCell = cell;
                    maxDistance = distance;
                }
            });

        return [
            maxCell,
            maxDistance,
        ];
    }
}

module.exports = Distances;
