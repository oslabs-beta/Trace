"use strict";
exports.id = 695;
exports.ids = [695];
exports.modules = {

/***/ 662:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);






const Header = ({
  size,
  text
}) => {
  const {
    colorMode,
    toggleColorMode
  } = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.useColorMode)();
  const {
    0: textColor,
    1: setTextColor
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('blue.100');

  const colorChange = () => {
    if (colorMode === 'light') {
      setTextColor('blue.900');
    } else {
      setTextColor('blue.100');
    }
  };

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    colorChange();
  }, [colorMode]);
  let resize;
  let width;

  switch (size) {
    case 'lg':
      resize = '2.5em';
      width = '400px';
      break;

    case 'md':
      resize = '2em';
      width = '300px';
      break;

    case 'sm':
      resize = '1.5em';
      width = '500px';
      break;
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Flex, {
    fontSize: resize,
    w: width,
    mb: "1rem",
    alignItems: "center",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Text, {
      fontFamily: "serif",
      fontSize: "3rem",
      mr: ".8rem",
      children: "trace "
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Text, {
      fontWeight: 'thin',
      fontSize: "2rem",
      children: "|"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Text, {
      fontWeight: 'thin',
      color: textColor,
      ml: ".8rem",
      pt: ".6rem",
      children: text
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ })

};
;