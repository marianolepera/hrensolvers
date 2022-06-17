"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNoteById = exports.getNotes = exports.getNoteById = exports.deleteNoteById = exports.createNote = void 0;

var _notes = _interopRequireDefault(require("../models/notes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createNote = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var note = new _notes.default(req.body);

    try {
      var noteSaved = yield note.save();
      res.status(201).json(noteSaved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function createNote(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createNote = createNote;

var getNotes = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var notes = yield _notes.default.find({});
      console.log(notes);
      res.json(notes);
    } catch (error) {
      console.log(error);
      next();
    }
  });

  return function getNotes(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getNotes = getNotes;

var getNoteById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var note = yield _notes.default.findById(req.params.noteId);

    if (!note) {
      res.json({
        mensaje: 'Esa nota no existe'
      });
      return next();
    } // Mostrar el producto


    res.json(note);
  });

  return function getNoteById(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getNoteById = getNoteById;

var updateNoteById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    try {
      var newNote = req.body;
      var note = yield _notes.default.findOneAndUpdate({
        _id: req.params.noteId
      }, newNote, {
        new: true
      });
      res.json(note);
    } catch (error) {
      console.log(error);
      next();
    }
  });

  return function updateNoteById(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateNoteById = updateNoteById;

var deleteNoteById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    try {
      yield _notes.default.findByIdAndDelete({
        _id: req.params.noteId
      });
      res.json({
        mensaje: 'la nota  se ha eliminado'
      });
    } catch (error) {
      console.log(error);
      next();
    }
  });

  return function deleteNoteById(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteNoteById = deleteNoteById;