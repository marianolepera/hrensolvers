"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect(_config.default.MONGODB_URI_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => console.log("base de datos conectada")).catch(err => console.log(err));