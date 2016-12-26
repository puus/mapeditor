/**
 * Map
 *
 * Model of a 2D grid wherein each cell contains a Room
 *
 * @requires Room
 */

import Room from "./Room.js";

class Map {

    /**
     * Constructor
     *
     * Initialize a new map
     *
     * @param String name Name of this map
     * @param Int    x    Size in the X dimension (# of columns)
     * @param Int    y    Size in the Y dimension (# of rows)
     */
    constructor(name, x, y) {

        this.name = name;
        this.x = x;
        this.y = y;
        this.controls = null;

        this._init();
    }

    /**
     * Init
     *
     * Initialize the map as a jagged array of [this.x][this.y] of Rooms
     */
    _init() {

        this.map = [];

        for(let iX = 0; iX < this.x; iX++) {
            this.map[iX] = [];

            for(let iY = 0; iY < this.y; iY++) {
                this.map[iX][iY] = new Room();
            }
        }
    }

    /**
     * Draw
     *
     * Build and return DOM node representing menu HTML structure
     */
    draw() {

        let map = document.createElement('div');
        map.classList.add('map');

        for(let iX = 0; iX < this.x; iX++) {
            let row = document.createElement('div');
            row.classList.add('row');

            for(let iY = 0; iY < this.y; iY++) {
                let room = this.map[iX][iY].draw();
                room.dataset.x = iX;
                room.dataset.y = iY;
                row.appendChild(room);
            }

            map.appendChild(row);
        }

        return map;
    }

    /**
     * Deselect Rooms
     *
     * Set selected = false for all Rooms
     */
    deselectRooms() {

        for(let iX = 0; iX < this.x; iX++) {
            for(let iY = 0; iY < this.y; iY++) {
                this.map[iX][iY].selected = false;
            }
        }
    }

    /**
     * Select Room
     *
     * Set selected = true for room at (x, y) and handle UI concerns
     */
    selectRoom(x, y) {

        this._enableControls();
        this.map[x][y].selected = true;
        this.controls.reset(this.map[x][y]);
    }

    /**
     * Get Selected Room
     *
     * Return the first room marked as selected
     */
    getSelectedRoom() {

        for(let iX = 0; iX < this.x; iX++) {
            for(let iY = 0; iY < this.y; iY++) {
                if(this.map[iX][iY].selected) {
                    return this.map[iX][iY];
                }
            }
        }
    }

    setControls(controls) {
        this.controls = controls;
    }

    /**
     * Enable Controls
     *
     * Ensure the controls DOM node has the class of active
     */
    _enableControls() {

        let controls = document.getElementById('controls');
        if (!controls.classList.contains('active')){
            controls.classList.add('active');
        }
    }
}

export default Map;
