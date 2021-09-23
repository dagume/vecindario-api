"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.createComment = createComment;
exports.addPostLike = addPostLike;
exports.removePostLike = removePostLike;
exports.addPostDislike = addPostDislike;
exports.removePostDislike = removePostDislike;

var _post = _interopRequireDefault(require("../models/post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// All parent Posts
function getPosts(_x, _x2) {
  return _getPosts.apply(this, arguments);
} // get post by ID


function _getPosts() {
  _getPosts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var posts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _post["default"].findAll({
              where: {
                parent_id: null
              },
              include: {
                model: _post["default"],
                as: 'comments'
              },
              order: [['createdAt', 'DESC']]
            });

          case 3:
            posts = _context.sent;
            res.json({
              data: posts
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + _context.t0
              }
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getPosts.apply(this, arguments);
}

function getPostById(_x3, _x4) {
  return _getPostById.apply(this, arguments);
} // create a post


function _getPostById() {
  _getPostById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, post;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            // params
            id = req.params.id; // find post

            _context2.next = 4;
            return _post["default"].findOne({
              where: {
                id: id
              },
              include: {
                model: _post["default"],
                as: 'comments'
              }
            });

          case 4:
            post = _context2.sent;
            res.json({
              data: post
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + _context2.t0
              }
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _getPostById.apply(this, arguments);
}

function createPost(_x5, _x6) {
  return _createPost.apply(this, arguments);
} // Create a comment and count comments in the Post


function _createPost() {
  _createPost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, name, content, owner_email, newPost;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, content = _req$body.content, owner_email = _req$body.owner_email;
            _context3.prev = 1;
            _context3.next = 4;
            return _post["default"].create({
              name: name,
              content: content,
              owner_email: owner_email
            }, {
              fields: ['name', 'content', 'owner_email']
            });

          case 4:
            newPost = _context3.sent;

            if (newPost) {
              // return
              res.json({
                message: 'Post created successfully',
                data: newPost
              });
            }

            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.status(500).json({
              error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + _context3.t0
              }
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _createPost.apply(this, arguments);
}

function createComment(_x7, _x8) {
  return _createComment.apply(this, arguments);
} // add counter like in the Post


function _createComment() {
  _createComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, parent_id, name, content, owner_email, newComment, post, comment_counter;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, parent_id = _req$body2.parent_id, name = _req$body2.name, content = _req$body2.content, owner_email = _req$body2.owner_email;
            _context4.prev = 1;
            _context4.next = 4;
            return _post["default"].create({
              parent_id: parent_id,
              name: name,
              content: content,
              owner_email: owner_email
            }, {
              fields: ['parent_id', 'name', 'content', 'owner_email']
            });

          case 4:
            newComment = _context4.sent;

            if (!newComment) {
              _context4.next = 13;
              break;
            }

            _context4.next = 8;
            return _post["default"].findOne({
              where: {
                id: parent_id
              }
            });

          case 8:
            post = _context4.sent;
            // comments counter
            comment_counter = post.comment_counter + 1; // update comments counter

            _context4.next = 12;
            return post.update({
              comment_counter: comment_counter
            });

          case 12:
            // return
            res.json({
              message: 'Comment created successfully',
              data: newComment
            });

          case 13:
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](1);
            res.status(500).json({
              error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + _context4.t0
              }
            });

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 15]]);
  }));
  return _createComment.apply(this, arguments);
}

function addPostLike(_x9, _x10) {
  return _addPostLike.apply(this, arguments);
} // remove conuter like in the Post


function _addPostLike() {
  _addPostLike = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, message, post, like_counter;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.body.id;
            message = 'Error';
            _context5.prev = 2;
            _context5.next = 5;
            return _post["default"].findOne({
              where: {
                id: id,
                parent_id: null
              }
            });

          case 5:
            post = _context5.sent;

            if (!post) {
              _context5.next = 11;
              break;
            }

            // likes counter
            like_counter = post.like_counter + 1; // update likes counter

            _context5.next = 10;
            return post.update({
              like_counter: like_counter
            });

          case 10:
            message = 'Liked';

          case 11:
            // return
            res.json({
              message: message
            });
            _context5.next = 17;
            break;

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](2);
            res.status(500).json({
              error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + _context5.t0
              }
            });

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 14]]);
  }));
  return _addPostLike.apply(this, arguments);
}

function removePostLike(_x11, _x12) {
  return _removePostLike.apply(this, arguments);
} // add counter Dislike in the Post


function _removePostLike() {
  _removePostLike = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, message, post, counter, like_counter;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.body.id;
            message = 'Error';
            _context6.prev = 2;
            _context6.next = 5;
            return _post["default"].findOne({
              where: {
                id: id,
                parent_id: null
              }
            });

          case 5:
            post = _context6.sent;

            if (!post) {
              _context6.next = 12;
              break;
            }

            // likes counter
            counter = post.like_counter - 1; // liking can't be negative value

            like_counter = post.like_counter == 0 ? 0 : counter; // update likes counter

            _context6.next = 11;
            return post.update({
              like_counter: like_counter
            });

          case 11:
            message = 'Liking was remove';

          case 12:
            // return
            res.json({
              message: message
            });
            _context6.next = 18;
            break;

          case 15:
            _context6.prev = 15;
            _context6.t0 = _context6["catch"](2);
            res.status(500).json({
              error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + _context6.t0
              }
            });

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 15]]);
  }));
  return _removePostLike.apply(this, arguments);
}

function addPostDislike(_x13, _x14) {
  return _addPostDislike.apply(this, arguments);
} // remove conuter Dislike in the Post


function _addPostDislike() {
  _addPostDislike = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, message, post, dislike_counter;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.body.id;
            message = 'Error';
            _context7.prev = 2;
            _context7.next = 5;
            return _post["default"].findOne({
              where: {
                id: id,
                parent_id: null
              }
            });

          case 5:
            post = _context7.sent;

            if (!post) {
              _context7.next = 11;
              break;
            }

            // likes counter
            dislike_counter = post.dislike_counter + 1; // update likes counter

            _context7.next = 10;
            return post.update({
              dislike_counter: dislike_counter
            });

          case 10:
            message = 'Disliked';

          case 11:
            // return
            res.json({
              message: message
            });
            _context7.next = 17;
            break;

          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](2);
            res.status(500).json({
              error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + _context7.t0
              }
            });

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 14]]);
  }));
  return _addPostDislike.apply(this, arguments);
}

function removePostDislike(_x15, _x16) {
  return _removePostDislike.apply(this, arguments);
}

function _removePostDislike() {
  _removePostDislike = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, message, post, counter, dislike_counter;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.body.id;
            message = 'Error';
            _context8.prev = 2;
            _context8.next = 5;
            return _post["default"].findOne({
              where: {
                id: id,
                parent_id: null
              }
            });

          case 5:
            post = _context8.sent;

            if (!post) {
              _context8.next = 12;
              break;
            }

            // likes counter
            counter = post.dislike_counter - 1; // liking can't be negative value

            dislike_counter = post.dislike_counter == 0 ? 0 : counter; // update likes counter

            _context8.next = 11;
            return post.update({
              dislike_counter: dislike_counter
            });

          case 11:
            message = 'Disliking was remove';

          case 12:
            // return
            res.json({
              message: message
            });
            _context8.next = 18;
            break;

          case 15:
            _context8.prev = 15;
            _context8.t0 = _context8["catch"](2);
            res.status(500).json({
              error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + _context8.t0
              }
            });

          case 18:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[2, 15]]);
  }));
  return _removePostDislike.apply(this, arguments);
}