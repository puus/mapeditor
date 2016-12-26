$traceurRuntime.registerModule("Ajax.js", [], function() {
  "use strict";
  var __moduleName = "Ajax.js";
  var Ajax = function() {
    function Ajax(method, url, data, callback) {
      this.DONE = 4;
      this.OK = 200;
      this.xhr = new XMLHttpRequest();
      this.xhr.onreadystatechange = this._onXhrReadyStateChange.bind(this);
      this.method = method;
      this.url = url;
      this.setRequestData(data);
      this.callback = callback;
    }
    return ($traceurRuntime.createClass)(Ajax, {
      _onXhrReadyStateChange: function() {
        if (this.xhr.readyState == this.DONE) {
          if (this.xhr.status == this.OK) {
            if (typeof this.beforeCallback === 'function') {
              this.beforeCallback();
            }
            this.callback(this.xhr.responseText);
          }
        }
      },
      setRequestData: function(data) {
        this.requestData = this.formatRequestData(data);
      },
      formatRequestData: function(data) {
        var response = "";
        for (var index in data) {
          response += index + '=' + data[index] + '&';
        }
        response = response.substring(0, response.length - 1);
        return response;
      },
      send: function() {
        if (typeof this.beforeOpen === 'function') {
          this.beforeOpen();
        }
        this.xhr.open(this.method, this.url);
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (typeof this.beforeSend === 'function') {
          this.beforeSend();
        }
        this.xhr.send(this.requestData || null);
      }
    }, {});
  }();
  var $__default = Ajax;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("Room.js", [], function() {
  "use strict";
  var __moduleName = "Room.js";
  var Room = function() {
    function Room() {
      this.div = this._constructElement();
      this.selected = false;
    }
    return ($traceurRuntime.createClass)(Room, {
      _constructElement: function() {
        var div = document.createElement('div');
        div.classList.add('room');
        div.dataset.northWall = '{}';
        div.dataset.eastWall = '{}';
        div.dataset.southWall = '{}';
        div.dataset.westWall = '{}';
        div.dataset.notes = '{}';
        return div;
      },
      addNote: function(title, note) {
        var notes = JSON.parse(this.div.dataset.notes);
        if (typeof(notes[title]) == 'undefined') {
          notes[title] = note;
          this.div.dataset.notes = JSON.stringify(notes);
        }
      },
      hasNoteIndicator: function() {
        for (var child in this.div.childNodes) {
          if (this.div.childNodes.hasOwnProperty(child)) {
            var n = this.div.childNodes[child];
            if (n.nodeType == 'I' && n.classList.contains('noteIcon')) {
              return true;
            }
          }
        }
        return false;
      },
      setNoteIndicator: function() {
        var i = document.createElement('i');
        i.classList.add('fa');
        i.classList.add('fa-sticky-note-o');
        i.classList.add('noteIcon');
        this.div.appendChild(i);
      },
      removeNoteIndicator: function() {
        for (var child in this.div.childNodes) {
          if (this.div.childNodes.hasOwnProperty(child)) {
            var n = this.div.childNodes[child];
            if (n.nodeType == 'I' && n.classList.contains('noteIcon')) {
              this.div.removeChild(n);
            }
          }
        }
      },
      deleteNote: function(title) {
        var notes = JSON.parse(this.div.dataset.notes);
        if (notes.hasOwnProperty(title)) {
          delete notes[title];
        }
        this.div.dataset.notes = JSON.stringify(notes);
      },
      setWall: function(direction, enabled, visible, solid, breakable, breakValue) {
        switch (direction) {
          case 'north':
            if (enabled && (visible || solid)) {
              var data = {};
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
              var data$__2 = {};
              data$__2.visible = visible;
              data$__2.solid = solid;
              data$__2.breakable = breakable;
              data$__2.breakValue = breakValue;
              this.div.dataset.eastWall = JSON.stringify(data$__2);
              this.div.classList.add('east-wall');
            } else {
              this.div.dataset.eastWall = '{}';
              this.div.classList.remove('east-wall');
            }
            break;
          case 'south':
            if (enabled && (visible || solid)) {
              var data$__3 = {};
              data$__3.visible = visible;
              data$__3.solid = solid;
              data$__3.breakable = breakable;
              data$__3.breakValue = breakValue;
              this.div.dataset.southWall = JSON.stringify(data$__3);
              this.div.classList.add('south-wall');
            } else {
              this.div.dataset.southWall = '{}';
              this.div.classList.remove('south-wall');
            }
            break;
          case 'west':
            if (enabled && (visible || solid)) {
              var data$__4 = {};
              data$__4.visible = visible;
              data$__4.solid = solid;
              data$__4.breakable = breakable;
              data$__4.breakValue = breakValue;
              this.div.dataset.westWall = JSON.stringify(data$__4);
              this.div.classList.add('west-wall');
            } else {
              this.div.dataset.westWall = '{}';
              this.div.classList.remove('west-wall');
            }
            break;
        }
      },
      draw: function() {
        if (this.selected) {
          this.div.classList.add('selected');
        } else {
          this.div.classList.remove('selected');
        }
        return this.div;
      }
    }, {});
  }();
  var $__default = Room;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("Map.js", [], function() {
  "use strict";
  var __moduleName = "Map.js";
  var Room = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./Room.js", "Map.js")).default;
  var Map = function() {
    function Map(name, x, y) {
      this.name = name;
      this.x = x;
      this.y = y;
      this.controls = null;
      this._init();
    }
    return ($traceurRuntime.createClass)(Map, {
      _init: function() {
        this.map = [];
        for (var iX = 0; iX < this.x; iX++) {
          this.map[iX] = [];
          for (var iY = 0; iY < this.y; iY++) {
            this.map[iX][iY] = new Room();
          }
        }
      },
      draw: function() {
        var map = document.createElement('div');
        map.classList.add('map');
        for (var iX = 0; iX < this.x; iX++) {
          var row = document.createElement('div');
          row.classList.add('row');
          for (var iY = 0; iY < this.y; iY++) {
            var room = this.map[iX][iY].draw();
            room.dataset.x = iX;
            room.dataset.y = iY;
            row.appendChild(room);
          }
          map.appendChild(row);
        }
        return map;
      },
      deselectRooms: function() {
        for (var iX = 0; iX < this.x; iX++) {
          for (var iY = 0; iY < this.y; iY++) {
            this.map[iX][iY].selected = false;
          }
        }
      },
      selectRoom: function(x, y) {
        this._enableControls();
        this.map[x][y].selected = true;
        this.controls.reset(this.map[x][y]);
      },
      getSelectedRoom: function() {
        for (var iX = 0; iX < this.x; iX++) {
          for (var iY = 0; iY < this.y; iY++) {
            if (this.map[iX][iY].selected) {
              return this.map[iX][iY];
            }
          }
        }
      },
      setControls: function(controls) {
        this.controls = controls;
      },
      _enableControls: function() {
        var controls = document.getElementById('controls');
        if (!controls.classList.contains('active')) {
          controls.classList.add('active');
        }
      }
    }, {});
  }();
  var $__default = Map;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("MenuBar.js", [], function() {
  "use strict";
  var __moduleName = "MenuBar.js";
  var MenuBar = function() {
    function MenuBar(options, user) {
      var that = this;
      this.options = options;
      this.user = user;
    }
    return ($traceurRuntime.createClass)(MenuBar, {
      _dismissMenu: function() {
        var nav = document.getElementById('menuBar');
        var ul = nav.firstElementChild;
        ul.childNodes.forEach(function(elem, index, array) {
          if (elem.classList.contains('active')) {
            elem.classList.remove('active');
          }
        });
      },
      _userHasRole: function(role) {
        for (var index in this.user.roles) {
          var _role = this.user.roles[index];
          if (_role.name == role) {
            return true;
          }
        }
        return false;
      },
      draw: function() {
        var menu = document.createElement('ul');
        var that = this;
        var _opts = this.options;
        var menuItem,
            $__2 = this,
            $__3 = function(key) {
              if (!$__2.options.hasOwnProperty(key))
                return 0;
              var li = document.createElement('li');
              var ul = document.createElement('ul');
              var liText = document.createTextNode(key);
              li.appendChild(liText);
              li.onclick = function(e) {
                e.stopPropagation();
                that._dismissMenu();
                that._dropDown(li);
              };
              var $__5 = function(subkey) {
                menuItem = $__2.options[key][subkey];
                var _li = document.createElement('li');
                var _span = document.createElement('span');
                var _liText = document.createTextNode(menuItem.title);
                _span.appendChild(_liText);
                _li.appendChild(_span);
                _li.onclick = function() {
                  that._dismissMenu();
                  that.options[key][subkey].callback.call();
                };
                ul.appendChild(_li);
              };
              for (var subkey in $__2.options[key]) {
                $__5(subkey);
              }
              li.appendChild(ul);
              menu.appendChild(li);
            },
            $__4;
        $__1: for (var key in this.options) {
          $__4 = $__3(key);
          switch ($__4) {
            case 0:
              continue $__1;
          }
        }
        return menu;
      },
      _dropDown: function(elem) {
        elem.classList.toggle('active');
      }
    }, {});
  }();
  var $__default = MenuBar;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("Accordion.js", [], function() {
  "use strict";
  var __moduleName = "Accordion.js";
  function initAccordions() {
    [].slice.call(document.getElementsByClassName('accordion-title')).forEach(function(elem, index, array) {
      elem.onclick = _toggleAccordion;
    });
    [].slice.call(document.getElementsByClassName('accordion')).forEach(function(elem, index, array) {
      elem.onclick = function(e) {};
    });
  }
  function _toggleAccordion(e) {
    e.target.parentNode.classList.toggle('collapsed');
  }
  var $__default = initAccordions;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("Controls.js", [], function() {
  "use strict";
  var __moduleName = "Controls.js";
  var Controls = function() {
    function Controls(map) {
      this._map = map;
      this._initWallControls();
      this._initNoteControls();
      this._initTrapControls();
    }
    return ($traceurRuntime.createClass)(Controls, {
      _initWallControls: function() {
        this._chkNorthWall = document.getElementById('northWall');
        this._chkEastWall = document.getElementById('eastWall');
        this._chkSouthWall = document.getElementById('southWall');
        this._chkWestWall = document.getElementById('westWall');
        this._chkNorthWallVisible = document.getElementById('northWallVisible');
        this._chkEastWallVisible = document.getElementById('eastWallVisible');
        this._chkSouthWallVisible = document.getElementById('southWallVisible');
        this._chkWestWallVisible = document.getElementById('westWallVisible');
        this._chkNorthWallSolid = document.getElementById('northWallSolid');
        this._chkEastWallSolid = document.getElementById('eastWallSolid');
        this._chkSouthWallSolid = document.getElementById('southWallSolid');
        this._chkWestWallSolid = document.getElementById('westWallSolid');
        this._chkNorthWallBreakable = document.getElementById('northWallBreakable');
        this._chkEastWallBreakable = document.getElementById('eastWallBreakable');
        this._chkSouthWallBreakable = document.getElementById('southWallBreakable');
        this._chkWestWallBreakable = document.getElementById('westWallBreakable');
        this._chkNorthWallBreakValue = document.getElementById('northWallBreakValue');
        this._chkEastWallBreakValue = document.getElementById('eastWallBreakValue');
        this._chkSouthWallBreakValue = document.getElementById('southWallBreakValue');
        this._chkWestWallBreakValue = document.getElementById('westWallBreakValue');
        this._qwTopWall = document.getElementById('qw-topWall');
        this._qwLeftWall = document.getElementById('qw-leftWall');
        this._qwRightWall = document.getElementById('qw-rightWall');
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
        };
        this._qwLeftWall.onclick = function() {
          that._chkWestWall.click();
          that.setWestWall.bind(that);
        };
        this._qwRightWall.onclick = function() {
          that._chkEastWall.click();
          that.setEastWall.bind(that);
        };
        this._qwBottomWall.onclick = function() {
          that._chkSouthWall.click();
          that.setSouthWall.bind(that);
        };
      },
      _initNoteControls: function() {
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
      },
      _initTrapControls: function() {
        console.log('init trap controls');
        this._btnAddTrap = document.getElementById('addTrap');
        this._mdlAddTrap = document.getElementById('mdlAddTrap');
        this._initTrapRadioButtons();
        this._btnAddTrap.onclick = this.showAddTrapModal.bind(this);
      },
      _initTrapRadioButtons: function() {
        console.log('init trap radio buttons');
        this._rbtnMechTrap = document.getElementById('trapTypeMech');
        this._rbtnMagTrap = document.getElementById('trapTypeMag');
        this._acdnMechTrap = document.getElementById('mechanicalTrapSettings');
        this._acdnMagTrap = document.getElementById('magicalTrapSettings');
        this._rbtnMechTrap.onclick = this._rbtnMechTrapOnclick.bind(this);
        this._rbtnMagTrap.onclick = this._rbtnMagTrapOnclick.bind(this);
      },
      _rbtnMechTrapOnclick: function() {
        this._acdnMechTrap.classList.remove('hidden');
        this._acdnMagTrap.classList.add('hidden');
      },
      _rbtnMagTrapOnclick: function() {
        this._acdnMechTrap.classList.add('hidden');
        this._acdnMagTrap.classList.remove('hidden');
      },
      showAddTrapModal: function() {
        console.log('show trap');
        this._mdlOverlay.classList.add('active');
        this._mdlAddTrap.classList.add('active');
      },
      showCreateNoteModal: function() {
        this._mdlOverlay.classList.add('active');
        this._mdlCreateNote.classList.add('active');
      },
      addNote: function() {
        var room = this._map.getSelectedRoom();
        room.addNote(this._inpNoteTitle.value, this._inpNote.value);
        if (!room.hasNoteIndicator()) {
          room.setNoteIndicator();
        }
        this.renderNoteTable();
        this._dismissModals();
        this.clearNoteModal();
      },
      clearNoteModal: function() {
        this._inpNoteTitle.value = "";
        this._inpNote.value = "";
      },
      renderNoteTable: function() {
        var room = this._map.getSelectedRoom();
        var notes = JSON.parse(room.div.dataset.notes);
        var keys = Object.keys(notes);
        while (this._noteTable.firstChild) {
          this._noteTable.removeChild(this._noteTable.firstChild);
        }
        for (var x = 0; x < keys.length; x++) {
          var note = notes[keys[x]];
          var tr = document.createElement('tr');
          var tdTitle = document.createElement('td');
          var tdActions = document.createElement('td');
          var iNote = document.createElement('i');
          var iEdit = document.createElement('i');
          var iDelete = document.createElement('i');
          var iView = document.createElement('i');
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
      },
      _viewClick: function(e) {},
      _editClick: function(e) {
        console.log(e);
      },
      _deleteClick: function(e) {
        this._mdlOverlay.classList.add('active');
        this._mdlDeleteNote.classList.add('active');
        var title = e.target.parentNode.parentNode.firstChild.textContent.trim();
        this._noteToDelete.value = title;
      },
      _deleteNote: function() {
        var room = this._map.getSelectedRoom();
        room.deleteNote(this._noteToDelete.value);
        this.renderNoteTable();
        this._dismissModals();
      },
      setNorthWall: function() {
        var room = this._map.getSelectedRoom();
        room.setWall('north', this._chkNorthWall.checked, this._chkNorthWallVisible.checked, this._chkNorthWallSolid.checked, this._chkNorthWallBreakable.checked, this._chkNorthWallBreakValue.value);
      },
      setEastWall: function() {
        var room = this._map.getSelectedRoom();
        room.setWall('east', this._chkEastWall.checked, this._chkEastWallVisible.checked, this._chkEastWallSolid.checked, this._chkEastWallBreakable.checked, this._chkEastWallBreakValue.value);
      },
      setSouthWall: function() {
        var room = this._map.getSelectedRoom();
        room.setWall('south', this._chkSouthWall.checked, this._chkSouthWallVisible.checked, this._chkSouthWallSolid.checked, this._chkSouthWallBreakable.checked, this._chkSouthWallBreakValue.value);
      },
      setWestWall: function() {
        var room = this._map.getSelectedRoom();
        room.setWall('west', this._chkWestWall.checked, this._chkWestWallVisible.checked, this._chkWestWallSolid.checked, this._chkWestWallBreakable.checked, this._chkWestWallBreakValue.value);
      },
      reset: function(room) {
        var northWall = JSON.parse(room.div.dataset.northWall);
        var eastWall = JSON.parse(room.div.dataset.eastWall);
        var southWall = JSON.parse(room.div.dataset.southWall);
        var westWall = JSON.parse(room.div.dataset.westWall);
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
      },
      _dismissModals: function() {
        [].slice.call(document.getElementsByClassName('modal')).forEach(function(elem, index, array) {
          if (elem.classList.contains('active')) {
            elem.classList.remove('active');
          }
        });
        mdlOverlay.classList.remove('active');
      }
    }, {});
  }();
  var $__default = Controls;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("Init.js", [], function() {
  "use strict";
  var __moduleName = "Init.js";
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
  var Ajax = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./Ajax.js", "Init.js")).default;
  var Map = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./Map.js", "Init.js")).default;
  var MenuBar = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./MenuBar.js", "Init.js")).default;
  var initAccordions = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./Accordion.js", "Init.js")).default;
  var Controls = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./Controls.js", "Init.js")).default;
  function init() {
    _initUser();
    _initGlobals();
    _initAjax();
    _initClickHandlers();
    _initMenu();
    initAccordions();
  }
  function _initUser() {
    user = JSON.parse('{"id":"1","last_name":"Walsh","first_name":"Peter","alias":"Johnny Spaceboots","email":"peter@netdev.studio","created":"2016-11-15 11:04:56","deleted":null,"last_updated":"2016-11-15 11:05:37","roles":[{"id":"1","name":"Admin"}]}');
  }
  function readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
  }
  function _initGlobals() {
    mdlOverlay = document.getElementById('mdlOverlay');
    mdlOptions = document.getElementById('mdlOptions');
    mdlNewMap = document.getElementById('mdlNewMap');
    btnNewMap = document.getElementById('btnNewMap');
    btnLoadMap = document.getElementById('btnLoadMap');
    btnCreateMap = document.getElementById('btnCreateMap');
    inpMapName = document.getElementById('inpMapName');
    lblMapName = document.getElementById('lblMapName');
    inpMapX = document.getElementById('inpMapX');
    inpMapY = document.getElementById('inpMapY');
    editor = document.getElementById('editor');
    controls = document.getElementById('controls');
  }
  function _initAjax() {
    ajaxMapNameAvailability = new Ajax('POST', 'http://127.0.0.1/index.php/maps/namecheck', null, function(serverResponse) {
      if (serverResponse == '0') {
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
      ajaxMapNameAvailability.setRequestData({name: e.target.value});
      ajaxMapNameAvailability.send();
    };
  }
  function _initClickHandlers() {
    [].slice.call(document.getElementsByClassName('closeModal')).forEach(function(elem, index, array) {
      elem.onclick = function() {
        _dismissModals();
      };
    });
    btnNewMap.onclick = _showNewMapModal;
    btnLoadMap.onclick = _showLoadMapModal;
    btnCreateMap.onclick = _createMap;
    mdlOverlay.onclick = _dismissModals;
  }
  function _initMenu() {
    menu = new MenuBar({
      'File': [{
        'title': 'New',
        'callback': _showNewMapModal,
        'roles': ['DM']
      }, {
        'title': 'Save',
        'callback': function() {
          console.log('save');
        },
        'roles': ['DM']
      }, {
        'title': 'Load',
        'callback': function() {
          console.log('load');
        },
        'roles': ['DM', 'Player']
      }],
      'Export': [{
        'title': 'As PNG',
        'callback': function() {
          console.log('export as png');
        },
        'roles': ['DM', 'Player']
      }, {
        'title': 'As PDF',
        'callback': function() {
          console.log('export as pdf');
        },
        'roles': ['DM', 'Player']
      }],
      'Help': [{
        'title': 'DM\'s Guide',
        'callback': function() {
          console.log('dm guide');
        },
        'roles': ['DM']
      }, {
        'title': 'Player\'s Guide',
        'callback': function() {
          console.log('p. guide');
        },
        'roles': ['DM', 'Player']
      }, {
        'title': 'About',
        'callback': function() {
          console.log('about');
        },
        'roles': ['DM', 'Player']
      }]
    }, user);
    var nav = document.getElementById('menuBar');
    nav.appendChild(menu.draw());
    window.onclick = function() {
      menu._dismissMenu();
    };
  }
  function _toggleControls() {
    controls.classList.toggle('active');
  }
  function _enableControls() {
    if (!controls.classList.contains('active')) {
      controls.classList.add('active');
    }
  }
  function _disableControls() {
    if (controls.classList.contains('active')) {
      controls.classList.remove('active');
    }
  }
  function _dismissModals() {
    [].slice.call(document.getElementsByClassName('modal')).forEach(function(elem, index, array) {
      if (elem.classList.contains('active')) {
        elem.classList.remove('active');
      }
    });
    mdlOverlay.classList.remove('active');
  }
  function _hideAllModals() {
    [].slice.call(document.getElementsByClassName('modal')).forEach(function(elem, index, array) {
      elem.classList.remove('active');
    });
  }
  function _showNewMapModal() {
    _hideAllModals();
    mdlOverlay.classList.add('active');
    mdlNewMap.classList.toggle('active');
  }
  function _clearEditor() {
    while (editor.firstChild) {
      editor.removeChild(editor.firstChild);
    }
  }
  function _clearNewMapModal() {
    inpMapName.value = "";
    inpMapX.value = "";
    inpMapY.value = "";
    inpMapName.classList.remove('name-available');
    inpMapName.classList.remove('name-unavailable');
    lblMapName.classList.remove('name-available');
    lblMapName.classList.remove('name-unavailable');
  }
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
  function _drawMap() {
    var _map = map.draw();
    _map.onclick = _mapClick;
    _clearEditor();
    editor.appendChild(_map);
  }
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
  return {get default() {
      return init;
    }};
});
$traceurRuntime.registerModule("main.js", [], function() {
  "use strict";
  var __moduleName = "main.js";
  var Ajax = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./Ajax.js", "main.js")).default;
  var Room = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./Room.js", "main.js")).default;
  var init = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./Init.js", "main.js")).default;
  init();
  return {};
});
$traceurRuntime.getModule("main.js" + '');
