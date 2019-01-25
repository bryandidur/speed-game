
class SpeedRow
{
    constructor(node, time, squares, index)
    {
        this.node = node;
        this.time = time;
        this.squares = squares;
        this.index = index;
        this.items = [];
        this.currentPosition = 0;
        this.interval = null;
        this.direction = null;
        this.makeItems();
        this.resetMove();
    }

    start()
    {
        this.move();

        this.interval = window.setInterval(() => {
            if (this.currentPosition == 0) {
                this.direction = 'right';
            }

            if (this.calculateCurrentLastPosition() == this.items.length - 1) {
                this.direction = 'left';
            }

            if (this.direction == 'right' && this.calculateCurrentLastPosition() <= this.items.length - 1) {
                this.currentPosition++;
            }

            if (this.direction == 'left' && this.currentPosition >= 0) {
                this.currentPosition--;
            }

            this.move();
        }, this.time);
    }

    stop()
    {
        if (this.interval) {
            window.clearInterval(this.interval);

            this.interval = null;
        }
    }

    move()
    {
        this.items.forEach((item, index) => {
            if (index >= this.currentPosition && index <= this.calculateCurrentLastPosition()) {
                item.setActive();
            } else {
                item.setInative();
            }
        });
    }

    resetMove()
    {
        this.items.forEach((item, index) => {
            item.setInative();
        });
    }

    calculateCurrentLastPosition()
    {
        return this.currentPosition + (this.squares - 1);
    }

    getActiveItems(onlyIndex = true)
    {
        const items = this.items.filter((item) => item.active);

        if (onlyIndex) {
            return items.map((item) => item.index);
        }

        return items;
    }

    markAsWinner()
    {
        this.getActiveItems(false).forEach((item) => {
            item.setSuccess();
        });
    }

    markAsLose()
    {
        this.getActiveItems(false).forEach((item) => {
            item.setFailed();
        });
    }

    makeItems()
    {
        const nodeElements = this.node.querySelectorAll('.speed-item');

        nodeElements.forEach((element, index) => {
            this.items.push(new SpeedItem(element, index));
        });
    }
}
