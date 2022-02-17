
// path-tool @ npm, path tool

var dirPart = function (path, removeTailSlash) {	//like path.dirname() + "/"
	var s = path.replace(/[^\\\/]*[\\\/]*$/, "");
	return removeTailSlash ? s.replace(/[\\\/]+$/, "") : s;
}

var normalize = function (path) {		//like path.normalize()
	path = path.replace(/([\\\/])([\\\/]+)/g, "$1");	//shrink //
	path = path.replace(/(^|[\\\/])(\.([\\\/]|$))+/g, "$1");	//shrink /./

	//shrink dir/../
	var last = "";
	while (path && last != path) {
		last = path;
		path = path.replace(/(^|[\\\/])([^\.\\\/]|\.+[^\.\\\/])[^\\\/]*[\\\/]\.\.([\\\/]|$)/, "$1");
	}
	return path;
}

//unify path to a key string
var keyString = function (path, ignoreCase) {
	return (ignoreCase ? path.toLowerCase() : path).replace(/[\\\/]+/g, "/").replace(/\/+$/, "");
}

//check if 2 paths are same
var isSame = function (path1, path2, ignoreCase) {
	return keyString(path1, ignoreCase) === keyString(path2, ignoreCase);
}

//module

module.exports = {
	dirPart: dirPart,
	normalize: normalize,
	keyString: keyString,
	isSame: isSame,
}
