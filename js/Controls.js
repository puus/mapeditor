/**
 * Controls
 *
 *
 */
class Controls {

    /**
     * Constructor
     *
     * Initialize new Controls
     */
    constructor(map) {

        this._map = map;
        this._initWallControls();
        this._initNoteControls();
        this._initTrapControls();
    }

    /**
     * Init Wall Controls
     *
     * Get references to DOM nodes and set onclick handlers
     */
    _initWallControls() {

        this._chkNorthWall = document.getElementById('northWall');
        this._chkEastWall  = document.getElementById('eastWall');
        this._chkSouthWall = document.getElementById('southWall');
        this._chkWestWall  = document.getElementById('westWall');

        this._chkNorthWallVisible = document.getElementById('northWallVisible');
        this._chkEastWallVisible  = document.getElementById('eastWallVisible');
        this._chkSouthWallVisible = document.getElementById('southWallVisible');
        this._chkWestWallVisible  = document.getElementById('westWallVisible');

        this._chkNorthWallSolid = document.getElementById('northWallSolid');
        this._chkEastWallSolid  = document.getElementById('eastWallSolid');
        this._chkSouthWallSolid = document.getElementById('southWallSolid');
        this._chkWestWallSolid  = document.getElementById('westWallSolid');

        this._chkNorthWallBreakable = document.getElementById('northWallBreakable');
        this._chkEastWallBreakable  = document.getElementById('eastWallBreakable');
        this._chkSouthWallBreakable = document.getElementById('southWallBreakable');
        this._chkWestWallBreakable  = document.getElementById('westWallBreakable');

        this._chkNorthWallBreakValue = document.getElementById('northWallBreakValue');
        this._chkEastWallBreakValue  = document.getElementById('eastWallBreakValue');
        this._chkSouthWallBreakValue = document.getElementById('southWallBreakValue');
        this._chkWestWallBreakValue  = document.getElementById('westWallBreakValue');

        this._qwTopWall    = document.getElementById('qw-topWall');
        this._qwLeftWall   = document.getElementById('qw-leftWall');
        this._qwRightWall  = document.getElementById('qw-rightWall');
        this._qwBottomWall = document.getElementById('qw-bottomWall');

        this._chkNorthWall.onclick = this.setNorthWall.bind(this);
        this._chkNorthWallVisible.onclick = this.setNorthWall.bind(this);
        this._chkNorthWallSolid.onclick = this.setNorthWall.bind(this);
        this._chkNorthWallBreakable.onclick = this.setNorthWall.bind(this);
        this._chkNorthWallBreakValue.onchange = this.setNorthWall.bind(this);

        this._chkEastWall.onclick = this.setEastWall.bind(this);
        this._chkEastWallVisible.onclick = this.setEastWall.bind(this);
        this._chkEastWallSolid.onclick = this.setEastWall.bind(this);
        this._chkEastWallBreakable.onclick = this.setEastWall.bind(this);
        this._chkEastWallBreakValue.onchange = this.setEastWall.bind(this);

        this._chkSouthWall.onclick = this.setSouthWall.bind(this);
        this._chkSouthWallVisible.onclick = this.setSouthWall.bind(this);
        this._chkSouthWallSolid.onclick = this.setSouthWall.bind(this);
        this._chkSouthWallBreakable.onclick = this.setSouthWall.bind(this);
        this._chkSouthWallBreakValue.onchange = this.setSouthWall.bind(this);

        this._chkWestWall.onclick = this.setWestWall.bind(this);
        this._chkWestWallVisible.onclick = this.setWestWall.bind(this);
        this._chkWestWallSolid.onclick = this.setWestWall.bind(this);
        this._chkWestWallBreakable.onclick = this.setWestWall.bind(this);
        this._chkWestWallBreakValue.onchange = this.setWestWall.bind(this);

        var that = this;
        this._qwTopWall.onclick = function() {
            that._chkNorthWall.click();
            that.setNorthWall.bind(that);
        }
        this._qwLeftWall.onclick = function() {
            that._chkWestWall.click();
            that.setWestWall.bind(that);
        }
        this._qwRightWall.onclick = function() {
            that._chkEastWall.click();
            that.setEastWall.bind(that);
        }
        this._qwBottomWall.onclick = function() {
            that._chkSouthWall.click();
            that.setSouthWall.bind(that);
        }
    }

    /**
     * Init Note Controls
     *
     * Get references to DOM nodes and set onclick handlers
     */
    _initNoteControls() {

        this._btnAddNote = document.getElementById('addNote');
        this._mdlCreateNote = document.getElementById('mdlCreateNote');
        this._mdlOverlay = document.getElementById('mdlOverlay');
        this._btnCreateNote = document.getElementById('btnCreateNote');
        this._inpNoteTitle = document.getElementById('inpNoteTitle');
        this._inpNote = document.getElementById('inpNote');
        this._noteTable = document.getElementById('noteTable');
        this._noteToDelete = document.getElementById('noteToDelete');

        this._mdlDeleteNote = document.getElementById('mdlDeleteNote');
        this._btnDeleteNote = document.getElementById('btnDeleteNote');

        this._btnAddNote.onclick = this.showCreateNoteModal.bind(this);
        this._btnCreateNote.onclick = this.addNote.bind(this);
        this._btnDeleteNote.onclick = this._deleteNote.bind(this);
    }

    _initTrapControls() {
        console.log('init trap controls');
        this._btnAddTrap = document.getElementById('addTrap');
        this._mdlAddTrap = document.getElementById('mdlAddTrap');

        this._initTrapRadioButtons();

        this._btnAddTrap.onclick = this.showAddTrapModal.bind(this);
    }

    _initTrapRadioButtons() {
        console.log('init trap radio buttons');
        this._rbtnMechTrap = document.getElementById('trapTypeMech');
        this._rbtnMagTrap  = document.getElementById('trapTypeMag');
        this._acdnMechTrap = document.getElementById('mechanicalTrapSettings');
        this._acdnMagTrap  = document.getElementById('magicalTrapSettings');

        this._rbtnMechTrap.onclick = this._rbtnMechTrapOnclick.bind(this);
        this._rbtnMagTrap.onclick = this._rbtnMagTrapOnclick.bind(this);
    }

    _rbtnMechTrapOnclick() {

        this._acdnMechTrap.classList.remove('hidden');
        this._acdnMagTrap.classList.add('hidden');
    }

    _rbtnMagTrapOnclick() {

        this._acdnMechTrap.classList.add('hidden');
        this._acdnMagTrap.classList.remove('hidden');
    }

    showAddTrapModal() {

        console.log('show trap');
        this._mdlOverlay.classList.add('active');
        this._mdlAddTrap.classList.add('active');
    }

    showCreateNoteModal() {

        this._mdlOverlay.classList.add('active');
        this._mdlCreateNote.classList.add('active');
    }

    addNote() {

        let room = this._map.getSelectedRoom();
        room.addNote(this._inpNoteTitle.value, this._inpNote.value);
        if (!room.hasNoteIndicator()) {
            room.setNoteIndicator();
        }

        this.renderNoteTable();
        this._dismissModals();
        this.clearNoteModal();
    }

    clearNoteModal() {
        this._inpNoteTitle.value = "";
        this._inpNote.value = "";
    }

    renderNoteTable() {

        let room  = this._map.getSelectedRoom();
        let notes = JSON.parse(room.div.dataset.notes);
        let keys  = Object.keys(notes);

        while(this._noteTable.firstChild) {
            this._noteTable.removeChild(this._noteTable.firstChild);
        }

        for(let x = 0; x < keys.length; x++) {
            let note = notes[keys[x]];
            let tr = document.createElement('tr');
            let tdTitle = document.createElement('td');
            let tdActions = document.createElement('td');
            let iNote = document.createElement('i');
            let iEdit = document.createElement('i');
            let iDelete = document.createElement('i');
            let iView = document.createElement('i');

            iNote.classList.add('fa');
            iView.classList.add('fa');
            iEdit.classList.add('fa');
            iDelete.classList.add('fa');

            iNote.classList.add('fa-sticky-note-o');
            iView.classList.add('fa-eye');
            iEdit.classList.add('fa-edit');
            iDelete.classList.add('fa-remove');

            iView.onclick = this._viewClick.bind(this);
            iEdit.onclick = this._editClick.bind(this);
            iDelete.onclick = this._deleteClick.bind(this);

            tdTitle.appendChild(iNote);
            tdTitle.appendChild(document.createTextNode(' ' + keys[x]));
            tr.appendChild(tdTitle);

            tdActions.appendChild(iView);
            tdActions.appendChild(iEdit);
            tdActions.appendChild(iDelete);
            tr.appendChild(tdActions);

            this._noteTable.appendChild(tr);
        }
    }

    _viewClick(e) {
        //console.log(e);

    }

    _editClick(e) {
        console.log(e);
    }

    _deleteClick(e) {

        this._mdlOverlay.classList.add('active');
        this._mdlDeleteNote.classList.add('active');


        let title = e.target.parentNode.parentNode.firstChild.textContent.trim();
        this._noteToDelete.value = title;
    }

    _deleteNote() {

        let room = this._map.getSelectedRoom();
        room.deleteNote(this._noteToDelete.value);
        this.renderNoteTable();
        this._dismissModals();
    }

    setNorthWall() {

        let room = this._map.getSelectedRoom();
        room.setWall(
            'north',
            this._chkNorthWall.checked,
            this._chkNorthWallVisible.checked,
            this._chkNorthWallSolid.checked,
            this._chkNorthWallBreakable.checked,
            this._chkNorthWallBreakValue.value
        );
    }

    setEastWall() {

        let room = this._map.getSelectedRoom();
        room.setWall(
            'east',
            this._chkEastWall.checked,
            this._chkEastWallVisible.checked,
            this._chkEastWallSolid.checked,
            this._chkEastWallBreakable.checked,
            this._chkEastWallBreakValue.value
        );
    }

    setSouthWall() {

        let room = this._map.getSelectedRoom();
        room.setWall(
            'south',
            this._chkSouthWall.checked,
            this._chkSouthWallVisible.checked,
            this._chkSouthWallSolid.checked,
            this._chkSouthWallBreakable.checked,
            this._chkSouthWallBreakValue.value
        );
    }

    setWestWall() {

        let room = this._map.getSelectedRoom();
        room.setWall(
            'west',
            this._chkWestWall.checked,
            this._chkWestWallVisible.checked,
            this._chkWestWallSolid.checked,
            this._chkWestWallBreakable.checked,
            this._chkWestWallBreakValue.value
        );
    }

    reset(room) {

        let northWall = JSON.parse(room.div.dataset.northWall);
        let eastWall  = JSON.parse(room.div.dataset.eastWall);
        let southWall = JSON.parse(room.div.dataset.southWall);
        let westWall  = JSON.parse(room.div.dataset.westWall);

        if (northWall.visible || northWall.solid) {
            this._chkNorthWall.checked = true;
            this._chkNorthWallVisible.checked = northWall.visible;
            this._chkNorthWallSolid.checked = northWall.solid;
            this._chkNorthWallBreakable.checked = northWall.breakable;
            this._chkNorthWallBreakValue.value = northWall.breakValue;
        } else {
            this._chkNorthWall.checked = false;
            this._chkNorthWallVisible.checked = true;
            this._chkNorthWallSolid.checked = true;
            this._chkNorthWallBreakable.checked = false;
            this._chkNorthWallBreakValue.value = "";
        }

        if (eastWall.visible || eastWall.solid) {
            this._chkEastWall.checked = true;
            this._chkEastWallVisible.checked = eastWall.visible;
            this._chkEastWallSolid.checked = eastWall.solid;
            this._chkEastWallBreakable.checked = eastWall.breakable;
            this._chkEastWallBreakValue.value = eastWall.breakValue;
        } else {
            this._chkEastWall.checked = false;
            this._chkEastWallVisible.checked = true;
            this._chkEastWallSolid.checked = true;
            this._chkEastWallBreakable.checked = false;
            this._chkEastWallBreakValue.value = "";
        }

        if (southWall.visible || southWall.solid) {
            this._chkSouthWall.checked = true;
            this._chkSouthWallVisible.checked = southWall.visible;
            this._chkSouthWallSolid.checked = southWall.solid;
            this._chkSouthWallBreakable.checked = southWall.breakable;
            this._chkSouthWallBreakValue.value = southWall.breakValue;
        } else {
            this._chkSouthWall.checked = false;
            this._chkSouthWallVisible.checked = true;
            this._chkSouthWallSolid.checked = true;
            this._chkSouthWallBreakable.checked = false;
            this._chkSouthWallBreakValue.value = "";
        }

        if (westWall.visible || westWall.solid) {
            this._chkWestWall.checked = true;
            this._chkWestWallVisible.checked = westWall.visible;
            this._chkWestWallSolid.checked = westWall.solid;
            this._chkWestWallBreakable.checked = westWall.breakable;
            this._chkWestWallBreakValue.value = westWall.breakValue;
        } else {
            this._chkWestWall.checked = false;
            this._chkWestWallVisible.checked = true;
            this._chkWestWallSolid.checked = true;
            this._chkWestWallBreakable.checked = false;
            this._chkWestWallBreakValue.value = "";
        }
    }

    _dismissModals() {

        [].slice.call(document.getElementsByClassName('modal')).forEach(function(elem, index, array) {
            if (elem.classList.contains('active')) {
                elem.classList.remove('active');
            }
        });

        mdlOverlay.classList.remove('active');
    }
}

export default Controls;
