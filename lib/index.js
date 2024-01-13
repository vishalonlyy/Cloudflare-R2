"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traffic = exports.Utils = exports.R2 = void 0;
const tslib_1 = require("tslib");
const client_js_1 = tslib_1.__importDefault(require("./base/Structures/client.js"));
exports.R2 = client_js_1.default;
const f_js_1 = require("./functions/f.js");
Object.defineProperty(exports, "Utils", { enumerable: true, get: function () { return f_js_1.Utils; } });
const traffic_js_1 = require("./base/Structures/traffic.js");
Object.defineProperty(exports, "traffic", { enumerable: true, get: function () { return traffic_js_1.traffic; } });
//# sourceMappingURL=index.js.map