// Extensions... 
//	are essentially web pages
//	can use all the APIs that the browser provides to web pages (XMLHttpRequest, JSON, HTML5, ...)
//	can interact with web pages or servers using 
//		content scripts
//		cross-origin XMLHttpRequests
//	can't use chrome.* APIs (except some of chrome.extension.*)
//	can only access chrome.* APIs, extension data/actions via message passing (https://developer.chrome.com/extensions/messaging)
//	can't use variables/functions defined by other content scripts or web pages or their extension's pages


// Load Unpacked Extension
chrome://extensions (Settings > "Extensions" tab) 
	check "Developer Mode" box
	"Load unpacked extension..." button
	choose folder

// Pack Extension
chrome://extensions (Settings > "Extensions" tab) 
	check "Developer Mode" box
	"Pack extension..." button	// zips folder (option to encrypt) to create a normal Chrome Extension

// Reload Extension
chrome://extensions (Settings > "Extensions" tab) 
	click "Reload (⌘R)" link (under extension you want to reload)

// Inside the Extension folder

manifest.json
// https://developer.chrome.com/extensions/manifest
{
	"manifest_version": 2,	// required

	// displayed in chrome://extensions
	"name": "Short and Snappy Name", 			// required?
	"description": "One sentence description.",	// required?
	"version": "1.0", 							// required? extension version (not manifest version)

	// Chrome extension icon and browser interaction
	"browser_action": {	// add to Chrome toolbar: icon, popup, tooltip, badge (https://developer.chrome.com/extensions/browserAction)
		"default_icon": "icon.png",	// optional 19x19 px icon
		"default_title": "Google Mail",	// optional tooltip
		"default_popup": "popup.html"		// optional popup html
		// badge = bit of text layered over the icon (info about state of extension; i.e. - "2" new messages)
	},
	"page_action": {	// add to Chrome url address bar: icon, popup, tooltip, badge (https://developer.chrome.com/extensions/pageAction)
		"default_icon": {
			"19": "images/icon19.png",	// optional 19x19 px icon
			"38": "images/icon38.png"	// optional 38x38 px icon
		},
		"default_title": "Google Mail",	// optional tooltip
		"default_popup": "popup.html"		// optional popup html
	},
	// can also interact with bookmarks, tabs, ...

	// content scripts (similar to: user scripts)
	"content_scripts": [
		{
			"matches": ["http://www.google.com/*"],	// required (match patterns: https://developer.chrome.com/extensions/match_patterns)
			//"exclude_matches": [..., ...],		// optional
			//"match_about_blank": false (default) | true // optional: match when url = about:blank or about:srcdoc
			//"all_frames": false (default) | true	// optional: run scripts only in top frame of matching page (default/false) or all frames (true)
			//"include_globs": [..., ...],			// optional: emulates Greasemonkey @include (more flexible than match patterns)
			//"exclude_globs": [..., ...],			// optional: emulates Greasemonkey @exclude (more flexible than match patterns)
			"css": ["mystyles.css"],				// optional
			"js": ["jquery.js", "myscript.js"]		// optional
			"run_at": "document_idle" (default) | "document_start" | "document_end"	// optional
		},
		{
			"matches": ...
		}
	],

	"permissions": [
		"https://secure.flickr.com/"
	]
	
}
icons: img/icon.png, images/icon19.png, images/icon38.png, ...
html: popup.html
js: js/jquery.min.js, myscript.js
	// chrome.extension.getURL (display image example)
	var imgURL = chrome.extension.getURL("images/myimage.png");
	document.getElementById("someImage").src = imgURL;


