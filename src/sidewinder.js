const _ = require('lodash');

class Sidewinder {
    static on(grid) {
        grid
            .eachRow(row => {
                let run = [];

                row
                    .forEach(cell => {
                        run.push(cell);

                        const atEasternBoundary = !cell.east;
                        const atNorthernBoundary = !cell.north;

                        const shouldCloseOut = atEasternBoundary
                            || (!atNorthernBoundary && _.random(1) == 0);

                        if (shouldCloseOut) {
                            const member = _.head(_.shuffle(run));

                            if (member.north) {
                                member.link(member.north);
                                run = [];
                            }
                        } else {
                            cell.link(cell.east);
                        }
                    });
            });

        return grid;
    }
}

module.exports = Sidewinder;
