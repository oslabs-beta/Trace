import { Crypto as WebCrypto, CryptoKey } from 'next/dist/compiled/@peculiar/webcrypto';
export declare function atob(b64Encoded: string): string;
export declare function btoa(str: string): string;
declare class TextEncoderRuntime {
    encoder: TextEncoder;
    constructor();
    get encoding(): string;
    encode(input: string): Uint8Array;
}
declare class TextDecoderRuntime {
    decoder: TextDecoder;
    constructor();
    get encoding(): string;
    get fatal(): boolean;
    get ignoreBOM(): boolean;
    decode(input: BufferSource, options?: TextDecodeOptions): string;
}
export { TextDecoderRuntime as TextDecoder };
export { TextEncoderRuntime as TextEncoder };
export { CryptoKey };
export declare class Crypto extends WebCrypto {
    randomUUID: any;
}
export declare class ReadableStream<T> {
    constructor(opts?: UnderlyingSource);
}
