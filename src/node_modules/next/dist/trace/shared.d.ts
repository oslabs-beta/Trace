export declare enum TARGET {
    CONSOLE = "CONSOLE",
    ZIPKIN = "ZIPKIN",
    JAEGER = "JAEGER",
    TELEMETRY = "TELEMETRY"
}
export declare type SpanId = string;
export declare const traceGlobals: Map<any, any>;
export declare const setGlobal: (key: any, val: any) => void;
