/// <reference types="ua-parser-js" />
import type { I18NConfig } from '../../config-shared';
import type { IResult } from 'next/dist/compiled/ua-parser-js';
import { NextURL } from '../next-url';
export declare const INTERNALS: unique symbol;
export declare class NextRequest extends Request {
    [INTERNALS]: {
        cookieParser(): {
            [key: string]: string;
        };
        geo: {
            city?: string;
            country?: string;
            region?: string;
        };
        ip?: string;
        page?: {
            name?: string;
            params?: {
                [key: string]: string;
            };
        };
        ua?: UserAgent | null;
        url: NextURL;
    };
    constructor(input: Request | string, init?: RequestInit);
    get cookies(): {
        [key: string]: string;
    };
    get geo(): {
        city?: string | undefined;
        country?: string | undefined;
        region?: string | undefined;
    };
    get ip(): string | undefined;
    get preflight(): string | null;
    get nextUrl(): NextURL;
    get page(): {
        name: string | undefined;
        params: {
            [key: string]: string;
        } | undefined;
    };
    get ua(): UserAgent | null | undefined;
    get url(): string;
}
export interface RequestInit extends globalThis.RequestInit {
    geo?: {
        city?: string;
        country?: string;
        region?: string;
    };
    ip?: string;
    nextConfig?: {
        basePath?: string;
        i18n?: I18NConfig | null;
        trailingSlash?: boolean;
    };
    page?: {
        name?: string;
        params?: {
            [key: string]: string;
        };
    };
}
interface UserAgent extends IResult {
    isBot: boolean;
}
export {};
