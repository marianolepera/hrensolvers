"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _notes = _interopRequireDefault(require("./routes/notes"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _users = _interopRequireDefault(require("./routes/users"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//middleware de express
var app = (0, _express.default)();
app.set("pkg", _package.default);
app.use(_express.default.json());
app.use((0, _morgan.default)("dev"));
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a mi crud de notas",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author
  });
}); // Routes

app.use("/api/notas", _notes.default);
app.use("/api/auth", _auth.default);
app.use("/api/usuarios", _users.default);
var _default = app;
exports.default = _default;