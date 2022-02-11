# path-tool
path tool

# Install
```
npm install path-tool
```

# Usage & Api
```javascript
var path_tool = require("path-tool");

//.dirPart(path, removeTailSlash)		//like path.dirname() + "/"

(path_tool.dirPart("aaa/bbb") === "aaa/") &&
(path_tool.dirPart("aaa/bbb/") === "aaa/") &&
(path_tool.dirPart("aaa\\bbb") === "aaa\\") &&		//will not change original '/' or '\\'
(path_tool.dirPart("aaa\\bbb\\") === "aaa\\") &&

(path_tool.dirPart("aaa\\bbb\\", true) === "aaa") &&		//argument: removeTailSlash

(path_tool.dirPart("/") === "") &&
(path_tool.dirPart("\\") === "") &&

(path_tool.dirPart("/aa") === "/") &&
(path_tool.dirPart("\\aa") === "\\") &&
(path_tool.dirPart("aa/") === "") &&
(path_tool.dirPart("aa\\") === "");

//.normalize(path)		//like path.normalize()

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
(path_tool.normalize("../aaa/bbb/../ccc/../../../ddd") === "../../ddd");

```
