/// <reference types="node" />
import type { RequestData, FetchEventResult } from '../types';
/**
 * The cache is cleared when a path is cached and the content has changed. The
 * hack ignores changes than only change the compilation hash. Instead it is
 * probably better to disable HMR for middleware entries.
 */
export declare function clearSandboxCache(path: string, content: Buffer | string): void;
export declare function run(params: {
    name: string;
    onWarning: (warn: Error) => void;
    paths: string[];
    request: RequestData;
    ssr: boolean;
}): Promise<FetchEventResult>;
