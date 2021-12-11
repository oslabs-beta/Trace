"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./components/sidebar.tsx":
/*!********************************!*\
  !*** ./components/sidebar.tsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _navitem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navitem */ \"./components/navitem.tsx\");\n/* harmony import */ var _state_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/hooks */ \"./state/hooks.ts\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var _state_action_creators_export__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/action-creators/export */ \"./state/action-creators/export.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons/fi */ \"./node_modules/react-icons/fi/index.esm.js\");\n/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-icons/bs */ \"./node_modules/react-icons/bs/index.esm.js\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! framer-motion */ \"./node_modules/framer-motion/dist/es/index.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar _jsxFileName = \"/Users/graceyun/Documents/trace/components/sidebar.tsx\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\n// Based off Chakra UI Responsive Sidebar Tutorial: https://github.com/bjcarlson42/chakra-left-responsive-navbar/tree/main/components\n// React/Redux, Next, and Styled Components Imports\n\n\n\n\n\n // Chakra Imports\n\n // Feather Icon Imports\n\n\n // Framer Motion\n\n\n\nvar mainVariants = {\n  'small': {\n    width: '80px'\n  },\n  'big': {\n    width: '200px'\n  }\n};\nvar innerVariants = {\n  'small': {\n    alignItems: 'center'\n  },\n  'big': {\n    alignItems: 'flex-start',\n    transition: {\n      duration: 1.5\n    }\n  }\n};\n\nvar Sidebar = function Sidebar() {\n  _s();\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"small\"),\n      navSize = _useState[0],\n      changeNavSize = _useState[1];\n\n  var dispatch = (0,_state_hooks__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch)();\n\n  var _bindActionCreators = (0,redux__WEBPACK_IMPORTED_MODULE_6__.bindActionCreators)(_state_action_creators_export__WEBPACK_IMPORTED_MODULE_3__.actionCreators, dispatch),\n      deleteDataActionCreator = _bindActionCreators.deleteDataActionCreator;\n\n  var router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n\n  var handleReset = function handleReset() {\n    deleteDataActionCreator();\n    router.reload();\n  };\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_7__.motion.div, {\n    animate: navSize === 'small' ? 'small' : 'big',\n    style: {\n      left: '5'\n    },\n    transition: {\n      ease: 'easeInOut'\n    },\n    variants: mainVariants,\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Flex, {\n      position: \"-webkit-sticky\",\n      bottom: \"0\",\n      \"align-self\": \"flex-start\",\n      height: \"100vh\",\n      backgroundColor: \"blue.700\",\n      flexDir: \"column\",\n      justify: \"space-between\",\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_7__.motion.div, {\n        animate: navSize === 'small' ? 'small' : 'big',\n        transition: {\n          ease: 'easeInOut'\n        },\n        variants: innerVariants,\n        style: {\n          display: 'flex',\n          padding: '5%',\n          flexDirection: 'column',\n          width: '100%'\n        },\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.IconButton, {\n          \"aria-label\": \"This is the button to open the menu\",\n          background: \"none\",\n          mt: 5,\n          _hover: {\n            background: 'none'\n          },\n          icon: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(react_icons_fi__WEBPACK_IMPORTED_MODULE_9__.FiMenu, {}, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 78,\n            columnNumber: 23\n          }, _this),\n          onClick: function onClick() {\n            if (navSize == \"small\") changeNavSize(\"big\");else changeNavSize(\"small\");\n          },\n          style: {\n            alignItems: 'center'\n          }\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 73,\n          columnNumber: 13\n        }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_navitem__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n          navSize: navSize,\n          icon: react_icons_fi__WEBPACK_IMPORTED_MODULE_9__.FiGrid,\n          title: \"Dashboard\",\n          description: \"See all your resolver metrics in one place.\",\n          path: \"/\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 87,\n          columnNumber: 13\n        }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_navitem__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n          navSize: navSize,\n          icon: react_icons_bs__WEBPACK_IMPORTED_MODULE_10__.BsArrowCounterclockwise,\n          title: \"Reset\",\n          description: \"Reset your query and resolver tracing data.\",\n          onClick: handleReset\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 88,\n          columnNumber: 13\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 66,\n        columnNumber: 9\n      }, _this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 57,\n      columnNumber: 7\n    }, _this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 51,\n    columnNumber: 5\n  }, _this);\n};\n\n_s(Sidebar, \"kfLXTtPF/plX5VAPiBa9GmqT/l8=\", false, function () {\n  return [_state_hooks__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch, next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter];\n});\n\n_c = Sidebar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sidebar);\n\nvar _c;\n\n$RefreshReg$(_c, \"Sidebar\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxpQkFQSixlQXFCSSw4REFBQyxnREFBRDtBQUFTLGlCQUFPLEVBQUVJLE9BQWxCO0FBQTJCLGNBQUksRUFBRVYsa0RBQWpDO0FBQXlDLGVBQUssRUFBQyxXQUEvQztBQUEyRCxxQkFBVyxFQUFDLDZDQUF2RTtBQUFxSCxjQUFJLEVBQUM7QUFBMUg7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFyQkosZUFzQkksOERBQUMsZ0RBQUQ7QUFBUyxpQkFBTyxFQUFFVSxPQUFsQjtBQUEyQixjQUFJLEVBQUVULG9FQUFqQztBQUEwRCxlQUFLLEVBQUMsT0FBaEU7QUFBd0UscUJBQVcsRUFBQyw2Q0FBcEY7QUFBa0ksaUJBQU8sRUFBRWM7QUFBM0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkF0Qko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERjtBQTJDRCxDQXRERDs7R0FBTU47VUFFYWhCLDBEQUVGRzs7O0tBSlhhO0FBd0ROLCtEQUFlQSxPQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvc2lkZWJhci50c3g/N2E4NyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCYXNlZCBvZmYgQ2hha3JhIFVJIFJlc3BvbnNpdmUgU2lkZWJhciBUdXRvcmlhbDogaHR0cHM6Ly9naXRodWIuY29tL2JqY2FybHNvbjQyL2NoYWtyYS1sZWZ0LXJlc3BvbnNpdmUtbmF2YmFyL3RyZWUvbWFpbi9jb21wb25lbnRzXG5cbi8vIFJlYWN0L1JlZHV4LCBOZXh0LCBhbmQgU3R5bGVkIENvbXBvbmVudHMgSW1wb3J0c1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBOYXZJdGVtIGZyb20gJy4vbmF2aXRlbSdcbmltcG9ydCB7IHVzZUFwcERpc3BhdGNoIH0gZnJvbSAnLi4vc3RhdGUvaG9va3MnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGFjdGlvbkNyZWF0b3JzIH0gZnJvbSAnLi4vc3RhdGUvYWN0aW9uLWNyZWF0b3JzL2V4cG9ydCdcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJ1xuXG4vLyBDaGFrcmEgSW1wb3J0c1xuaW1wb3J0IHtcbiAgRmxleCxcbiAgSWNvbkJ1dHRvbixcbn0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCdcblxuLy8gRmVhdGhlciBJY29uIEltcG9ydHNcbmltcG9ydCB7XG4gIEZpTWVudSxcbiAgRmlHcmlkLFxufSBmcm9tICdyZWFjdC1pY29ucy9maSdcblxuaW1wb3J0IHsgQnNBcnJvd0NvdW50ZXJjbG9ja3dpc2UgfSBmcm9tICdyZWFjdC1pY29ucy9icydcblxuLy8gRnJhbWVyIE1vdGlvblxuaW1wb3J0IHsgbW90aW9uIH0gZnJvbSAnZnJhbWVyLW1vdGlvbic7XG5jb25zdCBtYWluVmFyaWFudHMgPSB7XG4gICdzbWFsbCc6IHsgd2lkdGg6ICc4MHB4JyB9LFxuICAnYmlnJzogeyB3aWR0aDogJzIwMHB4JyB9XG59XG5jb25zdCBpbm5lclZhcmlhbnRzID0ge1xuICAnc21hbGwnOiB7IGFsaWduSXRlbXM6ICdjZW50ZXInIH0sXG4gICdiaWcnOiB7IFxuICAgIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JyxcbiAgICB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAxLjUgfSxcbiAgIH1cbn1cblxuY29uc3QgU2lkZWJhciA9ICgpID0+IHtcbiAgY29uc3QgW25hdlNpemUsIGNoYW5nZU5hdlNpemVdID0gdXNlU3RhdGUoXCJzbWFsbFwiKVxuICBjb25zdCBkaXNwYXRjaCA9IHVzZUFwcERpc3BhdGNoKCk7XG4gIGNvbnN0IHsgZGVsZXRlRGF0YUFjdGlvbkNyZWF0b3IgfSA9IGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuXG4gIGNvbnN0IGhhbmRsZVJlc2V0ID0gKCkgPT4ge1xuICAgIGRlbGV0ZURhdGFBY3Rpb25DcmVhdG9yKClcbiAgICByb3V0ZXIucmVsb2FkKClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPG1vdGlvbi5kaXZcbiAgICAgIGFuaW1hdGU9e25hdlNpemUgPT09ICdzbWFsbCcgPyAnc21hbGwnIDogJ2JpZyd9XG4gICAgICBzdHlsZT17IHsgbGVmdDogJzUnIH0gfVxuICAgICAgdHJhbnNpdGlvbj17IHsgZWFzZTogJ2Vhc2VJbk91dCcgfSB9XG4gICAgICB2YXJpYW50cz17bWFpblZhcmlhbnRzfVxuICAgID5cbiAgICAgIDxGbGV4XG4gICAgICAgIHBvc2l0aW9uPSctd2Via2l0LXN0aWNreSdcbiAgICAgICAgYm90dG9tPScwJ1xuICAgICAgICBhbGlnbi1zZWxmPSdmbGV4LXN0YXJ0J1xuICAgICAgICBoZWlnaHQ9JzEwMHZoJ1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I9J2JsdWUuNzAwJ1xuICAgICAgICBmbGV4RGlyPSdjb2x1bW4nXG4gICAgICAgIGp1c3RpZnk9J3NwYWNlLWJldHdlZW4nXG4gICAgICA+XG4gICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgYW5pbWF0ZT17bmF2U2l6ZSA9PT0gJ3NtYWxsJyA/ICdzbWFsbCcgOiAnYmlnJ31cbiAgICAgICAgICB0cmFuc2l0aW9uPXsgeyBlYXNlOiAnZWFzZUluT3V0JyB9IH1cbiAgICAgICAgICB2YXJpYW50cz17aW5uZXJWYXJpYW50c31cbiAgICAgICAgICBzdHlsZT17IHsgZGlzcGxheTogJ2ZsZXgnLCBwYWRkaW5nOiAnNSUnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgd2lkdGg6ICcxMDAlJyB9IH1cbiAgICAgICAgPlxuICAgICAgICAgIFxuICAgICAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPSdUaGlzIGlzIHRoZSBidXR0b24gdG8gb3BlbiB0aGUgbWVudSdcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgbXQ9ezV9XG4gICAgICAgICAgICAgICAgX2hvdmVyPXt7IGJhY2tncm91bmQ6ICdub25lJyB9fVxuICAgICAgICAgICAgICAgIGljb249ezxGaU1lbnUgLz59XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmF2U2l6ZSA9PSBcInNtYWxsXCIpIGNoYW5nZU5hdlNpemUoXCJiaWdcIilcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBjaGFuZ2VOYXZTaXplKFwic21hbGxcIilcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHN0eWxlPXsgeyBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPE5hdkl0ZW0gbmF2U2l6ZT17bmF2U2l6ZX0gaWNvbj17RmlHcmlkfSB0aXRsZT1cIkRhc2hib2FyZFwiIGRlc2NyaXB0aW9uPVwiU2VlIGFsbCB5b3VyIHJlc29sdmVyIG1ldHJpY3MgaW4gb25lIHBsYWNlLlwiIHBhdGg9Jy8nIC8+XG4gICAgICAgICAgICA8TmF2SXRlbSBuYXZTaXplPXtuYXZTaXplfSBpY29uPXtCc0Fycm93Q291bnRlcmNsb2Nrd2lzZX0gdGl0bGU9XCJSZXNldFwiIGRlc2NyaXB0aW9uPVwiUmVzZXQgeW91ciBxdWVyeSBhbmQgcmVzb2x2ZXIgdHJhY2luZyBkYXRhLlwiIG9uQ2xpY2s9e2hhbmRsZVJlc2V0fSAvPlxuICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICA8L0ZsZXg+XG4gICAgPC9tb3Rpb24uZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZGViYXI7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJOYXZJdGVtIiwidXNlQXBwRGlzcGF0Y2giLCJiaW5kQWN0aW9uQ3JlYXRvcnMiLCJhY3Rpb25DcmVhdG9ycyIsInVzZVJvdXRlciIsIkZsZXgiLCJJY29uQnV0dG9uIiwiRmlNZW51IiwiRmlHcmlkIiwiQnNBcnJvd0NvdW50ZXJjbG9ja3dpc2UiLCJtb3Rpb24iLCJtYWluVmFyaWFudHMiLCJ3aWR0aCIsImlubmVyVmFyaWFudHMiLCJhbGlnbkl0ZW1zIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwiU2lkZWJhciIsIm5hdlNpemUiLCJjaGFuZ2VOYXZTaXplIiwiZGlzcGF0Y2giLCJkZWxldGVEYXRhQWN0aW9uQ3JlYXRvciIsInJvdXRlciIsImhhbmRsZVJlc2V0IiwicmVsb2FkIiwibGVmdCIsImVhc2UiLCJkaXNwbGF5IiwicGFkZGluZyIsImZsZXhEaXJlY3Rpb24iLCJiYWNrZ3JvdW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/sidebar.tsx\n");

/***/ })

});