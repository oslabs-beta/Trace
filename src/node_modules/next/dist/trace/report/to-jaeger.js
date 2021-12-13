"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _asyncRetry = _interopRequireDefault(require("next/dist/compiled/async-retry"));
var _crypto = require("crypto");
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var Log = _interopRequireWildcard(require("../../build/output/log"));
var _toZipkin = require("./to-zipkin");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let traceId;
let batch;
const localEndpoint = {
    serviceName: 'nextjs',
    ipv4: '127.0.0.1',
    port: 9411
};
// Jaeger supports Zipkin's reporting API
const zipkinUrl = `http://${localEndpoint.ipv4}:${localEndpoint.port}`;
const jaegerWebUiUrl = `http://${localEndpoint.ipv4}:16686`;
const zipkinAPI = `${zipkinUrl}/api/v2/spans`;
function logWebUrl() {
    Log.info(`Jaeger trace will be available on ${jaegerWebUiUrl}/trace/${traceId}`);
}
const reportToLocalHost = (name, duration, timestamp, id, parentId, attrs)=>{
    if (!traceId) {
        traceId = process.env.TRACE_ID || (0, _crypto).randomBytes(8).toString('hex');
        logWebUrl();
    }
    if (!batch) {
        batch = (0, _toZipkin).batcher((events)=>{
            const eventsJson = JSON.stringify(events);
            // Ensure ECONNRESET error is retried 3 times before erroring out
            return (0, _asyncRetry).default(()=>// Send events to jaeger's zipkin endpoint
                (0, _nodeFetch).default(zipkinAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: eventsJson
                })
            , {
                minTimeout: 500,
                retries: 3,
                factor: 1
            }).then(async (res)=>{
                if (res.status !== 202) {
                    console.log({
                        status: res.status,
                        body: await res.text(),
                        events: eventsJson
                    });
                }
            }).catch(console.log);
        });
    }
    batch.report({
        traceId,
        parentId,
        name,
        id,
        timestamp,
        duration,
        localEndpoint,
        tags: attrs
    });
};
var _default = {
    flushAll: ()=>batch ? batch.flushAll().then(()=>logWebUrl()
        ) : undefined
    ,
    report: reportToLocalHost
};
exports.default = _default;

//# sourceMappingURL=to-jaeger.js.map