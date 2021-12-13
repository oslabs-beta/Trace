/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { UrlWithParsedQuery } from 'url';
import { PrerenderManifest } from '../build';
import { CustomRoutes } from '../lib/load-custom-routes';
import { getRouteMatcher } from '../shared/lib/router/utils';
import { __ApiPreviewProps } from './api-utils';
import { DomainLocale, NextConfig } from './config';
import { LoadComponentsReturnType } from './load-components';
import Router, { DynamicRoutes, PageChecker, Params, Route } from './router';
import './node-polyfill-fetch';
import { PagesManifest } from '../build/webpack/plugins/pages-manifest-plugin';
import { NextConfigComplete } from './config-shared';
import type { FontManifest } from './font-utils';
import type { FetchEventResult } from './web/types';
import type { MiddlewareManifest } from '../build/webpack/plugins/middleware-plugin';
import type { ParsedNextUrl } from '../shared/lib/router/utils/parse-next-url';
import type { NextParsedUrlQuery, NextUrlWithParsedQuery } from './request-meta';
export declare type FindComponentsResult = {
    components: LoadComponentsReturnType;
    query: NextParsedUrlQuery;
};
interface RoutingItem {
    page: string;
    match: ReturnType<typeof getRouteMatcher>;
    ssr?: boolean;
}
export declare type ServerConstructor = {
    /**
     * Where the Next project is located - @default '.'
     */
    dir?: string;
    /**
     * Hide error messages containing server information - @default false
     */
    quiet?: boolean;
    /**
     * Object what you would use in next.config.js - @default {}
     */
    conf?: NextConfig | null;
    dev?: boolean;
    customServer?: boolean;
};
export default class Server {
    protected dir: string;
    protected quiet: boolean;
    protected nextConfig: NextConfigComplete;
    protected distDir: string;
    protected pagesDir?: string;
    protected publicDir: string;
    protected hasStaticDir: boolean;
    protected serverBuildDir: string;
    protected pagesManifest?: PagesManifest;
    protected buildId: string;
    protected minimalMode: boolean;
    protected renderOpts: {
        poweredByHeader: boolean;
        buildId: string;
        generateEtags: boolean;
        runtimeConfig?: {
            [key: string]: any;
        };
        assetPrefix?: string;
        canonicalBase: string;
        dev?: boolean;
        previewProps: __ApiPreviewProps;
        customServer?: boolean;
        ampOptimizerConfig?: {
            [key: string]: any;
        };
        basePath: string;
        optimizeFonts: boolean;
        images: string;
        fontManifest: FontManifest;
        optimizeImages: boolean;
        disableOptimizedLoading?: boolean;
        optimizeCss: any;
        locale?: string;
        locales?: string[];
        defaultLocale?: string;
        domainLocales?: DomainLocale[];
        distDir: string;
        concurrentFeatures?: boolean;
    };
    private compression?;
    private incrementalCache;
    private responseCache;
    protected router: Router;
    protected dynamicRoutes?: DynamicRoutes;
    protected customRoutes: CustomRoutes;
    protected middlewareManifest?: MiddlewareManifest;
    protected middleware?: RoutingItem[];
    constructor({ dir, quiet, conf, dev, minimalMode, customServer, }: ServerConstructor & {
        conf: NextConfig;
        minimalMode?: boolean;
    });
    logError(err: Error): void;
    private handleRequest;
    getRequestHandler(): (req: IncomingMessage, res: ServerResponse, parsedUrl?: NextUrlWithParsedQuery | undefined) => Promise<void>;
    setAssetPrefix(prefix?: string): void;
    prepare(): Promise<void>;
    protected close(): Promise<void>;
    protected setImmutableAssetCacheControl(res: ServerResponse): void;
    protected getCustomRoutes(): CustomRoutes;
    private _cachedPreviewManifest;
    protected getPrerenderManifest(): PrerenderManifest;
    protected getPreviewProps(): __ApiPreviewProps;
    protected getMiddleware(): {
        match: (pathname: string | null | undefined) => false | {
            [paramName: string]: string | string[];
        };
        page: string;
    }[];
    protected hasMiddleware(pathname: string, _isSSR?: boolean): Promise<boolean>;
    protected ensureMiddleware(_pathname: string, _isSSR?: boolean): Promise<void>;
    private middlewareBetaWarning;
    protected runMiddleware(params: {
        request: IncomingMessage;
        response: ServerResponse;
        parsedUrl: ParsedNextUrl;
        parsed: UrlWithParsedQuery;
        onWarning?: (warning: Error) => void;
    }): Promise<FetchEventResult | null>;
    protected generateRoutes(): {
        basePath: string;
        headers: Route[];
        rewrites: {
            beforeFiles: Route[];
            afterFiles: Route[];
            fallback: Route[];
        };
        fsRoutes: Route[];
        redirects: Route[];
        catchAllRoute: Route;
        catchAllMiddleware?: Route;
        pageChecker: PageChecker;
        useFileSystemPublicRoutes: boolean;
        dynamicRoutes: DynamicRoutes | undefined;
        locales: string[];
    };
    private getPagePath;
    protected hasPage(pathname: string): Promise<boolean>;
    protected _beforeCatchAllRender(_req: IncomingMessage, _res: ServerResponse, _params: Params, _parsedUrl: UrlWithParsedQuery): Promise<boolean>;
    protected ensureApiPage(_pathname: string): Promise<void>;
    /**
     * Resolves `API` request, in development builds on demand
     * @param req http request
     * @param res http response
     * @param pathname path of request
     */
    private handleApiRequest;
    protected generatePublicRoutes(): Route[];
    protected getDynamicRoutes(): Array<RoutingItem>;
    private handleCompression;
    protected run(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery): Promise<void>;
    private pipe;
    private getStaticHTML;
    render(req: IncomingMessage, res: ServerResponse, pathname: string, query?: NextParsedUrlQuery, parsedUrl?: NextUrlWithParsedQuery): Promise<void>;
    protected findPageComponents(pathname: string, query?: NextParsedUrlQuery, params?: Params | null): Promise<FindComponentsResult | null>;
    protected getStaticPaths(pathname: string): Promise<{
        staticPaths: string[] | undefined;
        fallbackMode: 'static' | 'blocking' | false;
    }>;
    private renderToResponseWithComponents;
    private renderToResponse;
    renderToHTML(req: IncomingMessage, res: ServerResponse, pathname: string, query?: ParsedUrlQuery): Promise<string | null>;
    renderError(err: Error | null, req: IncomingMessage, res: ServerResponse, pathname: string, query?: NextParsedUrlQuery, setHeaders?: boolean): Promise<void>;
    private customErrorNo404Warn;
    private renderErrorToResponse;
    renderErrorToHTML(err: Error | null, req: IncomingMessage, res: ServerResponse, pathname: string, query?: ParsedUrlQuery): Promise<string | null>;
    protected getFallbackErrorComponents(): Promise<LoadComponentsReturnType | null>;
    render404(req: IncomingMessage, res: ServerResponse, parsedUrl?: NextUrlWithParsedQuery, setHeaders?: boolean): Promise<void>;
    serveStatic(req: IncomingMessage, res: ServerResponse, path: string, parsedUrl?: UrlWithParsedQuery): Promise<void>;
    private _validFilesystemPathSet;
    private getFilesystemPaths;
    protected isServeableUrl(untrustedFileUrl: string): boolean;
    protected readBuildId(): string;
    protected get _isLikeServerless(): boolean;
}
export declare class WrappedBuildError extends Error {
    innerError: Error;
    constructor(innerError: Error);
}
export {};
