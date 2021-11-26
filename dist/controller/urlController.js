"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLController = void 0;
const constants_1 = require("../config/constants");
const express_1 = require("express");
const shortid_1 = __importDefault(require("shortid"));
const URL_1 = require("database/model/URL");
class URLController {
    shorten(req, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originURL } = req.body;
            const url = yield URL_1.URLModel.findOne({ originURL });
            if (url) {
                response.json(url);
                return;
            }
            const hash = shortid_1.default.generate();
            const shortURL = `${constants_1.config.URL_API}/${hash}`;
            const newURL = yield URL_1.URLModel.create({ hash, shortURL, originURL });
            response.json(newURL);
        });
    }
    redirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hash } = req.params;
            const aurl = yield URL_1.URLModel.findOne({ hash });
            if (aurl) {
                express_1.response.redirect(aurl.originURL);
                return;
            }
            express_1.response.status(400).json({ error: "URL not found" });
        });
    }
}
exports.URLController = URLController;
//# sourceMappingURL=urlController.js.map