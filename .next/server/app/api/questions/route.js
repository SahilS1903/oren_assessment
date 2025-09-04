"use strict";
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
exports.id = "app/api/questions/route";
exports.ids = ["app/api/questions/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fquestions%2Froute&page=%2Fapi%2Fquestions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquestions%2Froute.js&appDir=%2FUsers%2Fsahil%2FDesktop%2Fprojects%2Foren_assessment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsahil%2FDesktop%2Fprojects%2Foren_assessment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fquestions%2Froute&page=%2Fapi%2Fquestions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquestions%2Froute.js&appDir=%2FUsers%2Fsahil%2FDesktop%2Fprojects%2Foren_assessment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsahil%2FDesktop%2Fprojects%2Foren_assessment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_sahil_Desktop_projects_oren_assessment_app_api_questions_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/questions/route.js */ \"(rsc)/./app/api/questions/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/questions/route\",\n        pathname: \"/api/questions\",\n        filename: \"route\",\n        bundlePath: \"app/api/questions/route\"\n    },\n    resolvedPagePath: \"/Users/sahil/Desktop/projects/oren_assessment/app/api/questions/route.js\",\n    nextConfigOutput,\n    userland: _Users_sahil_Desktop_projects_oren_assessment_app_api_questions_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/questions/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZxdWVzdGlvbnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnF1ZXN0aW9ucyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnF1ZXN0aW9ucyUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRnNhaGlsJTJGRGVza3RvcCUyRnByb2plY3RzJTJGb3Jlbl9hc3Nlc3NtZW50JTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRnNhaGlsJTJGRGVza3RvcCUyRnByb2plY3RzJTJGb3Jlbl9hc3Nlc3NtZW50JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN3QjtBQUNyRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2VzZy1xdWVzdGlvbm5haXJlLW5leHRqcy8/MTE3NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvc2FoaWwvRGVza3RvcC9wcm9qZWN0cy9vcmVuX2Fzc2Vzc21lbnQvYXBwL2FwaS9xdWVzdGlvbnMvcm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3F1ZXN0aW9ucy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3F1ZXN0aW9uc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcXVlc3Rpb25zL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL3NhaGlsL0Rlc2t0b3AvcHJvamVjdHMvb3Jlbl9hc3Nlc3NtZW50L2FwcC9hcGkvcXVlc3Rpb25zL3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9xdWVzdGlvbnMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fquestions%2Froute&page=%2Fapi%2Fquestions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquestions%2Froute.js&appDir=%2FUsers%2Fsahil%2FDesktop%2Fprojects%2Foren_assessment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsahil%2FDesktop%2Fprojects%2Foren_assessment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/questions/route.js":
/*!************************************!*\
  !*** ./app/api/questions/route.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/prisma */ \"(rsc)/./lib/prisma.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/auth */ \"(rsc)/./lib/auth.js\");\n\n\n\nasync function GET(request) {\n    try {\n        // Verify authentication\n        const token = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.getTokenFromRequest)(request);\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Access token required\"\n            }, {\n                status: 401\n            });\n        }\n        const decoded = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.verifyToken)(token);\n        if (!decoded) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid or expired token\"\n            }, {\n                status: 401\n            });\n        }\n        // Get all questions\n        const questions = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.question.findMany({\n            orderBy: {\n                order_num: \"asc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(questions, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Questions error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3F1ZXN0aW9ucy9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTBDO0FBQ0U7QUFDd0I7QUFFN0QsZUFBZUksSUFBSUMsT0FBTztJQUMvQixJQUFJO1FBQ0Ysd0JBQXdCO1FBQ3hCLE1BQU1DLFFBQVFILDhEQUFtQkEsQ0FBQ0U7UUFDbEMsSUFBSSxDQUFDQyxPQUFPO1lBQ1YsT0FBT04scURBQVlBLENBQUNPLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUF3QixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDN0U7UUFFQSxNQUFNQyxVQUFVUixzREFBV0EsQ0FBQ0k7UUFDNUIsSUFBSSxDQUFDSSxTQUFTO1lBQ1osT0FBT1YscURBQVlBLENBQUNPLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUEyQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDaEY7UUFFQSxvQkFBb0I7UUFDcEIsTUFBTUUsWUFBWSxNQUFNViwrQ0FBTUEsQ0FBQ1csUUFBUSxDQUFDQyxRQUFRLENBQUM7WUFDL0NDLFNBQVM7Z0JBQUVDLFdBQVc7WUFBTTtRQUM5QjtRQUVBLE9BQU9mLHFEQUFZQSxDQUFDTyxJQUFJLENBQUNJLFdBQVc7WUFBRUYsUUFBUTtRQUFJO0lBRXBELEVBQUUsT0FBT0QsT0FBTztRQUNkUSxRQUFRUixLQUFLLENBQUMsb0JBQW9CQTtRQUNsQyxPQUFPUixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBd0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDN0U7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2VzZy1xdWVzdGlvbm5haXJlLW5leHRqcy8uL2FwcC9hcGkvcXVlc3Rpb25zL3JvdXRlLmpzPzllOTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICcuLi8uLi8uLi9saWIvcHJpc21hJ1xuaW1wb3J0IHsgdmVyaWZ5VG9rZW4sIGdldFRva2VuRnJvbVJlcXVlc3QgfSBmcm9tICcuLi8uLi8uLi9saWIvYXV0aCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgLy8gVmVyaWZ5IGF1dGhlbnRpY2F0aW9uXG4gICAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbkZyb21SZXF1ZXN0KHJlcXVlc3QpXG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdBY2Nlc3MgdG9rZW4gcmVxdWlyZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSlcbiAgICB9XG5cbiAgICBjb25zdCBkZWNvZGVkID0gdmVyaWZ5VG9rZW4odG9rZW4pXG4gICAgaWYgKCFkZWNvZGVkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgb3IgZXhwaXJlZCB0b2tlbicgfSwgeyBzdGF0dXM6IDQwMSB9KVxuICAgIH1cblxuICAgIC8vIEdldCBhbGwgcXVlc3Rpb25zXG4gICAgY29uc3QgcXVlc3Rpb25zID0gYXdhaXQgcHJpc21hLnF1ZXN0aW9uLmZpbmRNYW55KHtcbiAgICAgIG9yZGVyQnk6IHsgb3JkZXJfbnVtOiAnYXNjJyB9XG4gICAgfSlcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihxdWVzdGlvbnMsIHsgc3RhdHVzOiAyMDAgfSlcblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1F1ZXN0aW9ucyBlcnJvcjonLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwidmVyaWZ5VG9rZW4iLCJnZXRUb2tlbkZyb21SZXF1ZXN0IiwiR0VUIiwicmVxdWVzdCIsInRva2VuIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiZGVjb2RlZCIsInF1ZXN0aW9ucyIsInF1ZXN0aW9uIiwiZmluZE1hbnkiLCJvcmRlckJ5Iiwib3JkZXJfbnVtIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/questions/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comparePasswords: () => (/* binding */ comparePasswords),\n/* harmony export */   getTokenFromRequest: () => (/* binding */ getTokenFromRequest),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   signToken: () => (/* binding */ signToken),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst signToken = (payload)=>{\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, \"91791c3a6592abd6565bbeba498bc76a7e08c206fb92144990829be8ee79add10983e350ab53b6aa0035f749bd060e310504f2ef44ac4c9a0d02b5b4a0856437\", {\n        expiresIn: \"7d\"\n    });\n};\nconst verifyToken = (token)=>{\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, \"91791c3a6592abd6565bbeba498bc76a7e08c206fb92144990829be8ee79add10983e350ab53b6aa0035f749bd060e310504f2ef44ac4c9a0d02b5b4a0856437\");\n    } catch (error) {\n        return null;\n    }\n};\nconst hashPassword = async (password)=>{\n    return await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().hash(password, 12);\n};\nconst comparePasswords = async (password, hashedPassword)=>{\n    return await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(password, hashedPassword);\n};\nconst getTokenFromRequest = (req)=>{\n    // Handle both Pages Router (req.headers) and App Router (req.headers.get())\n    let authHeader;\n    if (req.headers && typeof req.headers.get === \"function\") {\n        // App Router format\n        authHeader = req.headers.get(\"authorization\");\n    } else {\n        // Pages Router format\n        authHeader = req.headers?.authorization;\n    }\n    if (authHeader && authHeader.startsWith(\"Bearer \")) {\n        return authHeader.substring(7);\n    }\n    return null;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBOEI7QUFDRDtBQUV0QixNQUFNRSxZQUFZLENBQUNDO0lBQ3hCLE9BQU9ILHdEQUFRLENBQUNHLFNBQVNFLGtJQUFzQixFQUFFO1FBQUVHLFdBQVc7SUFBSztBQUNyRSxFQUFDO0FBRU0sTUFBTUMsY0FBYyxDQUFDQztJQUMxQixJQUFJO1FBQ0YsT0FBT1YsMERBQVUsQ0FBQ1UsT0FBT0wsa0lBQXNCO0lBQ2pELEVBQUUsT0FBT08sT0FBTztRQUNkLE9BQU87SUFDVDtBQUNGLEVBQUM7QUFFTSxNQUFNQyxlQUFlLE9BQU9DO0lBQ2pDLE9BQU8sTUFBTWIsb0RBQVcsQ0FBQ2EsVUFBVTtBQUNyQyxFQUFDO0FBRU0sTUFBTUUsbUJBQW1CLE9BQU9GLFVBQVVHO0lBQy9DLE9BQU8sTUFBTWhCLHVEQUFjLENBQUNhLFVBQVVHO0FBQ3hDLEVBQUM7QUFFTSxNQUFNRSxzQkFBc0IsQ0FBQ0M7SUFDbEMsNEVBQTRFO0lBQzVFLElBQUlDO0lBQ0osSUFBSUQsSUFBSUUsT0FBTyxJQUFJLE9BQU9GLElBQUlFLE9BQU8sQ0FBQ0MsR0FBRyxLQUFLLFlBQVk7UUFDeEQsb0JBQW9CO1FBQ3BCRixhQUFhRCxJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQztJQUMvQixPQUFPO1FBQ0wsc0JBQXNCO1FBQ3RCRixhQUFhRCxJQUFJRSxPQUFPLEVBQUVFO0lBQzVCO0lBRUEsSUFBSUgsY0FBY0EsV0FBV0ksVUFBVSxDQUFDLFlBQVk7UUFDbEQsT0FBT0osV0FBV0ssU0FBUyxDQUFDO0lBQzlCO0lBQ0EsT0FBTztBQUNULEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lc2ctcXVlc3Rpb25uYWlyZS1uZXh0anMvLi9saWIvYXV0aC5qcz8yODdiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJ1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcydcblxuZXhwb3J0IGNvbnN0IHNpZ25Ub2tlbiA9IChwYXlsb2FkKSA9PiB7XG4gIHJldHVybiBqd3Quc2lnbihwYXlsb2FkLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVULCB7IGV4cGlyZXNJbjogJzdkJyB9KVxufVxuXG5leHBvcnQgY29uc3QgdmVyaWZ5VG9rZW4gPSAodG9rZW4pID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBoYXNoUGFzc3dvcmQgPSBhc3luYyAocGFzc3dvcmQpID0+IHtcbiAgcmV0dXJuIGF3YWl0IGJjcnlwdC5oYXNoKHBhc3N3b3JkLCAxMilcbn1cblxuZXhwb3J0IGNvbnN0IGNvbXBhcmVQYXNzd29yZHMgPSBhc3luYyAocGFzc3dvcmQsIGhhc2hlZFBhc3N3b3JkKSA9PiB7XG4gIHJldHVybiBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgaGFzaGVkUGFzc3dvcmQpXG59XG5cbmV4cG9ydCBjb25zdCBnZXRUb2tlbkZyb21SZXF1ZXN0ID0gKHJlcSkgPT4ge1xuICAvLyBIYW5kbGUgYm90aCBQYWdlcyBSb3V0ZXIgKHJlcS5oZWFkZXJzKSBhbmQgQXBwIFJvdXRlciAocmVxLmhlYWRlcnMuZ2V0KCkpXG4gIGxldCBhdXRoSGVhZGVyXG4gIGlmIChyZXEuaGVhZGVycyAmJiB0eXBlb2YgcmVxLmhlYWRlcnMuZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gQXBwIFJvdXRlciBmb3JtYXRcbiAgICBhdXRoSGVhZGVyID0gcmVxLmhlYWRlcnMuZ2V0KCdhdXRob3JpemF0aW9uJylcbiAgfSBlbHNlIHtcbiAgICAvLyBQYWdlcyBSb3V0ZXIgZm9ybWF0XG4gICAgYXV0aEhlYWRlciA9IHJlcS5oZWFkZXJzPy5hdXRob3JpemF0aW9uXG4gIH1cbiAgXG4gIGlmIChhdXRoSGVhZGVyICYmIGF1dGhIZWFkZXIuc3RhcnRzV2l0aCgnQmVhcmVyICcpKSB7XG4gICAgcmV0dXJuIGF1dGhIZWFkZXIuc3Vic3RyaW5nKDcpXG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cbiJdLCJuYW1lcyI6WyJqd3QiLCJiY3J5cHQiLCJzaWduVG9rZW4iLCJwYXlsb2FkIiwic2lnbiIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwiZXhwaXJlc0luIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsInZlcmlmeSIsImVycm9yIiwiaGFzaFBhc3N3b3JkIiwicGFzc3dvcmQiLCJoYXNoIiwiY29tcGFyZVBhc3N3b3JkcyIsImhhc2hlZFBhc3N3b3JkIiwiY29tcGFyZSIsImdldFRva2VuRnJvbVJlcXVlc3QiLCJyZXEiLCJhdXRoSGVhZGVyIiwiaGVhZGVycyIsImdldCIsImF1dGhvcml6YXRpb24iLCJzdGFydHNXaXRoIiwic3Vic3RyaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL2VzZy1xdWVzdGlvbm5haXJlLW5leHRqcy8uL2xpYi9wcmlzbWEuanM/NzUxNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsXG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8IG5ldyBQcmlzbWFDbGllbnQoKVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYVxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbCIsInByaXNtYSIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/ms","vendor-chunks/semver","vendor-chunks/bcryptjs","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fquestions%2Froute&page=%2Fapi%2Fquestions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquestions%2Froute.js&appDir=%2FUsers%2Fsahil%2FDesktop%2Fprojects%2Foren_assessment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsahil%2FDesktop%2Fprojects%2Foren_assessment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();