'use strict';

import Ajax from "./Ajax.js";

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

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

var btn = document.getElementById('submit');
btn.onclick = _submitForm;

function _submitForm(e) {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    login(email, password);
}
