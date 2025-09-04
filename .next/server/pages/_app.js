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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./contexts/AuthContext.js":
/*!*********************************!*\
  !*** ./contexts/AuthContext.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-toast */ \"react-hot-toast\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__, react_hot_toast__WEBPACK_IMPORTED_MODULE_3__]);\n([axios__WEBPACK_IMPORTED_MODULE_2__, react_hot_toast__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst useAuth = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (!context) {\n        throw new Error(\"useAuth must be used within an AuthProvider\");\n    }\n    return context;\n};\nconst AuthProvider = ({ children })=>{\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const token = localStorage.getItem(\"token\");\n        const userData = localStorage.getItem(\"user\");\n        if (token && userData) {\n            setUser(JSON.parse(userData));\n            axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].defaults.headers.common[\"Authorization\"] = `Bearer ${token}`;\n        }\n        setLoading(false);\n    }, []);\n    const login = async (email, password)=>{\n        try {\n            const response = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/api/auth/login\", {\n                email,\n                password\n            });\n            const { token, user } = response.data;\n            localStorage.setItem(\"token\", token);\n            localStorage.setItem(\"user\", JSON.stringify(user));\n            axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].defaults.headers.common[\"Authorization\"] = `Bearer ${token}`;\n            setUser(user);\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_3__[\"default\"].success(\"Login successful!\");\n            return {\n                success: true\n            };\n        } catch (error) {\n            const message = error.response?.data?.error || \"Login failed\";\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_3__[\"default\"].error(message);\n            return {\n                success: false,\n                error: message\n            };\n        }\n    };\n    const register = async (name, email, password)=>{\n        try {\n            const response = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/api/auth/register\", {\n                name,\n                email,\n                password\n            });\n            const { token, user } = response.data;\n            localStorage.setItem(\"token\", token);\n            localStorage.setItem(\"user\", JSON.stringify(user));\n            axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].defaults.headers.common[\"Authorization\"] = `Bearer ${token}`;\n            setUser(user);\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_3__[\"default\"].success(\"Registration successful!\");\n            return {\n                success: true\n            };\n        } catch (error) {\n            const message = error.response?.data?.error || \"Registration failed\";\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_3__[\"default\"].error(message);\n            return {\n                success: false,\n                error: message\n            };\n        }\n    };\n    const logout = ()=>{\n        localStorage.removeItem(\"token\");\n        localStorage.removeItem(\"user\");\n        delete axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].defaults.headers.common[\"Authorization\"];\n        setUser(null);\n        react_hot_toast__WEBPACK_IMPORTED_MODULE_3__[\"default\"].success(\"Logged out successfully\");\n    };\n    const value = {\n        user,\n        login,\n        register,\n        logout,\n        loading\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/sahil/Desktop/projects/oren_assessment/contexts/AuthContext.js\",\n        lineNumber: 86,\n        columnNumber: 5\n    }, undefined);\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUEsTUFBTW1DLFFBQVE7UUFDWjVCO1FBQ0FhO1FBQ0FXO1FBQ0FFO1FBQ0F4QjtJQUNGO0lBRUEscUJBQ0UsOERBQUNSLFlBQVltQyxRQUFRO1FBQUNELE9BQU9BO2tCQUMxQjdCOzs7Ozs7QUFHUCxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXNnLXF1ZXN0aW9ubmFpcmUtbmV4dGpzLy4vY29udGV4dHMvQXV0aENvbnRleHQuanM/NTljZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5pbXBvcnQgdG9hc3QgZnJvbSAncmVhY3QtaG90LXRvYXN0J1xuXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKVxuXG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoQXV0aENvbnRleHQpXG4gIGlmICghY29udGV4dCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlQXV0aCBtdXN0IGJlIHVzZWQgd2l0aGluIGFuIEF1dGhQcm92aWRlcicpXG4gIH1cbiAgcmV0dXJuIGNvbnRleHRcbn1cblxuZXhwb3J0IGNvbnN0IEF1dGhQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUobnVsbClcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJylcbiAgICBjb25zdCB1c2VyRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJylcbiAgICBcbiAgICBpZiAodG9rZW4gJiYgdXNlckRhdGEpIHtcbiAgICAgIHNldFVzZXIoSlNPTi5wYXJzZSh1c2VyRGF0YSkpXG4gICAgICBheGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke3Rva2VufWBcbiAgICB9XG4gICAgXG4gICAgc2V0TG9hZGluZyhmYWxzZSlcbiAgfSwgW10pXG5cbiAgY29uc3QgbG9naW4gPSBhc3luYyAoZW1haWwsIHBhc3N3b3JkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9hdXRoL2xvZ2luJywgeyBlbWFpbCwgcGFzc3dvcmQgfSlcbiAgICAgIGNvbnN0IHsgdG9rZW4sIHVzZXIgfSA9IHJlc3BvbnNlLmRhdGFcbiAgICAgIFxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgdG9rZW4pXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXIpKVxuICAgICAgYXhpb3MuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHt0b2tlbn1gXG4gICAgICBcbiAgICAgIHNldFVzZXIodXNlcilcbiAgICAgIHRvYXN0LnN1Y2Nlc3MoJ0xvZ2luIHN1Y2Nlc3NmdWwhJylcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IucmVzcG9uc2U/LmRhdGE/LmVycm9yIHx8ICdMb2dpbiBmYWlsZWQnXG4gICAgICB0b2FzdC5lcnJvcihtZXNzYWdlKVxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBtZXNzYWdlIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCByZWdpc3RlciA9IGFzeW5jIChuYW1lLCBlbWFpbCwgcGFzc3dvcmQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2F1dGgvcmVnaXN0ZXInLCB7IG5hbWUsIGVtYWlsLCBwYXNzd29yZCB9KVxuICAgICAgY29uc3QgeyB0b2tlbiwgdXNlciB9ID0gcmVzcG9uc2UuZGF0YVxuICAgICAgXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCB0b2tlbilcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkodXNlcikpXG4gICAgICBheGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke3Rva2VufWBcbiAgICAgIFxuICAgICAgc2V0VXNlcih1c2VyKVxuICAgICAgdG9hc3Quc3VjY2VzcygnUmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwhJylcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IucmVzcG9uc2U/LmRhdGE/LmVycm9yIHx8ICdSZWdpc3RyYXRpb24gZmFpbGVkJ1xuICAgICAgdG9hc3QuZXJyb3IobWVzc2FnZSlcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogbWVzc2FnZSB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXInKVxuICAgIGRlbGV0ZSBheGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddXG4gICAgc2V0VXNlcihudWxsKVxuICAgIHRvYXN0LnN1Y2Nlc3MoJ0xvZ2dlZCBvdXQgc3VjY2Vzc2Z1bGx5JylcbiAgfVxuXG4gIGNvbnN0IHZhbHVlID0ge1xuICAgIHVzZXIsXG4gICAgbG9naW4sXG4gICAgcmVnaXN0ZXIsXG4gICAgbG9nb3V0LFxuICAgIGxvYWRpbmdcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cbiAgKVxufVxuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJheGlvcyIsInRvYXN0IiwiQXV0aENvbnRleHQiLCJ1c2VBdXRoIiwiY29udGV4dCIsIkVycm9yIiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VyIiwic2V0VXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidXNlckRhdGEiLCJKU09OIiwicGFyc2UiLCJkZWZhdWx0cyIsImhlYWRlcnMiLCJjb21tb24iLCJsb2dpbiIsImVtYWlsIiwicGFzc3dvcmQiLCJyZXNwb25zZSIsInBvc3QiLCJkYXRhIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInN1Y2Nlc3MiLCJlcnJvciIsIm1lc3NhZ2UiLCJyZWdpc3RlciIsIm5hbWUiLCJsb2dvdXQiLCJyZW1vdmVJdGVtIiwidmFsdWUiLCJQcm92aWRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./contexts/AuthContext.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./contexts/AuthContext.js\");\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-toast */ \"react-hot-toast\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__, react_hot_toast__WEBPACK_IMPORTED_MODULE_3__]);\n([_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__, react_hot_toast__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/sahil/Desktop/projects/oren_assessment/pages/_app.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_hot_toast__WEBPACK_IMPORTED_MODULE_3__.Toaster, {\n                position: \"top-right\"\n            }, void 0, false, {\n                fileName: \"/Users/sahil/Desktop/projects/oren_assessment/pages/_app.js\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/sahil/Desktop/projects/oren_assessment/pages/_app.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBQ3dCO0FBQ2I7QUFFMUIsU0FBU0UsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNsRCxxQkFDRSw4REFBQ0osK0RBQVlBOzswQkFDWCw4REFBQ0c7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7OzBCQUN4Qiw4REFBQ0gsb0RBQU9BO2dCQUFDSSxVQUFTOzs7Ozs7Ozs7Ozs7QUFHeEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lc2ctcXVlc3Rpb25uYWlyZS1uZXh0anMvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnXG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0cy9BdXRoQ29udGV4dCdcbmltcG9ydCB7IFRvYXN0ZXIgfSBmcm9tICdyZWFjdC1ob3QtdG9hc3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8QXV0aFByb3ZpZGVyPlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPFRvYXN0ZXIgcG9zaXRpb249XCJ0b3AtcmlnaHRcIiAvPlxuICAgIDwvQXV0aFByb3ZpZGVyPlxuICApXG59XG4iXSwibmFtZXMiOlsiQXV0aFByb3ZpZGVyIiwiVG9hc3RlciIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInBvc2l0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ "react-hot-toast":
/*!**********************************!*\
  !*** external "react-hot-toast" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-hot-toast");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();