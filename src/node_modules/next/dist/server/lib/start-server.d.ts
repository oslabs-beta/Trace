export default function start(serverOptions: any, port?: number, hostname?: string): Promise<{
    app: import("../next").NextServer;
    actualPort: number | undefined;
}>;
