// global, for html page
path_tool = require("../path-tool.js");
assert = require("assert");

module.exports = {

	"dirPart()": function (done) {

		assert(path_tool.dirPart("aaa/bbb") === "aaa/");		//like path.dirname() + "/"
		assert(path_tool.dirPart("aaa/bbb/") === "aaa/");
		assert(path_tool.dirPart("aaa\\bbb") === "aaa\\");		//will not change original '/' or '\\'
		assert(path_tool.dirPart("aaa\\bbb\\") === "aaa\\");

		assert(path_tool.dirPart("/") === "");
		assert(path_tool.dirPart("\\") === "");

		assert(path_tool.dirPart("/aa") === "/");
		assert(path_tool.dirPart("\\aa") === "\\");
		assert(path_tool.dirPart("aa/") === "");
		assert(path_tool.dirPart("aa\\") === "");

		done(false);
	},

	"normalize()": function (done) {

		assert(path_tool.normalize("aaa///\\//\\//bbb") === "aaa/bbb");		//shrink //
		assert(path_tool.normalize("aaa\\///\\//\\//bbb") === "aaa\\bbb");

		assert(path_tool.normalize("/./aaa") === "/aaa");	//shrink /./
		assert(path_tool.normalize("./aaa") === "aaa");

		assert(path_tool.normalize("aaa/./") === "aaa/");
		assert(path_tool.normalize("aaa/.") === "aaa/");

		assert(path_tool.normalize("aaa/./bbb") === "aaa/bbb");
		assert(path_tool.normalize("aaa/././bbb") === "aaa/bbb");
		assert(path_tool.normalize("aaa/./bbb/././ccc") === "aaa/bbb/ccc");

		assert(path_tool.normalize("aaa/../bbb") === "bbb");	//shrink dir/../
		assert(path_tool.normalize("/aaa/../bbb") === "/bbb");

		assert(path_tool.normalize("/../bbb") === "/../bbb");
		assert(path_tool.normalize("../bbb") === "../bbb");

		assert(path_tool.normalize("bbb/../") === "");
		assert(path_tool.normalize("bbb/..") === "");
		assert(path_tool.normalize("/bbb/../") === "/");
		assert(path_tool.normalize("/bbb/..") === "/");

		assert(path_tool.normalize("aaa/bbb/ccc/../../ddd") === "aaa/ddd");
		assert(path_tool.normalize("aaa/bbb/../ccc/../../ddd") === "ddd");

		assert(path_tool.normalize("aaa/bbb/../ccc/../../../ddd") === "../ddd");
		assert(path_tool.normalize("/aaa/bbb/../ccc/../../../ddd") === "/../ddd");
		assert(path_tool.normalize("../aaa/bbb/../ccc/../../../ddd") === "../../ddd");

		//old test code
		
		assert(path_tool.normalize("111/././222/333/444/../../555/")==='111/222/555/');
		assert(path_tool.normalize("111/././222/333/444/../../555/../")==='111/222/');
		assert(path_tool.normalize("111/././222/333/444/../../555/..")==='111/222/');
		assert(path_tool.normalize("111/././222/333/444/../../555/./")==='111/222/555/');
		assert(path_tool.normalize("111/././222/333/444/../../555/.")==='111/222/555/');
		assert(path_tool.normalize("./111/././222/333/444/../../555/.")==='111/222/555/');
		assert(path_tool.normalize("././111/././222/333/444/../../555/.")==='111/222/555/');
		assert(path_tool.normalize("/./111/././222/333/444/../../555/.")==='/111/222/555/');
		assert(path_tool.normalize("/../111/././222/333/444/../../555/.")==='/../111/222/555/');
		assert(path_tool.normalize("../111/././222/333/444/../../555/.")==='../111/222/555/');
		assert(path_tool.normalize("../111/.././222/333/444/../../555/.")==='../222/555/');
		assert(path_tool.normalize("../111/../../222/333/444/../../555/.")==='../../222/555/');
		assert(path_tool.normalize("../../111/../../222/333/444/../../555/.")==='../../../222/555/');
		assert(path_tool.normalize("/../../111/../../222/333/444/../../555/.")==='/../../../222/555/');
		assert(path_tool.normalize("/../../.11/../../222/333./4.44/../../555/.")==='/../../../222/555/');
		assert(path_tool.normalize("/../../..11/../../222/333../4..44/../../555/.")==='/../../../222/555/');

		done(false);
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('mocha-test', function () { for (var i in module.exports) { it(i, module.exports[i]); } });
