"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  MONGODB_URI_ATLAS: process.env.MONGODB_URI_ATLAS,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 4000,
  SECRET: process.env.SECRET
};
exports.default = _default;