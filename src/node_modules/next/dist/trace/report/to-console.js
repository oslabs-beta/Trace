"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var Log = _interopRequireWildcard(require("../../build/output/log"));
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {
        };
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {
                    };
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
const idToName = new Map();
const reportToConsole = (spanName, duration, _timestamp, id, parentId, attrs)=>{
    idToName.set(id, spanName);
    const parentStr = parentId && idToName.has(parentId) ? `, parent: ${idToName.get(parentId)}` : '';
    const attrsStr = attrs ? `, ${Object.entries(attrs).map(([key, val])=>`${key}: ${val}`
    ).join(', ')}` : '';
    Log.trace(`${spanName} took ${Number(duration) / 1000} ms${parentStr}${attrsStr}`);
};
var _default = {
    flushAll: ()=>{
    },
    report: reportToConsole
};
exports.default = _default;

//# sourceMappingURL=to-console.js.map