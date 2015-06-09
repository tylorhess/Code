require('module');
var fs = require('fs');
var path = require('path');
module.exports = function(directorypath, extension, callback) { 	// module must export a single function
	fs.readdir(directorypath, filterFiles);
	function filterFiles(err, fileArray){
		var filteredFiles = [];
		if (err){
			callback(err, null);
		} else {
			fileArray.forEach(function(item) { 
				if (path.extname(item) === "."+extension) {
					filteredFiles.push(item);
				}
			});
			callback(null, filteredFiles);
			return filteredFiles;
		}
		//return filteredFiles;

	};
};