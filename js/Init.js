// Module globals
// TODO: Research scope when declaring variables at this point to confirm they
//       aren't declared on the window object
var mdlOverlay;
var mdlOptions;
var mdlNewMap;
var mdlLoadMap;

var btnNewMap;
var btnLoadMap;
var btnCreateMap;

var inpMapName;
var lblMapName;
var inpMapX;
var inpMapY;

var ajaxMapNameAvailability;

var user;
var map;
var menu;
var _controls;

var editor;
var controls;

// Import necessary components. If you're not familiar with JS imports google:
// ECMAScript 2015 import keyword
import Ajax from "./Ajax.js";
import Map from "./Map.js";
import MenuBar from "./MenuBar.js";
import initAccordions from "./Accordion.js";
import Controls from "./Controls.js";

/**
 * Dungeon Mapper JavaScript Main Entry Point
 *
 * Initializes application state
 *
 */
export default function init() {

    _initUser();
    _initGlobals();
    _initAjax();
    _initClickHandlers();
    _initMenu();
    initAccordions();
}

/**
 *
 */
function _initUser() {

    user = JSON.parse('{"id":"1","last_name":"Walsh","first_name":"Peter","alias":"Johnny Spaceboots","email":"peter@netdev.studio","created":"2016-11-15 11:04:56","deleted":null,"last_updated":"2016-11-15 11:05:37","roles":[{"id":"1","name":"Admin"}]}');
}

function readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}

/**
 * Initialize Globals
 *
 * Store references to common UI element DOM nodes
 */
function _initGlobals() {

    mdlOverlay = document.getElementById('mdlOverlay');
    mdlOptions = document.getElementById('mdlOptions');
    mdlNewMap  = document.getElementById('mdlNewMap');

    btnNewMap  = document.getElementById('btnNewMap');
    btnLoadMap = document.getElementById('btnLoadMap');
    btnCreateMap = document.getElementById('btnCreateMap');

    inpMapName = document.getElementById('inpMapName');
    lblMapName = document.getElementById('lblMapName');
    inpMapX = document.getElementById('inpMapX');
    inpMapY = document.getElementById('inpMapY');

    editor = document.getElementById('editor');
    controls = document.getElementById('controls');
}

/**
 *
 */
 function _initAjax() {

    ajaxMapNameAvailability = new Ajax('POST', 'http://127.0.0.1/index.php/maps/namecheck', null, function(serverResponse) {
        if(serverResponse == '0') {
            inpMapName.classList.remove('name-unavailable');
            inpMapName.classList.add('name-available');
            lblMapName.classList.remove('name-unavailable');
            lblMapName.classList.add('name-available');
        } else {
            inpMapName.classList.remove('name-available');
            inpMapName.classList.add('name-unavailable');
            lblMapName.classList.remove('name-available');
            lblMapName.classList.add('name-unavailable');
        }
    });

    inpMapName.onkeyup = function(e) {
        ajaxMapNameAvailability.setRequestData({ name: e.target.value });
        ajaxMapNameAvailability.send();
    }
 }

/**
 * Initialize Click Handlers
 *
 * Assign necessary click handlers to DOM nodes representing controls used
 * throughout application
 */
function _initClickHandlers() {

    [].slice.call(document.getElementsByClassName('closeModal')).forEach(function(elem, index, array) {
        elem.onclick = function() {
            _dismissModals();
        };
    });

    btnNewMap.onclick  = _showNewMapModal;
    btnLoadMap.onclick = _showLoadMapModal;
    btnCreateMap.onclick = _createMap;
    mdlOverlay.onclick = _dismissModals;
}

/**
 * Initialize Menu
 *
 * Configure and attach to page a MenuBar instance. See MenuBar class
 * documentation for more info.
 *
 * Our desired menu structure is this:
 *  File
 *      New
 *      Save
 *      Load
 *  Export
 *      As PNG
 *      As PDF
 *  Help
 *      About
 *
 * <!-- Also, this is where you can alter the application menu bar -->
 */
function _initMenu() {

    menu = new MenuBar({
        'File': [
            {
                'title': 'New',
                'callback': _showNewMapModal,
                'roles': ['DM']
            }, {
                'title': 'Save',
                'callback': function() { console.log('save') },
                'roles': ['DM']
            }, {
                'title': 'Load',
                'callback': function() { console.log('load') },
                'roles': ['DM', 'Player']
            }
        ],
        'Export': [
            {
                'title': 'As PNG',
                'callback': function() { console.log('export as png') },
                'roles': ['DM', 'Player']
            }, {
                'title': 'As PDF',
                'callback': function() { console.log('export as pdf') },
                'roles': ['DM', 'Player']
            }
        ],
        'Help': [
            {
                'title': 'DM\'s Guide',
                'callback': function() { console.log('dm guide') },
                'roles': ['DM']
            }, {
                'title': 'Player\'s Guide',
                'callback': function() { console.log('p. guide'); },
                'roles': ['DM', 'Player']
            }, {
                'title': 'About',
                'callback': function() { console.log('about') },
                'roles': ['DM', 'Player']
            }
        ]
    }, user);

    let nav = document.getElementById('menuBar');
    nav.appendChild(menu.draw());

    window.onclick = function() {
        menu._dismissMenu();
    };
}

/**
 * Toggle Controls
 *
 * Toggles the active class of the right sidebar controls container
 */
function _toggleControls() {
    controls.classList.toggle('active');
}

/**
 * Enable Controls
 *
 * Ensures the right sidebar controls container has the class active
 */
function _enableControls() {
    if (!controls.classList.contains('active')){
        controls.classList.add('active');
    }
}

/**
 * Disable Controls
 *
 * Ensures the right sidebar controls container does not have the class active
 */
function _disableControls() {
    if (controls.classList.contains('active')){
        controls.classList.remove('active');
    }
}

// TODO: Investigate why these two functions appear to do the same thing
/**
 * Dismiss Modals
 *
 * Removes the active class from every .modal
 */
function _dismissModals() {

    [].slice.call(document.getElementsByClassName('modal')).forEach(function(elem, index, array) {
        if (elem.classList.contains('active')) {
            elem.classList.remove('active');
        }
    });

    mdlOverlay.classList.remove('active');
}

/**
 * Hide all Modals
 *
 * Removes the active class from every .modal
 */
function _hideAllModals() {

    [].slice.call(document.getElementsByClassName('modal')).forEach(function(elem, index, array) {
        elem.classList.remove('active');
    });
}

/**
 * Show New Map Modal
 *
 * Displays the new map modal
 */
function _showNewMapModal() {

    _hideAllModals();
    mdlOverlay.classList.add('active');
    mdlNewMap.classList.toggle('active');
}

/**
 * Clear Editor
 *
 * Resets the editor
 */
function _clearEditor() {

    while (editor.firstChild) {
        editor.removeChild(editor.firstChild);
    }
}

/**
 * Clear New Map Modal
 *
 * Reset values for new map modal input fields
 */
function _clearNewMapModal() {

    inpMapName.value = "";
    inpMapX.value = "";
    inpMapY.value = "";
    inpMapName.classList.remove('name-available');
    inpMapName.classList.remove('name-unavailable');
    lblMapName.classList.remove('name-available');
    lblMapName.classList.remove('name-unavailable');
}

/**
 * Create Map
 *
 * Init a new map instance with the users entered values and prepare the
 * interface to work with it
 */
function _createMap() {

    map = new Map(inpMapName.value, inpMapX.value, inpMapY.value);
    _controls = new Controls(map);
    map.setControls(_controls);
    _drawMap();
    _clearNewMapModal();
    _disableControls();

    _hideAllModals();
    mdlOverlay.classList.remove('active');
}

/**
 * Draw Map
 *
 * Draw map and handle interface
 */
function _drawMap() {

    let _map = map.draw();
    _map.onclick = _mapClick;
    _clearEditor();
    editor.appendChild(_map);
}

/**
 * Map Click Handler
 */
function _mapClick(e) {

    e.stopPropagation();
    menu._dismissMenu();
    if (e && e.target && e.target.classList && e.target.classList.contains('room')) {
        map.deselectRooms();
        map.selectRoom(e.target.dataset.x, e.target.dataset.y);
        _controls.renderNoteTable();
        _drawMap();
    }
}

function _showLoadMapModal() {

    console.log('load map');
}
