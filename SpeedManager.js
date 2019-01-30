
class SpeedManager
{
    constructor(levels)
    {
        this.speed = null;
        this.levels = levels;
        this.speedNode = document.querySelector('#speed');
        this.levelNode = document.querySelector('#level');
    }

    init()
    {
        this.listenControls();
    }

    listenControls()
    {
        this.levelNode.onchange = (event) => {
            this.createSpeed();
            this.speedNode.focus();
        };

        document.body.onkeydown = (event) => {
            // Enter key press
            if (event.keyCode == 13 && ! this.hasActiveSpeed()) {
                this.createSpeed();
            }

            // Space key press
            if (event.keyCode == 32 && this.hasActiveSpeed()) {
                this.speed.play();
            }
        };
    }

    hasActiveSpeed()
    {
        return this.speed && ! this.speed.finishedFlag;
    }

    createSpeed()
    {
        if (this.speed) {
            this.speed.finish();
        }

        const level = this.levels[this.levelNode.value];

        this.speed = new Speed(this.speedNode, level);
        this.speed.init();
    }
}
