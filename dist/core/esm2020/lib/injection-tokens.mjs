import { InjectionToken } from '@angular/core';
/**
 * Use this injection token to register the GrpcClientFactory
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_CLIENT_FACTORY, useClass: MyClientFactory },
 * ]
 * ```
 */
export const GRPC_CLIENT_FACTORY = new InjectionToken('GRPC_CLIENT_FACTORY');
/**
 * Use this injection token to add interceptors
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_INTERCEPTORS, useClass: MyInterceptor, multi: true },
 * ]
 * ```
 */
export const GRPC_INTERCEPTORS = new InjectionToken('GRPC_INTERCEPTORS');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLXRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2xpYi9pbmplY3Rpb24tdG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLElBQUksY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFN0U7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLElBQUksY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFVzZSB0aGlzIGluamVjdGlvbiB0b2tlbiB0byByZWdpc3RlciB0aGUgR3JwY0NsaWVudEZhY3RvcnlcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogcHJvdmlkZXJzOiBbXG4gKiAgIHsgcHJvdmlkZTogR1JQQ19DTElFTlRfRkFDVE9SWSwgdXNlQ2xhc3M6IE15Q2xpZW50RmFjdG9yeSB9LFxuICogXVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBHUlBDX0NMSUVOVF9GQUNUT1JZID0gbmV3IEluamVjdGlvblRva2VuKCdHUlBDX0NMSUVOVF9GQUNUT1JZJyk7XG5cbi8qKlxuICogVXNlIHRoaXMgaW5qZWN0aW9uIHRva2VuIHRvIGFkZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogcHJvdmlkZXJzOiBbXG4gKiAgIHsgcHJvdmlkZTogR1JQQ19JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBNeUludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSB9LFxuICogXVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBHUlBDX0lOVEVSQ0VQVE9SUyA9IG5ldyBJbmplY3Rpb25Ub2tlbignR1JQQ19JTlRFUkNFUFRPUlMnKTtcbiJdfQ==