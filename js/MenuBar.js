/**
 * Menu Bar
 *
 * Builds the DOM structure necessary for a desktop style horizontal dropdown
 * menu
 */

class MenuBar {

    /**
     * constructor
     *
     * Sets the private options property, which dictates the structure of our
     * menu.*
     *
     * Options value example:
     *
     * {
     *     'File': [
     *         {
     *             'title': 'New',
     *             'callback': func
     *         },
     *         {
     *             'title': 'Save',
     *             'callback': func
     *         },
     *         ...
     *     ]
     * }
     */
    constructor(options, user) {

        let that = this;
        this.options = options;
        this.user    = user;
    }

    /**
     * Dismiss Menu
     *
     * Dismissess the menu. Used as an onclick handler.
     */
    _dismissMenu() {

        let nav = document.getElementById('menuBar');
        let ul  = nav.firstElementChild;

        ul.childNodes.forEach(function(elem, index, array) {
            if (elem.classList.contains('active')) {
                elem.classList.remove('active');
            }
        });
    }

    /**
     *
     */
     _userHasRole(role) {

        for(var index in this.user.roles) {
            var _role = this.user.roles[index];

            if (_role.name == role) {
                return true;
            }
        }

        return false;
     }

    /**
     * Draw
     *
     * Build and return DOM node representing menu HTML structure
     */
    draw() {

        let menu = document.createElement('ul');
        let that = this;
        let _opts = this.options;

        for (let key in this.options) {
            if (!this.options.hasOwnProperty(key)) continue;

            let li = document.createElement('li');
            let ul = document.createElement('ul');
            let liText = document.createTextNode(key);
            li.appendChild(liText);
            li.onclick = function(e) {
                e.stopPropagation();
                that._dismissMenu();
                that._dropDown(li);
            };

            for (let subkey in this.options[key]) {

                // Enabling this bit of code here, which checks if the user
                // has correct privilges to see this menu item, causes the
                // click handlers to get mixed up.
                //
                // TODO: Fix bug outlined above
                /*
                if (this.options[key][subkey].hasOwnProperty('roles')) {
                    var hasRole = false;
                    for(let roleIndex in this.options[key][subkey].roles) {
                        let role = this.options[key][subkey].roles[roleIndex];

                        if (this._userHasRole(role) || this._userHasRole('Admin')) {
                            hasRole = true;
                        }
                    }
                } else { var hasRole = true; }

                if (hasRole) {
                */
                    var menuItem = this.options[key][subkey];
                    let _li = document.createElement('li');
                    let _span = document.createElement('span');
                    let _liText = document.createTextNode(menuItem.title);

                    _span.appendChild(_liText);
                    _li.appendChild(_span);
                    _li.onclick = function() {
                        that._dismissMenu();
                        that.options[key][subkey].callback.call();
                    };
                    ul.appendChild(_li);
                //}
            }

            li.appendChild(ul);
            menu.appendChild(li);
        }

        return menu;
    }

    /**
     * Drop Down
     *
     * Add the active class to our main dom element
     */
    _dropDown(elem) {

        elem.classList.toggle('active');
    }
}

export default MenuBar;
