import { InjectionToken } from '@angular/core';
/**
 * Registers a worker implementation, generated by Angular CLI and implemented according documentation
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_WORKER, useFactory: () => new Worker('./grpc.worker', { type: 'module' }) },
 * ]
 * ```
 */
export const GRPC_WORKER = new InjectionToken('GRPC_WORKER');
/**
 * Default configuration for grpc-web clients running in worker. Will be used for every GrpcWorkerClient unless service-specific config is provided
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_WORKER_CLIENT_DEFAULT_SETTINGS, useClass: { host: 'localhost:4321' } },
 * ]
 * ```
 */
export const GRPC_WORKER_CLIENT_DEFAULT_SETTINGS = new InjectionToken('GRPC_WORKER_CLIENT_DEFAULT_SETTINGS');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvd29ya2VyLWNsaWVudC9zcmMvbGliL3Rva2Vucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9DOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxjQUFjLENBQVMsYUFBYSxDQUFDLENBQUM7QUFFckU7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1DQUFtQyxHQUFHLElBQUksY0FBYyxDQUFDLHFDQUFxQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFJlZ2lzdGVycyBhIHdvcmtlciBpbXBsZW1lbnRhdGlvbiwgZ2VuZXJhdGVkIGJ5IEFuZ3VsYXIgQ0xJIGFuZCBpbXBsZW1lbnRlZCBhY2NvcmRpbmcgZG9jdW1lbnRhdGlvblxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBwcm92aWRlcnM6IFtcbiAqICAgeyBwcm92aWRlOiBHUlBDX1dPUktFUiwgdXNlRmFjdG9yeTogKCkgPT4gbmV3IFdvcmtlcignLi9ncnBjLndvcmtlcicsIHsgdHlwZTogJ21vZHVsZScgfSkgfSxcbiAqIF1cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgR1JQQ19XT1JLRVIgPSBuZXcgSW5qZWN0aW9uVG9rZW48V29ya2VyPignR1JQQ19XT1JLRVInKTtcblxuLyoqXG4gKiBEZWZhdWx0IGNvbmZpZ3VyYXRpb24gZm9yIGdycGMtd2ViIGNsaWVudHMgcnVubmluZyBpbiB3b3JrZXIuIFdpbGwgYmUgdXNlZCBmb3IgZXZlcnkgR3JwY1dvcmtlckNsaWVudCB1bmxlc3Mgc2VydmljZS1zcGVjaWZpYyBjb25maWcgaXMgcHJvdmlkZWRcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogcHJvdmlkZXJzOiBbXG4gKiAgIHsgcHJvdmlkZTogR1JQQ19XT1JLRVJfQ0xJRU5UX0RFRkFVTFRfU0VUVElOR1MsIHVzZUNsYXNzOiB7IGhvc3Q6ICdsb2NhbGhvc3Q6NDMyMScgfSB9LFxuICogXVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBHUlBDX1dPUktFUl9DTElFTlRfREVGQVVMVF9TRVRUSU5HUyA9IG5ldyBJbmplY3Rpb25Ub2tlbignR1JQQ19XT1JLRVJfQ0xJRU5UX0RFRkFVTFRfU0VUVElOR1MnKTtcbiJdfQ==