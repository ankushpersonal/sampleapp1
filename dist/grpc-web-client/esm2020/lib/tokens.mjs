import { InjectionToken } from '@angular/core';
/**
 * Default configuration for grpc-web clients. Will be used for every GrpcWebClient unless service-specific config is provided
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useClass: { host: 'localhost:4321' } },
 * ]
 * ```
 */
export const GRPC_WEB_CLIENT_DEFAULT_SETTINGS = new InjectionToken('GRPC_WEB_CLIENT_DEFAULT_SETTINGS');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvZ3JwYy13ZWItY2xpZW50L3NyYy9saWIvdG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxNQUFNLGdDQUFnQyxHQUFHLElBQUksY0FBYyxDQUFDLGtDQUFrQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIERlZmF1bHQgY29uZmlndXJhdGlvbiBmb3IgZ3JwYy13ZWIgY2xpZW50cy4gV2lsbCBiZSB1c2VkIGZvciBldmVyeSBHcnBjV2ViQ2xpZW50IHVubGVzcyBzZXJ2aWNlLXNwZWNpZmljIGNvbmZpZyBpcyBwcm92aWRlZFxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBwcm92aWRlcnM6IFtcbiAqICAgeyBwcm92aWRlOiBHUlBDX1dFQl9DTElFTlRfREVGQVVMVF9TRVRUSU5HUywgdXNlQ2xhc3M6IHsgaG9zdDogJ2xvY2FsaG9zdDo0MzIxJyB9IH0sXG4gKiBdXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IEdSUENfV0VCX0NMSUVOVF9ERUZBVUxUX1NFVFRJTkdTID0gbmV3IEluamVjdGlvblRva2VuKCdHUlBDX1dFQl9DTElFTlRfREVGQVVMVF9TRVRUSU5HUycpO1xuIl19