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
$traceurRuntime.registerModule("login.js", [], function() {
  "use strict";
  var __moduleName = "login.js";
  var Ajax = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./Ajax.js", "login.js")).default;
  function login(email, password) {
    var ajax = new Ajax('POST', 'http://127.0.0.1/index.php/login', {
      email: email,
      password: password
    }, function(serverResponse) {
      var response = JSON.parse(serverResponse);
      if (response.success) {
        createCookie('mapeditor-login', serverResponse, 7);
        window.location = 'file:///home/jspaceboots/Projects/2016/dungeoncrawler/mapeditor/mapeditor.html';
      } else {
        var msg = document.getElementById('messages');
        msg.textContent = 'Email or Password invalid';
      }
    });
    ajax.send();
  }
  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    } else
      var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  var btn = document.getElementById('submit');
  btn.onclick = _submitForm;
  function _submitForm(e) {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    login(email, password);
  }
  return {};
});
$traceurRuntime.getModule("login.js" + '');
