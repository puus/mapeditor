/**
 * Room
 */

class Room {

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
     * Add Note
     *
     * Add a note to the DOM node dataset notes property
     */
    addNote(title, note) {

        let notes = JSON.parse(this.div.dataset.notes);
        if (typeof(notes[title]) == 'undefined') {
            notes[title] = note;
            this.div.dataset.notes = JSON.stringify(notes);
        }
    }

    /**
     * Has Note Indicator
     *
     * Check if this Room has an icon informing the user it has notes attached
     */
    hasNoteIndicator() {

        for (let child in this.div.childNodes) {
            if (this.div.childNodes.hasOwnProperty(child)) {
                let n = this.div.childNodes[child];
                if(n.nodeType == 'I' && n.classList.contains('noteIcon')) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Set Note Indicator
     *
     * Add an icon indicator letting the user know this Room has notes
     */
    setNoteIndicator() {

        let i = document.createElement('i');
        i.classList.add('fa');
        i.classList.add('fa-sticky-note-o');
        i.classList.add('noteIcon');
        this.div.appendChild(i);
    }

    /**
     * Remove Note Indicator
     *
     * Remove the <i> DOM node representing the note icon
     */
    removeNoteIndicator() {

        for (let child in this.div.childNodes) {
            if (this.div.childNodes.hasOwnProperty(child)) {
                let n = this.div.childNodes[child];
                if(n.nodeType == 'I' && n.classList.contains('noteIcon')) {
                    this.div.removeChild(n);
                }
            }
        }
    }

    /**
     * Delete Note
     *
     * Delete a note with given title
     *
     * @param String title Title of note to find and delete
     */
    deleteNote(title) {

        let notes = JSON.parse(this.div.dataset.notes);
        if (notes.hasOwnProperty(title)) {
            delete notes[title];
        }

        this.div.dataset.notes = JSON.stringify(notes);
    }

    /**
     * Set Wall
     *
     * Set properties of one of the Rooms four walls
     *
     * @param String direction One of: north, east, south or west
     * @param Bool   enabled
     * @param Bool   visible
     * @param Bool   solid
     * @param Bool   breakable
     * @param Int    breakValue
     */
    setWall(direction, enabled, visible, solid, breakable, breakValue) {

        switch(direction) {
            case 'north':
                if (enabled && (visible || solid)) {
                    let data = {};
                    data.visible = visible;
                    data.solid = solid;
                    data.breakable = breakable;
                    data.breakValue = breakValue;
                    this.div.dataset.northWall = JSON.stringify(data);
                    this.div.classList.add('north-wall');
                } else {
                    this.div.dataset.northWall = '{}';
                    this.div.classList.remove('north-wall');
                }
                break;
            case 'east':
                if (enabled && (visible || solid)) {
                    let data = {};
                    data.visible = visible;
                    data.solid = solid;
                    data.breakable = breakable;
                    data.breakValue = breakValue;
                    this.div.dataset.eastWall = JSON.stringify(data);
                    this.div.classList.add('east-wall');
                } else {
                    this.div.dataset.eastWall = '{}';
                    this.div.classList.remove('east-wall');
                }
                break;
            case 'south':
                if (enabled && (visible || solid)) {
                    let data = {};
                    data.visible = visible;
                    data.solid = solid;
                    data.breakable = breakable;
                    data.breakValue = breakValue;
                    this.div.dataset.southWall = JSON.stringify(data);
                    this.div.classList.add('south-wall');
                } else {
                    this.div.dataset.southWall = '{}';
                    this.div.classList.remove('south-wall');
                }
                break;
            case 'west':
                if (enabled && (visible || solid)) {
                    let data = {};
                    data.visible = visible;
                    data.solid = solid;
                    data.breakable = breakable;
                    data.breakValue = breakValue;
                    this.div.dataset.westWall = JSON.stringify(data);
                    this.div.classList.add('west-wall');
                } else {
                    this.div.dataset.westWall = '{}';
                    this.div.classList.remove('west-wall');
                }
                break;
        }
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
