/// <reference types="node" />
import { NextConfigComplete } from '../config-shared';
import '../node-polyfill-fetch';
declare type RuntimeConfig = any;
export declare function loadStaticPaths(distDir: string, pathname: string, serverless: boolean, config: RuntimeConfig, httpAgentOptions: NextConfigComplete['httpAgentOptions'], locales?: string[], defaultLocale?: string): Promise<Omit<import("../../types").GetStaticPathsResult<import("querystring").ParsedUrlQuery>, "paths"> & {
    paths: string[];
    encodedPaths: string[];
}>;
export {};
