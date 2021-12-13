"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.minify = minify;
exports.minifySync = minifySync;
exports.bundle = bundle;
const fs = require('fs');
const { platform , arch  } = require('os');
const path = require('path');
const { platformArchTriples  } = require('@napi-rs/triples');
const Log = require('../output/log');
const ArchName = arch();
const PlatformName = platform();
let bindings;
let loadError;
const triples = platformArchTriples[PlatformName][ArchName];
for (const triple of triples){
    const localFilePath = path.join(__dirname, '../../../native', `next-swc.${triple.platformArchABI}.node`);
    if (fs.existsSync(localFilePath)) {
        Log.info('Using locally built binary of next-swc');
        try {
            bindings = require(localFilePath);
        } catch (e) {
            loadError = e;
        }
        break;
    }
    try {
        bindings = require(`@next/swc-${triple.platformArchABI}`);
        break;
    } catch (e) {
        if ((e === null || e === void 0 ? void 0 : e.code) !== 'MODULE_NOT_FOUND') {
            loadError = e;
        }
    }
}
if (!bindings) {
    if (loadError) {
        console.error(loadError);
    }
    Log.error(`Failed to load SWC binary, see more info here: https://nextjs.org/docs/messages/failed-loading-swc`);
    process.exit(1);
} else {
    loadError = null;
}
async function transform(src, options) {
    var ref;
    const isModule = typeof src !== 'string' && !Buffer.isBuffer(src);
    options = options || {
    };
    if (options === null || options === void 0 ? void 0 : (ref = options.jsc) === null || ref === void 0 ? void 0 : ref.parser) {
        var _syntax;
        options.jsc.parser.syntax = (_syntax = options.jsc.parser.syntax) !== null && _syntax !== void 0 ? _syntax : 'ecmascript';
    }
    return bindings.transform(isModule ? JSON.stringify(src) : src, isModule, toBuffer(options));
}
function transformSync(src, options) {
    var ref;
    const isModule = typeof src !== 'string' && !Buffer.isBuffer(src);
    options = options || {
    };
    if (options === null || options === void 0 ? void 0 : (ref = options.jsc) === null || ref === void 0 ? void 0 : ref.parser) {
        var _syntax;
        options.jsc.parser.syntax = (_syntax = options.jsc.parser.syntax) !== null && _syntax !== void 0 ? _syntax : 'ecmascript';
    }
    return bindings.transformSync(isModule ? JSON.stringify(src) : src, isModule, toBuffer(options));
}
function toBuffer(t) {
    return Buffer.from(JSON.stringify(t));
}
async function minify(src, opts) {
    return bindings.minify(toBuffer(src), toBuffer(opts !== null && opts !== void 0 ? opts : {
    }));
}
function minifySync(src, opts) {
    return bindings.minifySync(toBuffer(src), toBuffer(opts !== null && opts !== void 0 ? opts : {
    }));
}
async function bundle(options) {
    return bindings.bundle(toBuffer(options));
}
module.exports.transform = transform;
module.exports.transformSync = transformSync;
module.exports.minify = minify;
module.exports.minifySync = minifySync;

//# sourceMappingURL=index.js.map