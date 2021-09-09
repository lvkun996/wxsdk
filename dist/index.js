"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const wxTool_1 = (0, tslib_1.__importDefault)(require("./wxTool/wxTool"));
const utils_1 = (0, tslib_1.__importDefault)(require("./utils/utils"));
console.log(wxTool_1.default);
exports.default = Object.assign(Object.assign({}, wxTool_1.default), utils_1.default);
