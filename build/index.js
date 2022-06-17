"use strict";

var _app = _interopRequireDefault(require("./app"));

require("./database");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.default.listen(_config.default.PORT);

console.log("server listen", _config.default.PORT);