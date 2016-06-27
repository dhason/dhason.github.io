// ==UserScript==
// @name        Twitch Plays Pokemon Visualizer Extension
// @namespace   https://dhason.github.io/twitch-visualizer.user.js
// @description Shows a PBR Visualizer below the stream.

// @include     /^https?://(www|beta)\.twitch\.tv\/(twitchplayspokemon(/(chat.*)?)?|chat\/.*channel=twitchplayspokemon.*)$/

// @version     1.0
// @updateURL   https://dhason.github.io/twitch-visualizer.meta.js
// @downloadURL https://dhason.github.io/twitch-visualizer.user.js
// @grant       none
// @run-at      document-end
// ==/UserScript==

/*
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function(code){
    "use strict";
        var s = document.createElement('script');
        s.appendChild(document.createTextNode(
           '(' + code.toString() + '());'
        ));
        document.body.appendChild(s);

}

(function(){
    "use strict";

    if (!window.$) {
        return;
    }

    var loaded = false;

    function main() {
        if(!loaded) {
            loaded = true;
            $("#player").after('<iframe src="https://www.tppvisuals.com/pbr/visualizer/" style="width: 100%; height: 950px;" scrolling="yes"></iframe>');
        }
    }
    
    if ($(".chat-settings").length) {
        main();
    } else {
        var ChatView_proto = require("web-client/views/chat")["default"].prototype;
        var original_didInsertElement = ChatView_proto.didInsertElement;
        ChatView_proto.didInsertElement = function(){
            original_didInsertElement && original_didInsertElement.apply(this, arguments);
            main();
        };
    }
}));
