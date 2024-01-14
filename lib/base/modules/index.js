"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getS3 = exports.R2 = exports.Utils = exports.setS3 = exports.S3Client__ = exports.mime = exports.PutObjectCommand = exports.S3Client = void 0;
const tslib_1 = require("tslib");
const client_s3_1 = require("@aws-sdk/client-s3");
Object.defineProperty(exports, "S3Client", { enumerable: true, get: function () { return client_s3_1.S3Client; } });
Object.defineProperty(exports, "PutObjectCommand", { enumerable: true, get: function () { return client_s3_1.PutObjectCommand; } });
const c_1 = require("../../w/c");
Object.defineProperty(exports, "S3Client__", { enumerable: true, get: function () { return c_1.S3Client__; } });
Object.defineProperty(exports, "setS3", { enumerable: true, get: function () { return c_1.setS3; } });
const utils_1 = require("../../w/utils");
Object.defineProperty(exports, "Utils", { enumerable: true, get: function () { return utils_1.Utils; } });
const client_1 = require("../Structures/client");
Object.defineProperty(exports, "R2", { enumerable: true, get: function () { return client_1.R2; } });
const mime_types_1 = tslib_1.__importDefault(require("mime-types"));
exports.mime = mime_types_1.default;
const c_2 = require("../../w/c");
Object.defineProperty(exports, "getS3", { enumerable: true, get: function () { return c_2.getS3; } });
//# sourceMappingURL=index.js.map