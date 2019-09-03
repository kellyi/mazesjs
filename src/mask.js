const fs = require('fs');
const path = require('path');
const _ = require('lodash');

class Mask {
    static fromText(filename) {
        const lines = _.flow(
            _.partialRight(fs.readFileSync, { encoding: 'utf-8' }),
            _.trim,
            _.partialRight(_.split, '\n'),
        )(path.join(__dirname, filename));

        const rows = lines.length;
        const columns = _.head(lines).length;

        const mask = new Mask(rows, columns);

        _.forEach(
            _.range(rows),
            row => _.forEach(
                _.range(columns),
                column => {
                    if (_.get(lines, `[${row}][${column}]`, null) === 'X') {
                        mask.setCell(row, column, false);
                    } else {
                        mask.setCell(row, column, true);
                    }
                }
            )
        );

        return mask;
    }

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.bits = _
            .chain(this.rows)
            .range()
            .map(row => _.range(columns))
            .value();
    }

    getCell(row, column) {
        return _.get(this.bits, `[${row}][${column}]`, false);
    }

    setCell(row, column, isOn) {
        if (_.get(this.bits, `[${row}][${column}]`, false)) {
            this.bits[row][column] = isOn;
        }
    }

    count() {
        return _
            .chain(this.bits)
            .flatMap(_.identity)
            .filter(Boolean)
            .value()
            .length;
    }

    randomLocation() {
        while (true) {
            let row = _.random(this.rows, false);
            let column = _.random(this.columns, false);

            if (this.getCell(row, column)) {
                return [row, column];
            }
        }
    }
}

module.exports = Mask;
