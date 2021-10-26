# path-tool
path tool

# Install
```
npm install path-tool
```

# Usage
```javascript
var path_tool = require("path-tool");

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

```