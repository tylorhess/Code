
// youtube API
//	https://developers.google.com/youtube/js_api_reference?csw=1

var ytVideo, htmlString;

// keypress listeners:
//	] = +0.1 playback speed
//	[ = -0.1 playback speed
console.log("Adding event listener [keypress]...");
window.addEventListener('keypress', function(e){
    console.log("Got keypress: " + e.charCode);
    if(e.charCode == 91 || e.charCode == 93) {
        ytVideo = document.getElementsByTagName("video")[0];
        if(e.charCode == 91) {         /* LEFT BRACKET */                
            ytVideo.playbackRate = Math.round(10*(ytVideo.playbackRate-0.1))/10;
        } else if (e.charCode == 93) { /* RIGHT BRACKET */
            ytVideo.playbackRate = Math.round(10*(ytVideo.playbackRate+0.1))/10;
        }
        htmlString = '<div class="playbackRateDiv" style="position: absolute; top: 0; left: 0; z-index: 825;">x'+Math.round(10*ytVideo.playbackRate)/10+'</div>';
        ytVideo.parentNode.insertAdjacentHTML('afterbegin', htmlString);
        setTimeout(function () {
            ytVideo.parentNode.removeChild(document.getElementsByClassName('playbackRateDiv')[0]);
        }, 2000);
    } //else if (e.charCode == 32) { /* SPACE */
    	//document.getElementsByTagName("video")[0].pauseVideo();
    //}
})







// focus on youtube video
setTimeout(function () {
	document.getElementsByTagName("video")[0].tabIndex = 0;
	document.getElementsByTagName("video")[0].focus();
	//document.getElementById("player-api").firstChild.firstChild.tabIndex = 0;
	//document.getElementById("player-api").firstChild.firstChild.focus();
	//document.getElementById("player-api").firstChild.tabIndex = 0;
	//document.getElementById("player-api").firstChild.focus();
	//document.getElementById("player-api").tabIndex = 0;
	//document.getElementById("player-api").focus();
	//document.getElementById("player-mole-container").tabIndex = 0;
	//document.getElementById("player-mole-container").focus();
	//document.getElementById("player").tabIndex = 0;
	//document.getElementById("player").focus();
}, 1500);


// press [tab] three times to focus on youtube player
/*var keyboardEvent = document.createEvent("KeyboardEvent");
var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
keyboardEvent[initMethod](
                   "keypress", // event type : keydown, keyup, keypress
                    true, // bubbles
                    true, // cancelable
                    window, // viewArg: should be window
                    false, // ctrlKeyArg
                    false, // altKeyArg
                    false, // shiftKeyArg
                    false, // metaKeyArg
                    9, // keyCodeArg : unsigned long the virtual key code, else 0
                    9 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
);
//keyboardEvent.initKeyboardEvent("keypress", true, true, document.defaultView, k, k, "", "", false, "");
keyboardEvent.keyCodeVal = 9;
document.dispatchEvent(keyboardEvent);
document.dispatchEvent(keyboardEvent);
document.dispatchEvent(keyboardEvent);
*/

/*function focusMyFlash(name){
    var t=document[name]||window[name];
    if(t){
        t.tabIndex=0;
        t.focus();
    }
}
*/

//document.getElementById('myAnchor').focus()