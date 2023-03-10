export declare class GrpcMetadata {
    private map;
    constructor(initial?: {
        [prop: string]: string;
    });
    set(name: string, value: string): void;
    get(name: string): string;
    has(name: string): boolean;
    clone(): GrpcMetadata;
    toObject(): {};
}
