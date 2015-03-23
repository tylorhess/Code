create file: manifest.json
{
	"manifest_version": 2,	// required

	// used inside Chrome to show which extensions are installed
	"name": "Short & Snappy Name", 
	"description": "One sentense.",
	"version": "1.0",


	"permissions": [
		"https://secure.flickr.com/"
	],
	"browser_action": {
		"default_icon": "icon.gif",
		"default_popup": "popup.html"
	}
}

// for more, visit: https://developer.chrome.com/extensions/getstarted