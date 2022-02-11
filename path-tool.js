
// path-tool @ npm, path tool

module.exports = {
	dirPart: function (path, removeTailSlash) {	//like path.dirname() + "/"
		var s = path.replace(/[^\\\/]*[\\\/]*$/, "");
		return removeTailSlash ? s.replace(/[\\\/]+$/, "") : s;
	},

	normalize: function (path) {		//like path.normalize()
		path = path.replace(/([\\\/])([\\\/]+)/g, "$1");	//shrink //
		path = path.replace(/(^|[\\\/])(\.([\\\/]|$))+/g, "$1");	//shrink /./

		//shrink dir/../
		var last = "";
		while (path && last != path) {
			last = path;
			path = path.replace(/(^|[\\\/])([^\.\\\/]|\.+[^\.\\\/])[^\\\/]*[\\\/]\.\.([\\\/]|$)/, "$1");
		}
		return path;
	},

	//unify path to a key string
	keyString: function (path) {
		return path.replace(/[\\\/]+/g, "/").replace(/\/+$/, "");
	},

}
