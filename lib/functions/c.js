"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getS3 = exports.setS3 = exports.S3Client__ = void 0;
let S3Client__;
async function setS3(data) {
    exports.S3Client__ = S3Client__ = data;
}
exports.setS3 = setS3;
async function getS3() {
    return S3Client__;
}
exports.getS3 = getS3;
//# sourceMappingURL=c.js.map