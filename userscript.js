// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://calculadorasonline.com/generador-de-estructura-de-lewis-online-regla-del-octeto/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=calculadorasonline.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //use native js
    setTimeout(function() {
        document.getElementById('input__formula').addEventListener('keypress', function(e) {
            if (e.keyCode == 13) {
                document.getElementById('gen').click();
            }
        });
    }, 1000);
    document.addEventListener('keyup', function(e) {
        if (e.keyCode == 27) {
            document.getElementById('volver').click();
            document.getElementById('input__formula').focus();
        }
    });
})();