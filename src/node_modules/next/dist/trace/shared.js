"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setGlobal = exports.traceGlobals = exports.TARGET = void 0;
var TARGET;
exports.TARGET = TARGET;
(function(TARGET) {
    TARGET["CONSOLE"] = "CONSOLE";
    TARGET["ZIPKIN"] = "ZIPKIN";
    TARGET["JAEGER"] = "JAEGER";
    TARGET["TELEMETRY"] = "TELEMETRY";
})(TARGET || (exports.TARGET = TARGET = {
}));
const traceGlobals = new Map();
exports.traceGlobals = traceGlobals;
const setGlobal = (key, val)=>{
    traceGlobals.set(key, val);
};
exports.setGlobal = setGlobal;

//# sourceMappingURL=shared.js.map