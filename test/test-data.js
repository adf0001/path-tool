
//global variable, for html page, refer tpsvr @ npm.
path_tool = require("../path-tool.js");

module.exports = {

	"dirPart()": function (done) {
		done(!(
			(path_tool.dirPart("aaa/bbb") === "aaa/") &&		//like path.dirname() + "/"
			(path_tool.dirPart("aaa/bbb/") === "aaa/") &&
			(path_tool.dirPart("aaa\\bbb") === "aaa\\") &&		//will not change original '/' or '\\'
			(path_tool.dirPart("aaa\\bbb\\") === "aaa\\") &&

			(path_tool.dirPart("aaa\\bbb\\", true) === "aaa") &&		//argument: removeTailSlash

			(path_tool.dirPart("/") === "") &&
			(path_tool.dirPart("\\") === "") &&

			(path_tool.dirPart("/aa") === "/") &&
			(path_tool.dirPart("\\aa") === "\\") &&
			(path_tool.dirPart("aa/") === "") &&
			(path_tool.dirPart("aa\\") === "")

		));
	},

	"normalize()": function (done) {

		done(!(
			(path_tool.normalize("aaa///\\//\\//bbb") === "aaa/bbb") &&		//shrink //
			(path_tool.normalize("aaa\\///\\//\\//bbb") === "aaa\\bbb") &&

			(path_tool.normalize("/./aaa") === "/aaa") &&		//shrink /./
			(path_tool.normalize("./aaa") === "aaa") &&

			(path_tool.normalize("aaa/./") === "aaa/") &&
			(path_tool.normalize("aaa/.") === "aaa/") &&

			(path_tool.normalize("aaa/./bbb") === "aaa/bbb") &&
			(path_tool.normalize("aaa/././bbb") === "aaa/bbb") &&
			(path_tool.normalize("aaa/./bbb/././ccc") === "aaa/bbb/ccc") &&

			(path_tool.normalize("aaa/../bbb") === "bbb") &&		//shrink dir/../
			(path_tool.normalize("/aaa/../bbb") === "/bbb") &&

			(path_tool.normalize("/../bbb") === "/../bbb") &&
			(path_tool.normalize("../bbb") === "../bbb") &&

			(path_tool.normalize("bbb/../") === "") &&
			(path_tool.normalize("bbb/..") === "") &&
			(path_tool.normalize("/bbb/../") === "/") &&
			(path_tool.normalize("/bbb/..") === "/") &&

			(path_tool.normalize("aaa/bbb/ccc/../../ddd") === "aaa/ddd") &&
			(path_tool.normalize("aaa/bbb/../ccc/../../ddd") === "ddd") &&

			(path_tool.normalize("aaa/bbb/../ccc/../../../ddd") === "../ddd") &&
			(path_tool.normalize("/aaa/bbb/../ccc/../../../ddd") === "/../ddd") &&
			(path_tool.normalize("../aaa/bbb/../ccc/../../../ddd") === "../../ddd") &&

			//old test code

			(path_tool.normalize("111/././222/333/444/../../555/") === '111/222/555/') &&
			(path_tool.normalize("111/././222/333/444/../../555/../") === '111/222/') &&
			(path_tool.normalize("111/././222/333/444/../../555/..") === '111/222/') &&
			(path_tool.normalize("111/././222/333/444/../../555/./") === '111/222/555/') &&
			(path_tool.normalize("111/././222/333/444/../../555/.") === '111/222/555/') &&
			(path_tool.normalize("./111/././222/333/444/../../555/.") === '111/222/555/') &&
			(path_tool.normalize("././111/././222/333/444/../../555/.") === '111/222/555/') &&
			(path_tool.normalize("/./111/././222/333/444/../../555/.") === '/111/222/555/') &&
			(path_tool.normalize("/../111/././222/333/444/../../555/.") === '/../111/222/555/') &&
			(path_tool.normalize("../111/././222/333/444/../../555/.") === '../111/222/555/') &&
			(path_tool.normalize("../111/.././222/333/444/../../555/.") === '../222/555/') &&
			(path_tool.normalize("../111/../../222/333/444/../../555/.") === '../../222/555/') &&
			(path_tool.normalize("../../111/../../222/333/444/../../555/.") === '../../../222/555/') &&
			(path_tool.normalize("/../../111/../../222/333/444/../../555/.") === '/../../../222/555/') &&
			(path_tool.normalize("/../../.11/../../222/333./4.44/../../555/.") === '/../../../222/555/') &&
			(path_tool.normalize("/../../..11/../../222/333../4..44/../../555/.") === '/../../../222/555/')
		));
	},

	"keyString()": function (done) {

		done(!(
			(path_tool.keyString("aaa///\\//\\//bbb") === "aaa/bbb") &&
			(path_tool.keyString("aaa\\bbb\\") === "aaa/bbb") &&

			(path_tool.keyString("http://aaa") === "http:/aaa") &&
			(path_tool.keyString("\\\\SS-PC\\shared") === "/SS-PC/shared")
		));
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('path_tool', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
