
class SpeedItem
{
    constructor(node, index)
    {
        this.node = node;
        this.index = index;
        this.active = false;
    }

    setActive()
    {
        this.node.classList.remove('success');
        this.node.classList.remove('failed');
        this.node.classList.add('active');
        this.active = true;
    }

    setInative()
    {
        this.node.classList.remove('success');
        this.node.classList.remove('failed');
        this.node.classList.remove('active');
        this.active = false;
    }

    setSuccess()
    {
        this.node.classList.remove('failed');
        this.node.classList.add('success');
    }

    setFailed()
    {
        this.node.classList.remove('success');
        this.node.classList.add('failed');
    }
}
