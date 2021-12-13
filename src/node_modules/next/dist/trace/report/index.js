"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reporter = void 0;
var _shared = require("../shared");
var _toConsole = _interopRequireDefault(require("./to-console"));
var _toZipkin = _interopRequireDefault(require("./to-zipkin"));
var _toJaeger = _interopRequireDefault(require("./to-jaeger"));
var _toTelemetry = _interopRequireDefault(require("./to-telemetry"));
var _toJson = _interopRequireDefault(require("./to-json"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class MultiReporter {
    constructor(reporters){
        this.reporters = [];
        this.reporters = reporters;
    }
    async flushAll() {
        await Promise.all(this.reporters.map((reporter)=>reporter.flushAll()
        ));
    }
    report(spanName, duration, timestamp, id, parentId, attrs) {
        this.reporters.forEach((reporter)=>reporter.report(spanName, duration, timestamp, id, parentId, attrs)
        );
    }
}
const target = process.env.TRACE_TARGET && process.env.TRACE_TARGET in _shared.TARGET ? _shared.TARGET[process.env.TRACE_TARGET] : _shared.TARGET.TELEMETRY;
if (process.env.TRACE_TARGET && !target) {
    console.info('For TRACE_TARGET, please specify one of: CONSOLE, ZIPKIN, TELEMETRY');
}
let traceTargetReporter;
if (target === _shared.TARGET.CONSOLE) {
    traceTargetReporter = _toConsole.default;
} else if (target === _shared.TARGET.ZIPKIN) {
    traceTargetReporter = _toZipkin.default;
} else if (target === _shared.TARGET.JAEGER) {
    traceTargetReporter = _toJaeger.default;
} else {
    traceTargetReporter = _toTelemetry.default;
}
const reporter = new MultiReporter([
    _toJson.default,
    traceTargetReporter
]);
exports.reporter = reporter;

//# sourceMappingURL=index.js.map