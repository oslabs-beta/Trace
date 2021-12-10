"use strict";
(() => {
var exports = {};
exports.id = 230;
exports.ids = [230];
exports.modules = {

/***/ 505:
/***/ ((module) => {

module.exports = import("socket.io");;

/***/ }),

/***/ 396:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(505);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([socket_io__WEBPACK_IMPORTED_MODULE_0__]);
socket_io__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  let data = await req.body;
  console.log(data);

  if (!res.socket.server.io) {
    const io = new socket_io__WEBPACK_IMPORTED_MODULE_0__.Server(res.socket.server);
    io.on('connect', async socket => {
      socket.join('main');
      console.log('socketio.ts: connected');
    });
    io.on('disconnect', socket => {
      socket.leave('main');
    });
    res.socket.server.io = io;
  }

  if (data !== null) res.socket.server.io.emit('data', data);
  res.end();
});
});

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(396));
module.exports = __webpack_exports__;

})();