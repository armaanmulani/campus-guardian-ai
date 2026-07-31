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
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
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

/***/ "(rsc)/../node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/../node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/../node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_devan_Desktop_hackathon_campus_guardian_ai_frontend_student_src_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/login/route.ts */ \"(rsc)/./src/app/api/auth/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\devan\\\\Desktop\\\\hackathon\\\\campus-guardian-ai\\\\frontend-student\\\\src\\\\app\\\\api\\\\auth\\\\login\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_devan_Desktop_hackathon_campus_guardian_ai_frontend_student_src_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1hcHAtbG9hZGVyL2luZGV4LmpzP25hbWU9YXBwJTJGYXBpJTJGYXV0aCUyRmxvZ2luJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZS50cyZhcHBEaXI9QyUzQSU1Q1VzZXJzJTVDZGV2YW4lNUNEZXNrdG9wJTVDaGFja2F0aG9uJTVDY2FtcHVzLWd1YXJkaWFuLWFpJTVDZnJvbnRlbmQtc3R1ZGVudCU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDZGV2YW4lNUNEZXNrdG9wJTVDaGFja2F0aG9uJTVDY2FtcHVzLWd1YXJkaWFuLWFpJTVDZnJvbnRlbmQtc3R1ZGVudCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDZ0U7QUFDN0k7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGRldmFuXFxcXERlc2t0b3BcXFxcaGFja2F0aG9uXFxcXGNhbXB1cy1ndWFyZGlhbi1haVxcXFxmcm9udGVuZC1zdHVkZW50XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcbG9naW5cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvbG9naW4vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL2xvZ2luXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcZGV2YW5cXFxcRGVza3RvcFxcXFxoYWNrYXRob25cXFxcY2FtcHVzLWd1YXJkaWFuLWFpXFxcXGZyb250ZW5kLXN0dWRlbnRcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxsb2dpblxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/../node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./src/app/api/auth/login/route.ts":
/*!*****************************************!*\
  !*** ./src/app/api/auth/login/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/../node_modules/next/dist/api/server.js\");\n\nconst BACKEND_URL = \"http://172.25.174.105:8080\";\nasync function POST(request) {\n    try {\n        // Get request body from frontend\n        const body = await request.json();\n        const { email, password } = body;\n        // Optional validation\n        if (!email || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Email and password are required.\"\n            }, {\n                status: 400\n            });\n        }\n        const targetUrl = `${BACKEND_URL}/api/v1/auth/login`;\n        console.log(\"[FORWARDING_LOGIN_TO]:\", targetUrl);\n        const backendResponse = await fetch(targetUrl, {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                email,\n                password\n            })\n        });\n        const responseText = await backendResponse.text();\n        console.log(\"[BACKEND_STATUS]:\", backendResponse.status);\n        console.log(\"[BACKEND_RESPONSE]:\", responseText);\n        let data;\n        try {\n            data = responseText ? JSON.parse(responseText) : {};\n        } catch  {\n            data = {\n                message: responseText\n            };\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data, {\n            status: backendResponse.status\n        });\n    } catch (error) {\n        console.error(\"[LOGIN_ERROR]\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to connect to authentication server\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTBDO0FBRTFDLE1BQU1DLFdBQVcsR0FBRyw0QkFBNEI7QUFFekMsZUFBZUMsSUFBSUEsQ0FBQ0MsT0FBZ0IsRUFBRTtJQUMzQyxJQUFJO1FBQ0Y7UUFDQSxNQUFNQyxJQUFJLEdBQUcsTUFBTUQsT0FBTyxDQUFDRSxJQUFJLENBQUMsQ0FBQztRQUNqQyxNQUFNLEVBQUVDLEtBQUssRUFBRUMsUUFBQUEsRUFBVSxHQUFHSCxJQUFJO1FBRWhDO1FBQ0EsSUFBSSxDQUFDRSxLQUFLLElBQUksQ0FBQ0MsUUFBUSxFQUFFO1lBQ3ZCLE9BQU9QLHFEQUFZLENBQUNLLElBQUksQ0FDdEI7Z0JBQUVHLEtBQUssRUFBRTtZQUFtQyxDQUFDLEVBQzdDO2dCQUFFQyxNQUFNLEVBQUU7WUFBSSxDQUNoQixDQUFDO1FBQ0g7UUFFQSxNQUFNQyxTQUFTLEdBQUksR0FBRVQsV0FBWSxvQkFBbUI7UUFDcERVLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHdCQUF3QixFQUFFRixTQUFTLENBQUM7UUFFaEQsTUFBTUcsZUFBZSxHQUFHLE1BQU1DLEtBQUssQ0FBQ0osU0FBUyxFQUFFO1lBQzdDSyxNQUFNLEVBQUUsTUFBTTtZQUNkQyxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFO1lBQ2xCLENBQUM7WUFDRFosSUFBSSxFQUFFYSxJQUFJLENBQUNDLFNBQVMsQ0FBQztnQkFDbkJaLEtBQUs7Z0JBQ0xDO1lBQ0YsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGLE1BQU1ZLFlBQVksR0FBRyxNQUFNTixlQUFlLENBQUNPLElBQUksQ0FBQyxDQUFDO1FBRWpEVCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRUMsZUFBZSxDQUFDSixNQUFNLENBQUM7UUFDeERFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHFCQUFxQixFQUFFTyxZQUFZLENBQUM7UUFFaEQsSUFBSUUsSUFBSTtRQUVSLElBQUk7WUFDRkEsSUFBSSxHQUFHRixZQUFZLEdBQUdGLElBQUksQ0FBQ0ssS0FBSyxDQUFDSCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLE9BQU07WUFDTkUsSUFBSSxHQUFHO2dCQUFFRSxPQUFPLEVBQUVKO1lBQWEsQ0FBQztRQUNsQztRQUVBLE9BQU9uQixxREFBWSxDQUFDSyxJQUFJLENBQUNnQixJQUFJLEVBQUU7WUFDN0JaLE1BQU0sRUFBRUksZUFBZSxDQUFDSixNQUFBQTtRQUMxQixDQUFDLENBQUM7SUFFSixDQUFDLENBQUMsT0FBT0QsS0FBSyxFQUFFO1FBQ2RHLE9BQU8sQ0FBQ0gsS0FBSyxDQUFDLGVBQWUsRUFBRUEsS0FBSyxDQUFDO1FBRXJDLE9BQU9SLHFEQUFZLENBQUNLLElBQUksQ0FDdEI7WUFDRUcsS0FBSyxFQUFFO1FBQ1QsQ0FBQyxFQUNEO1lBQ0VDLE1BQU0sRUFBRTtRQUNWLENBQ0YsQ0FBQztJQUNIO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZGV2YW5cXERlc2t0b3BcXGhhY2thdGhvblxcY2FtcHVzLWd1YXJkaWFuLWFpXFxmcm9udGVuZC1zdHVkZW50XFxzcmNcXGFwcFxcYXBpXFxhdXRoXFxsb2dpblxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcblxyXG5jb25zdCBCQUNLRU5EX1VSTCA9IFwiaHR0cDovLzE3Mi4yNS4xNzQuMTA1OjgwODBcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgLy8gR2V0IHJlcXVlc3QgYm9keSBmcm9tIGZyb250ZW5kXHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gYm9keTtcclxuXHJcbiAgICAvLyBPcHRpb25hbCB2YWxpZGF0aW9uXHJcbiAgICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJFbWFpbCBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkLlwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYCR7QkFDS0VORF9VUkx9L2FwaS92MS9hdXRoL2xvZ2luYDtcclxuICAgIGNvbnNvbGUubG9nKFwiW0ZPUldBUkRJTkdfTE9HSU5fVE9dOlwiLCB0YXJnZXRVcmwpO1xyXG5cclxuICAgIGNvbnN0IGJhY2tlbmRSZXNwb25zZSA9IGF3YWl0IGZldGNoKHRhcmdldFVybCwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBlbWFpbCxcclxuICAgICAgICBwYXNzd29yZCxcclxuICAgICAgfSksXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZVRleHQgPSBhd2FpdCBiYWNrZW5kUmVzcG9uc2UudGV4dCgpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiW0JBQ0tFTkRfU1RBVFVTXTpcIiwgYmFja2VuZFJlc3BvbnNlLnN0YXR1cyk7XHJcbiAgICBjb25zb2xlLmxvZyhcIltCQUNLRU5EX1JFU1BPTlNFXTpcIiwgcmVzcG9uc2VUZXh0KTtcclxuXHJcbiAgICBsZXQgZGF0YTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBkYXRhID0gcmVzcG9uc2VUZXh0ID8gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpIDoge307XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgZGF0YSA9IHsgbWVzc2FnZTogcmVzcG9uc2VUZXh0IH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEsIHtcclxuICAgICAgc3RhdHVzOiBiYWNrZW5kUmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgfSk7XHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiW0xPR0lOX0VSUk9SXVwiLCBlcnJvcik7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7XHJcbiAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGNvbm5lY3QgdG8gYXV0aGVudGljYXRpb24gc2VydmVyXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBzdGF0dXM6IDUwMCxcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiQkFDS0VORF9VUkwiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJqc29uIiwiZW1haWwiLCJwYXNzd29yZCIsImVycm9yIiwic3RhdHVzIiwidGFyZ2V0VXJsIiwiY29uc29sZSIsImxvZyIsImJhY2tlbmRSZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXNwb25zZVRleHQiLCJ0ZXh0IiwiZGF0YSIsInBhcnNlIiwibWVzc2FnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/login/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/../node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdevan%5CDesktop%5Chackathon%5Ccampus-guardian-ai%5Cfrontend-student&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();