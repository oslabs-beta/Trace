import type { I18NConfig } from '../../config-shared';
import type { CookieSerializeOptions } from 'next/dist/compiled/cookie';
import { NextURL } from '../next-url';
declare const INTERNALS: unique symbol;
export declare class NextResponse extends Response {
    [INTERNALS]: {
        cookieParser(): {
            [key: string]: string;
        };
        url?: NextURL;
    };
    constructor(body?: BodyInit | null, init?: ResponseInit);
    get cookies(): {
        [key: string]: string;
    };
    cookie(name: string, value: {
        [key: string]: any;
    } | string, opts?: CookieSerializeOptions): this;
    clearCookie(name: string, opts?: CookieSerializeOptions): this;
    static redirect(url: string | NextURL, status?: number): NextResponse;
    static rewrite(destination: string | NextURL): NextResponse;
    static next(): NextResponse;
}
interface ResponseInit extends globalThis.ResponseInit {
    nextConfig?: {
        basePath?: string;
        i18n?: I18NConfig;
        trailingSlash?: boolean;
    };
    url?: string;
}
export {};
