"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _mysql = require("../Database/mysql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Post = _mysql.sequelize.define('posts', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  parent_id: {
    type: _sequelize["default"].INTEGER
  },
  name: {
    type: _sequelize["default"].STRING
  },
  content: {
    type: _sequelize["default"].STRING
  },
  owner_email: {
    type: _sequelize["default"].STRING
  },
  comment_counter: {
    type: _sequelize["default"].INTEGER
  },
  like_counter: {
    type: _sequelize["default"].INTEGER
  },
  dislike_counter: {
    type: _sequelize["default"].INTEGER
  }
}, {
  timestamps: true
});

Post.hasMany(Post, {
  as: 'comments',
  foreignKey: 'parent_id'
});
var _default = Post;
exports["default"] = _default;