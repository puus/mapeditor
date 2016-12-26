/**
 * Trap
 */

class Trap {

    /**
     * Constructor
     *
     * Initialize a new Room
     */
    constructor() {

        this.div = this._constructElement();
        this.selected = false;
    }

    /**
     * Construct Element
     *
     * Build and return DOM node representing the HTML structure of a Room
     */
    _constructElement() {

        let div = document.createElement('div');
        div.classList.add('room');
        div.dataset.northWall = '{}';
        div.dataset.eastWall  = '{}';
        div.dataset.southWall = '{}';
        div.dataset.westWall  = '{}';
        div.dataset.notes     = '{}';

        return div;
    }


    /**
     * Draw
     *
     * Build and return DOM node representing menu HTML structure
     */
    draw() {

        if (this.selected) {
            this.div.classList.add('selected');
        } else {
            this.div.classList.remove('selected');
        }

        return this.div;
    }
}

export default Room;
