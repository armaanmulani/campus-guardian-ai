/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/incidents/route";
exports.ids = ["app/api/incidents/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/../node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fincidents%2Froute&page=%2Fapi%2Fincidents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fincidents%2Froute.ts&appDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fincidents%2Froute&page=%2Fapi%2Fincidents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fincidents%2Froute.ts&appDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/../node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/../node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_devan_Desktop_hackathon_campus_guardian_ai_frontend_student_src_app_api_incidents_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/incidents/route.ts */ \"(rsc)/./src/app/api/incidents/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/incidents/route\",\n        pathname: \"/api/incidents\",\n        filename: \"route\",\n        bundlePath: \"app/api/incidents/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\devan\\\\Desktop\\\\hackathon\\\\campus-guardian-ai\\\\frontend-student\\\\src\\\\app\\\\api\\\\incidents\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_devan_Desktop_hackathon_campus_guardian_ai_frontend_student_src_app_api_incidents_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1hcHAtbG9hZGVyL2luZGV4LmpzP25hbWU9YXBwJTJGYXBpJTJGaW5jaWRlbnRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZpbmNpZGVudHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZpbmNpZGVudHMlMkZyb3V0ZS50cyZhcHBEaXI9QyUzQSU1Q1VzZXJzJTVDZGV2YW4lNUNEZXNrdG9wJTVDaGFja2F0aG9uJTVDY2FtcHVzLWd1YXJkaWFuLWFpJTVDZnJvbnRlbmQtc3R1ZGVudCU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDZGV2YW4lNUNEZXNrdG9wJTVDaGFja2F0aG9uJTVDY2FtcHVzLWd1YXJkaWFuLWFpJTVDZnJvbnRlbmQtc3R1ZGVudCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDOEQ7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGRldmFuXFxcXERlc2t0b3BcXFxcaGFja2F0aG9uXFxcXGNhbXB1cy1ndWFyZGlhbi1haVxcXFxmcm9udGVuZC1zdHVkZW50XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGluY2lkZW50c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvaW5jaWRlbnRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvaW5jaWRlbnRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9pbmNpZGVudHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxkZXZhblxcXFxEZXNrdG9wXFxcXGhhY2thdGhvblxcXFxjYW1wdXMtZ3VhcmRpYW4tYWlcXFxcZnJvbnRlbmQtc3R1ZGVudFxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxpbmNpZGVudHNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fincidents%2Froute&page=%2Fapi%2Fincidents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fincidents%2Froute.ts&appDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/../node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/../node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/incidents/route.ts":
/*!****************************************!*\
  !*** ./src/app/api/incidents/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/../node_modules/next/dist/api/server.js\");\n\nconst MIDDLEWARE_URL = process.env.MIDDLEWARE_URL || \"http://172.25.44.70:8000/api/v1/incidents/report\";\nasync function POST(request) {\n    try {\n        // 1. Parse JSON from frontend\n        const body = await request.json();\n        // 2. Extract strictly title, description, and incident type\n        const title = body.title || \"\";\n        const description = body.description || \"\";\n        // Checks common frontend keys for category/type\n        const incidentType = body.category || body.incidentType || body.type || body.incident_type || \"\";\n        // 3. Build FormData with ONLY these three fields\n        const formData = new FormData();\n        formData.append(\"title\", String(title));\n        formData.append(\"description\", String(description));\n        formData.append(\"incident_type\", String(incidentType)); // Adjust field key if your middleware expects e.g. \"incidentType\" or \"category\"\n        // 4. Forward to middleware\n        const middlewareResponse = await fetch(MIDDLEWARE_URL, {\n            method: \"POST\",\n            body: formData // Node/Next handles the multipart boundary header automatically\n        });\n        const data = await middlewareResponse.json();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data, {\n            status: middlewareResponse.status\n        });\n    } catch (error) {\n        console.error(\"[MIDDLEWARE_FORWARD_ERROR]\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to communicate with safety middleware service\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9pbmNpZGVudHMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMEM7QUFFMUMsTUFBTUMsY0FBYyxHQUFHQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsY0FBYyxJQUFJLGtEQUFrRDtBQUVoRyxlQUFlRyxJQUFJQSxDQUFDQyxPQUFnQixFQUFFO0lBQzNDLElBQUk7UUFDRjtRQUNBLE1BQU1DLElBQUksR0FBRyxNQUFNRCxPQUFPLENBQUNFLElBQUksQ0FBQyxDQUFDO1FBRWpDO1FBQ0EsTUFBTUMsS0FBSyxHQUFHRixJQUFJLENBQUNFLEtBQUssSUFBSSxFQUFFO1FBQzlCLE1BQU1DLFdBQVcsR0FBR0gsSUFBSSxDQUFDRyxXQUFXLElBQUksRUFBRTtRQUMxQztRQUNBLE1BQU1DLFlBQVksR0FBR0osSUFBSSxDQUFDSyxRQUFRLElBQUlMLElBQUksQ0FBQ0ksWUFBWSxJQUFJSixJQUFJLENBQUNNLElBQUksSUFBSU4sSUFBSSxDQUFDTyxhQUFhLElBQUksRUFBRTtRQUVoRztRQUNBLE1BQU1DLFFBQVEsR0FBRyxJQUFJQyxRQUFRLENBQUMsQ0FBQztRQUMvQkQsUUFBUSxDQUFDRSxNQUFNLENBQUMsT0FBTyxFQUFFQyxNQUFNLENBQUNULEtBQUssQ0FBQyxDQUFDO1FBQ3ZDTSxRQUFRLENBQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUVDLE1BQU0sQ0FBQ1IsV0FBVyxDQUFDLENBQUM7UUFDbkRLLFFBQVEsQ0FBQ0UsTUFBTSxDQUFDLGVBQWUsRUFBRUMsTUFBTSxDQUFDUCxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEQ7UUFDQSxNQUFNUSxrQkFBa0IsR0FBRyxNQUFNQyxLQUFLLENBQUNsQixjQUFjLEVBQUU7WUFDckRtQixNQUFNLEVBQUUsTUFBTTtZQUNkZCxJQUFJLEVBQUVRLFFBQVEsQ0FBRTtRQUNsQixDQUFDLENBQUM7UUFFRixNQUFNTyxJQUFJLEdBQUcsTUFBTUgsa0JBQWtCLENBQUNYLElBQUksQ0FBQyxDQUFDO1FBRTVDLE9BQU9QLHFEQUFZLENBQUNPLElBQUksQ0FBQ2MsSUFBSSxFQUFFO1lBQUVDLE1BQU0sRUFBRUosa0JBQWtCLENBQUNJLE1BQUFBO1FBQU8sQ0FBQyxDQUFDO0lBQ3ZFLENBQUMsQ0FBQyxPQUFPQyxLQUFLLEVBQUU7UUFDZEMsT0FBTyxDQUFDRCxLQUFLLENBQUMsNEJBQTRCLEVBQUVBLEtBQUssQ0FBQztRQUNsRCxPQUFPdkIscURBQVksQ0FBQ08sSUFBSSxDQUN0QjtZQUFFZ0IsS0FBSyxFQUFFO1FBQXVELENBQUMsRUFDakU7WUFBRUQsTUFBTSxFQUFFO1FBQUksQ0FDaEIsQ0FBQztJQUNIO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZGV2YW5cXERlc2t0b3BcXGhhY2thdGhvblxcY2FtcHVzLWd1YXJkaWFuLWFpXFxmcm9udGVuZC1zdHVkZW50XFxzcmNcXGFwcFxcYXBpXFxpbmNpZGVudHNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5cclxuY29uc3QgTUlERExFV0FSRV9VUkwgPSBwcm9jZXNzLmVudi5NSURETEVXQVJFX1VSTCB8fCBcImh0dHA6Ly8xNzIuMjUuNDQuNzA6ODAwMC9hcGkvdjEvaW5jaWRlbnRzL3JlcG9ydFwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyAxLiBQYXJzZSBKU09OIGZyb20gZnJvbnRlbmRcclxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuXHJcbiAgICAvLyAyLiBFeHRyYWN0IHN0cmljdGx5IHRpdGxlLCBkZXNjcmlwdGlvbiwgYW5kIGluY2lkZW50IHR5cGVcclxuICAgIGNvbnN0IHRpdGxlID0gYm9keS50aXRsZSB8fCBcIlwiO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBib2R5LmRlc2NyaXB0aW9uIHx8IFwiXCI7XHJcbiAgICAvLyBDaGVja3MgY29tbW9uIGZyb250ZW5kIGtleXMgZm9yIGNhdGVnb3J5L3R5cGVcclxuICAgIGNvbnN0IGluY2lkZW50VHlwZSA9IGJvZHkuY2F0ZWdvcnkgfHwgYm9keS5pbmNpZGVudFR5cGUgfHwgYm9keS50eXBlIHx8IGJvZHkuaW5jaWRlbnRfdHlwZSB8fCBcIlwiO1xyXG5cclxuICAgIC8vIDMuIEJ1aWxkIEZvcm1EYXRhIHdpdGggT05MWSB0aGVzZSB0aHJlZSBmaWVsZHNcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJ0aXRsZVwiLCBTdHJpbmcodGl0bGUpKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZChcImRlc2NyaXB0aW9uXCIsIFN0cmluZyhkZXNjcmlwdGlvbikpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKFwiaW5jaWRlbnRfdHlwZVwiLCBTdHJpbmcoaW5jaWRlbnRUeXBlKSk7IC8vIEFkanVzdCBmaWVsZCBrZXkgaWYgeW91ciBtaWRkbGV3YXJlIGV4cGVjdHMgZS5nLiBcImluY2lkZW50VHlwZVwiIG9yIFwiY2F0ZWdvcnlcIlxyXG5cclxuICAgIC8vIDQuIEZvcndhcmQgdG8gbWlkZGxld2FyZVxyXG4gICAgY29uc3QgbWlkZGxld2FyZVJlc3BvbnNlID0gYXdhaXQgZmV0Y2goTUlERExFV0FSRV9VUkwsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgYm9keTogZm9ybURhdGEsIC8vIE5vZGUvTmV4dCBoYW5kbGVzIHRoZSBtdWx0aXBhcnQgYm91bmRhcnkgaGVhZGVyIGF1dG9tYXRpY2FsbHlcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBtaWRkbGV3YXJlUmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihkYXRhLCB7IHN0YXR1czogbWlkZGxld2FyZVJlc3BvbnNlLnN0YXR1cyB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIltNSURETEVXQVJFX0ZPUldBUkRfRVJST1JdXCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJGYWlsZWQgdG8gY29tbXVuaWNhdGUgd2l0aCBzYWZldHkgbWlkZGxld2FyZSBzZXJ2aWNlXCIgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJNSURETEVXQVJFX1VSTCIsInByb2Nlc3MiLCJlbnYiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJqc29uIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImluY2lkZW50VHlwZSIsImNhdGVnb3J5IiwidHlwZSIsImluY2lkZW50X3R5cGUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiU3RyaW5nIiwibWlkZGxld2FyZVJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJkYXRhIiwic3RhdHVzIiwiZXJyb3IiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/incidents/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/../node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fincidents%2Froute&page=%2Fapi%2Fincidents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fincidents%2Froute.ts&appDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();