"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 362:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(930);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/navhoverbox.tsx





function NavHoverBox({
  title,
  icon,
  description
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
      pos: "absolute",
      mt: "calc(100px - 7.5px)",
      ml: "-10px",
      width: 0,
      height: 0,
      borderTop: "10px solid transparent",
      borderBottom: "10px solid transparent",
      borderRight: "10px solid blue.900",
      zIndex: 99999999
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
      h: 200,
      minWidth: 200,
      w: "100%",
      flexDir: "column",
      alignItems: "center",
      justify: "center",
      backgroundColor: "blue.900",
      borderRadius: "10px",
      color: "#fff",
      textAlign: "center",
      children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Icon, {
        as: icon,
        fontSize: "3xl",
        mb: 4
      }), /*#__PURE__*/jsx_runtime_.jsx(react_.Heading, {
        size: "md",
        fontWeight: "normal",
        children: title
      }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
        w: 180,
        children: description
      })]
    })]
  });
}
;// CONCATENATED MODULE: ./components/navitem.tsx





function NavItem({
  icon,
  title,
  path,
  description,
  active = false,
  navSize,
  onClick
}) {
  const {
    isOpen,
    onOpen,
    onClose
  } = (0,react_.useDisclosure)();
  const {
    colorMode,
    toggleColorMode
  } = (0,react_.useColorMode)();
  const {
    0: bgColor,
    1: setBgColor
  } = (0,external_react_.useState)('white');
  const {
    0: iconColor,
    1: setIconColor
  } = (0,external_react_.useState)('gray');
  const {
    0: hoverColor,
    1: setHoverColor
  } = (0,external_react_.useState)('blue.200');

  const colorChange = () => {
    if (colorMode === 'light') {
      setBgColor('white');
      setIconColor('gray');
      setHoverColor('blue.200');
    } else {
      setBgColor('blue.800');
      setIconColor('white');
      setHoverColor('blue.600');
    }
  };

  (0,external_react_.useEffect)(() => {
    colorChange();
  }, [colorMode]);
  return title !== "Reset" ? /*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
    mt: 25,
    flexDir: "column",
    w: "100%",
    alignItems: navSize == "small" ? "center" : "flex-start",
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Menu, {
      placement: "right",
      isOpen: isOpen,
      children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Link, {
        backgroundColor: active ? 'blue.200' : bgColor,
        p: 3,
        borderRadius: 8,
        _hover: {
          textDecor: 'none',
          backgroundColor: hoverColor
        },
        w: navSize == "big" ? "100%" : 'auto',
        href: path,
        children: /*#__PURE__*/jsx_runtime_.jsx(react_.MenuButton, {
          w: "100%",
          onMouseEnter: onOpen,
          onMouseLeave: onClose,
          onClick: onClick,
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
            alignItems: "center",
            children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Icon, {
              as: icon,
              fontSize: "l",
              color: active ? "white" : iconColor
            }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
              ml: 5,
              fontSize: {
                sm: '.8rem',
                md: '1rem',
                lg: '1rem'
              },
              display: navSize == "small" ? "none" : "flex",
              style: {
                alignItems: 'center'
              },
              children: title
            })]
          })
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(react_.MenuList, {
        py: 0,
        border: "none",
        w: 200,
        h: 200,
        ml: 5,
        children: /*#__PURE__*/jsx_runtime_.jsx(NavHoverBox, {
          title: title,
          icon: icon,
          description: description
        })
      })]
    })
  }) : /*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
    mt: 25,
    flexDir: "column",
    w: "100%",
    alignItems: navSize == "small" ? "center" : "flex-start",
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Menu, {
      placement: "right",
      isOpen: isOpen,
      children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
        backgroundColor: active ? 'blue.200' : bgColor,
        p: 3,
        borderRadius: 8,
        _hover: {
          textDecor: 'none',
          backgroundColor: hoverColor
        },
        w: navSize == "big" ? "100%" : 'auto',
        children: /*#__PURE__*/jsx_runtime_.jsx(react_.MenuButton, {
          w: "100%",
          onMouseEnter: onOpen,
          onMouseLeave: onClose,
          onClick: onClick,
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
            alignItems: "center",
            children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Icon, {
              as: icon,
              fontSize: "l",
              color: "white"
            }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
              ml: 5,
              fontSize: {
                sm: '.8rem',
                md: '1rem',
                lg: '1rem'
              },
              display: navSize == "small" ? "none" : "flex",
              style: {
                alignItems: 'center'
              },
              children: title
            })]
          })
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(react_.MenuList, {
        py: 0,
        border: "none",
        w: 200,
        h: 200,
        ml: 5,
        children: /*#__PURE__*/jsx_runtime_.jsx(NavHoverBox, {
          title: title,
          icon: icon,
          description: description
        })
      })]
    })
  });
}
// EXTERNAL MODULE: ./state/hooks.ts
var hooks = __webpack_require__(613);
// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(695);
// EXTERNAL MODULE: ./state/action-creators/index.js
var action_creators = __webpack_require__(480);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(853);
;// CONCATENATED MODULE: external "react-icons/fi"
const fi_namespaceObject = require("react-icons/fi");
;// CONCATENATED MODULE: external "react-icons/bs"
const bs_namespaceObject = require("react-icons/bs");
;// CONCATENATED MODULE: external "framer-motion"
const external_framer_motion_namespaceObject = require("framer-motion");
;// CONCATENATED MODULE: ./components/sidebar.tsx
// Based off Chakra UI Responsive Sidebar Tutorial: https://github.com/bjcarlson42/chakra-left-responsive-navbar/tree/main/components
// React/Redux, Next, and Styled Components Imports





 // Chakra Imports

 // Feather Icon Imports


 // Framer Motion




const mainVariants = {
  'small': {
    width: '80px'
  },
  'big': {
    width: '200px'
  }
};
const innerVariants = {
  'small': {
    alignItems: 'center'
  },
  'big': {
    alignItems: 'flex-start',
    transition: {
      duration: 1.5
    }
  }
};

const Sidebar = () => {
  const {
    0: navSize,
    1: changeNavSize
  } = (0,external_react_.useState)("small");
  const dispatch = (0,hooks/* useAppDispatch */.T)();
  const {
    deleteDataActionCreator
  } = (0,external_redux_.bindActionCreators)(action_creators, dispatch);
  const router = (0,router_.useRouter)();

  const handleReset = () => {
    deleteDataActionCreator();
    router.reload();
  };

  return /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_namespaceObject.motion.div, {
    animate: navSize === 'small' ? 'small' : 'big',
    style: {
      left: '5'
    },
    transition: {
      ease: 'easeInOut'
    },
    variants: mainVariants,
    children: /*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
      position: "-webkit-sticky",
      bottom: "0",
      "align-self": "flex-start",
      height: "100vh",
      backgroundColor: "blue.700",
      flexDir: "column",
      justify: "space-between",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_framer_motion_namespaceObject.motion.div, {
        animate: navSize === 'small' ? 'small' : 'big',
        transition: {
          ease: 'easeInOut'
        },
        variants: innerVariants,
        style: {
          display: 'flex',
          padding: '5%',
          flexDirection: 'column',
          width: '100%'
        },
        children: [/*#__PURE__*/jsx_runtime_.jsx(react_.IconButton, {
          "aria-label": "This is the button to open the menu",
          background: "none",
          mt: 5,
          _hover: {
            background: 'none'
          },
          icon: /*#__PURE__*/jsx_runtime_.jsx(fi_namespaceObject.FiMenu, {}),
          onClick: () => {
            if (navSize == "small") changeNavSize("big");else changeNavSize("small");
          },
          style: {
            alignItems: 'center'
          }
        }), /*#__PURE__*/jsx_runtime_.jsx(NavItem, {
          navSize: navSize,
          icon: fi_namespaceObject.FiGrid,
          title: "Dashboard",
          description: "See all your resolver metrics in one place.",
          path: "/"
        }), /*#__PURE__*/jsx_runtime_.jsx(NavItem, {
          navSize: navSize,
          icon: fi_namespaceObject.FiBarChart,
          title: "Insights",
          description: "View valuable insights gathered from your resolver data.",
          path: "/insights"
        }), /*#__PURE__*/jsx_runtime_.jsx(NavItem, {
          navSize: navSize,
          icon: bs_namespaceObject.BsArrowCounterclockwise,
          title: "Reset",
          description: "Reset your query and resolver tracing data.",
          onClick: handleReset
        })]
      })
    })
  });
};

/* harmony default export */ const sidebar = (Sidebar);
;// CONCATENATED MODULE: external "styled-components"
const external_styled_components_namespaceObject = require("styled-components");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_namespaceObject);
;// CONCATENATED MODULE: ./components/layout.tsx







const Main = external_styled_components_default().main.withConfig({
  displayName: "layout__Main",
  componentId: "sc-1u5ezog-0"
})(["display:flex;justify-content:flex-start;align-items:flex-start;height:100vh;overflow-y:hidden;"]);

const Layout = ({
  children,
  title = "Trace"
}) => /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
  children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
    children: [/*#__PURE__*/jsx_runtime_.jsx("title", {
      children: title
    }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
      charSet: "utf-8"
    }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
      name: "viewport",
      content: "initial-scale=1.0, width=device-width"
    })]
  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(Main, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(sidebar, {}), children]
  })]
});

/* harmony default export */ const layout = (Layout);
// EXTERNAL MODULE: ./theme/theme.ts + 1 modules
var theme = __webpack_require__(391);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(22);
;// CONCATENATED MODULE: external "redux-persist/integration/react"
const integration_react_namespaceObject = require("redux-persist/integration/react");
;// CONCATENATED MODULE: external "next-redux-wrapper"
const external_next_redux_wrapper_namespaceObject = require("next-redux-wrapper");
// EXTERNAL MODULE: ./state/constants/actionTypes.js
var actionTypes = __webpack_require__(401);
;// CONCATENATED MODULE: external "redux-persist/lib/storage/createWebStorage"
const createWebStorage_namespaceObject = require("redux-persist/lib/storage/createWebStorage");
;// CONCATENATED MODULE: ./state/sync_storage.ts


const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },

    setItem(_key, value) {
      return Promise.resolve(value);
    },

    removeItem(_key) {
      return Promise.resolve();
    }

  };
};

const storage =  false ? 0 : createNoopStorage();
/* harmony default export */ const sync_storage = (storage);
;// CONCATENATED MODULE: ./state/reducers/dataReducer.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const initialState = {
  rawdata: [],
  averages: {},
  count: {}
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes/* UPDATE_DATA */.v:
      const data = action.payload;

      const clone = _objectSpread({}, state); // UPDATE RAW DATA ARRAY


      clone.rawdata.push(data); // UPDATE AVERAGES + COUNT

      for (let key in data) {
        if (key !== 'dateAndTime' && key !== 'errors' && key !== 'response' && key !== 'totalDuration' && key !== 'trace_id') {
          if (clone.averages[key]) {
            let sum = clone.averages[key] * clone.count[key];
            sum += data[key];
            clone.averages[key] = sum / (clone.count[key] + 1);
          } else clone.averages[key] = data[key];

          if (clone.count[key]) clone.count[key]++;else clone.count[key] = 1;
        }
      }

      return clone;

    case actionTypes/* DELETE_DATA */.X:
      sync_storage.removeItem('persist:trace');
      return initialState;

    default:
      return state;
  }
};

/* harmony default export */ const reducers_dataReducer = (dataReducer);
;// CONCATENATED MODULE: ./state/index.js


const reducers = (0,external_redux_.combineReducers)({
  data: reducers_dataReducer
});
/* harmony default export */ const state = (reducers);
;// CONCATENATED MODULE: external "redux-thunk"
const external_redux_thunk_namespaceObject = require("redux-thunk");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_namespaceObject);
;// CONCATENATED MODULE: external "redux-persist"
const external_redux_persist_namespaceObject = require("redux-persist");
;// CONCATENATED MODULE: ./state/store.ts





 //import storage from 'redux-persist/lib/storage'

// const defaultRootState: RootState = {
//   data: {
//     rawdata: [],
//     count: {},
//     averages: {}
//   }
// }
let reduxStore;

const makeStore = ({
  isServer
}) => {
  if (isServer) {
    reduxStore = (0,external_redux_.createStore)(state, (0,external_redux_.applyMiddleware)((external_redux_thunk_default())));
    return reduxStore;
  } else {
    const persistConfig = {
      key: 'trace',
      storage: sync_storage
    };
    const persistedReducer = (0,external_redux_persist_namespaceObject.persistReducer)(persistConfig, state);
    reduxStore = (0,external_redux_.createStore)(persistedReducer, (0,external_redux_.applyMiddleware)((external_redux_thunk_default())));
    reduxStore.__persistor = (0,external_redux_persist_namespaceObject.persistStore)(reduxStore);
    return reduxStore;
  }
};

const wrapper = (0,external_next_redux_wrapper_namespaceObject.createWrapper)(makeStore);
// EXTERNAL MODULE: external "@chakra-ui/layout"
var layout_ = __webpack_require__(271);
;// CONCATENATED MODULE: ./components/loading.tsx





const Loading = () => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
    w: "100vw",
    h: "100vh",
    direction: "column",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    children: [/*#__PURE__*/jsx_runtime_.jsx(layout_.Text, {
      children: "Just give us a moment..."
    }), /*#__PURE__*/jsx_runtime_.jsx(react_.Spinner, {
      thickness: "4px",
      speed: "0.65s",
      emptyColor: "gray.200",
      color: "blue.500",
      size: "xl",
      mt: "1rem"
    })]
  });
};

/* harmony default export */ const loading = (Loading);
;// CONCATENATED MODULE: ./pages/_app.tsx
function _app_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _app_ownKeys(Object(source), true).forEach(function (key) { _app_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _app_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













function MyApp({
  Component,
  pageProps,
  router
}) {
  const store = (0,external_react_redux_.useStore)();
  return  false ? /*#__PURE__*/0 : /*#__PURE__*/jsx_runtime_.jsx(external_react_redux_.Provider, {
    store: store,
    children: /*#__PURE__*/jsx_runtime_.jsx(react_.ChakraProvider, {
      theme: theme/* default */.Z,
      children: /*#__PURE__*/jsx_runtime_.jsx(integration_react_namespaceObject.PersistGate, {
        persistor: store,
        loading: /*#__PURE__*/jsx_runtime_.jsx(loading, {}),
        children: /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_namespaceObject.motion.div, {
          initial: "initial",
          animate: "animate",
          variants: {
            initial: {
              opacity: 0
            },
            animate: {
              opacity: 1
            }
          },
          transition: {
            duration: .7
          },
          children: /*#__PURE__*/jsx_runtime_.jsx(layout, {
            children: /*#__PURE__*/jsx_runtime_.jsx(Component, _app_objectSpread({}, pageProps))
          })
        }, router.route)
      })
    })
  });
}

/* harmony default export */ const _app = (wrapper.withRedux(MyApp));

/***/ }),

/***/ 480:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateDataActionCreator": () => (/* binding */ updateDataActionCreator),
/* harmony export */   "deleteDataActionCreator": () => (/* binding */ deleteDataActionCreator)
/* harmony export */ });
/* harmony import */ var _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(401);
 // create action creators and export them all individually
// "export const [nameOfCreator]""

const updateDataActionCreator = newData => ({
  type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .UPDATE_DATA */ .v,
  payload: newData
});
const deleteDataActionCreator = () => ({
  type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .DELETE_DATA */ .X
}); // maybe add some actions for options 
// actions can update how many resolvers to show for each graph
// do we need action for darkmode? or chakra ui provides native method?

/***/ }),

/***/ 401:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v": () => (/* binding */ UPDATE_DATA),
/* harmony export */   "X": () => (/* binding */ DELETE_DATA)
/* harmony export */ });
const UPDATE_DATA = 'UPDATE_DATA';
const DELETE_DATA = 'DELETE_DATA';

/***/ }),

/***/ 613:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ useAppDispatch),
/* harmony export */   "C": () => (/* binding */ useAppSelector)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = () => (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useDispatch)();
const useAppSelector = react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector;

/***/ }),

/***/ 391:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ theme_theme)
});

// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(930);
;// CONCATENATED MODULE: external "@chakra-ui/theme-tools"
const theme_tools_namespaceObject = require("@chakra-ui/theme-tools");
;// CONCATENATED MODULE: ./theme/theme.ts


const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  breakpoints: {
    sm: "0",
    md: "700px",
    lg: "960px",
    xl: "1200px"
  },
  global: props => ({
    body: {
      color: (0,theme_tools_namespaceObject.mode)('gray.800', 'whiteAlpha.900')(props),
      bg: (0,theme_tools_namespaceObject.mode)('gray.100', '#141214')(props)
    }
  })
};
const theme = (0,react_.extendTheme)({
  config
});
/* harmony default export */ const theme_theme = (theme);

/***/ }),

/***/ 271:
/***/ ((module) => {

module.exports = require("@chakra-ui/layout");

/***/ }),

/***/ 930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 22:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 695:
/***/ ((module) => {

module.exports = require("redux");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(362));
module.exports = __webpack_exports__;

})();