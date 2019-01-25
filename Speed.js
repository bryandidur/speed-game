
class Speed
{
    constructor(node, level)
    {
        this.node = node;
        this.level = level;
        this.rows = [];
        this.currentRow = null;
        this.finishedFlag = false;
        this.nodeRows = this.node.querySelectorAll('.speed-row');
    }

    init()
    {
        this.nodeRows.forEach((node, index) => {
            const config = this.level[index];

            this.rows.push(new SpeedRow(node, config.time, config.squares, index));
        });
    }

    play()
    {
        if (this.currentRow === 0) {
            this.rows[0].stop();
            this.finished(true);
            return;
        }

        if (this.currentRow === null) {
            this.currentRow = this.rows.length - 1;
        } else {
            this.currentRow--;
        }

        const lastPlayingRow = this.rows[this.currentRow + 1];
        const previousLastPlayingRow = this.rows[this.currentRow + 2];

        if (lastPlayingRow) {
            lastPlayingRow.stop();

            if (previousLastPlayingRow) {
                const lastPlayingRowActiveItems = lastPlayingRow.getActiveItems();
                const previousLastPlayingRowActiveItems = previousLastPlayingRow.getActiveItems();

                const hasMatch = lastPlayingRowActiveItems.some((item) => {
                    return previousLastPlayingRowActiveItems.includes(item);
                });

                if (! hasMatch) {
                    this.finished(false);
                    return;
                }
            }
        }

        this.rows[this.currentRow].start();
    }

    finished(winner)
    {
        if (winner) {
            this.rows.forEach((row) => {
                row.markAsWinner();
            });
        } else {
            this.rows.forEach((row) => {
                row.markAsLose();
            });
        }

        this.finishedFlag = true;
    }

    finish()
    {
        this.rows.forEach((row) => {
            row.stop();
        });
    }
}
