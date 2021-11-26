"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urlController_1 = require("./controller/urlController");
const express_1 = __importDefault(require("express"));
const MongoConnection_1 = require("database/MongoConnection");
const api = (0, express_1.default)();
const urlController = new urlController_1.URLController;
api.use(express_1.default.json());
const database = new MongoConnection_1.MongoConnection();
database.connect();
api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);
api.listen(5000, () => console.log('Aplicação rodando!'));
//# sourceMappingURL=index.js.map