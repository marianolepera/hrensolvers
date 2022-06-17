"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;

var _users = _interopRequireDefault(require("../models/users"));

var _config = _interopRequireDefault(require("../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      // Getting the Request Body
      var {
        email,
        password
      } = req.body; // Creating a new User Object

      var newUser = new _users.default({
        email,
        password: yield _users.default.encryptPassword(password)
      }); // Saving the User Object in Mongodb

      var savedUser = yield newUser.save(); // Create a token

      var token = _jsonwebtoken.default.sign({
        id: savedUser._id
      }, _config.default.SECRET, {
        expiresIn: 86400 // 24 hours

      });

      return res.status(200).json({
        token: token,
        payload: newUser
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      // Request body email can be an email or username
      var userFound = yield _users.default.findOne({
        email: req.body.email
      });
      if (!userFound) return res.status(400).json({
        message: "Usuario No encontrado"
      });
      var matchPassword = yield _users.default.comparePassword(req.body.password, userFound.password);
      if (!matchPassword) return res.status(401).json({
        token: null,
        message: "Contraseña invalida"
      });

      var token = _jsonwebtoken.default.sign({
        id: userFound._id
      }, _config.default.SECRET, {
        expiresIn: 86400 // 24 hours

      });

      res.json({
        token: token,
        payload: userFound
      });
    } catch (error) {
      console.log(error);
    }
  });

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;