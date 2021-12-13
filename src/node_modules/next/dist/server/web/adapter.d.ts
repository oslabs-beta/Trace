import type { RequestData, FetchEventResult } from './types';
import { NextFetchEvent } from './spec-extension/fetch-event';
import { NextRequest } from './spec-extension/request';
export declare function adapter(params: {
    handler: (request: NextRequest, event: NextFetchEvent) => Promise<Response>;
    page: string;
    request: RequestData;
}): Promise<FetchEventResult>;
