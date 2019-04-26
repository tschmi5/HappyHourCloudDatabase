"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var itemsdata_1 = require("./itemsdata");
var express = require("express");
var morgan = require("morgan");
var Error_1 = require("./types/Error");
var bodyParser = require('body-parser');
itemsdata_1.ItemsData
    .connect()
    .then(function (client) {
    var itemsDatabase = new itemsdata_1.ItemsData(client);
    startServer(itemsDatabase);
});
function startServer(itemsData) {
    var _this = this;
    var app = express();
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    /**
     *
     * path: /api/items
     * @returns {JSON} -all items in db
     */
    app.get('/api/items', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, itemsData.getAllItems()];
                case 1:
                    items = _a.sent();
                    response.json({ items: items });
                    return [2 /*return*/];
            }
        });
    }); });
    /**
     * path: /api/items/:id
     * @returns {JSON}
     */
    app.get('/api/items/id/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var id, item, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, itemsData.getOneItem(id)];
                case 2:
                    item = _a.sent();
                    if (item) {
                        response.json({ item: item }).status(200);
                    }
                    else {
                        response.sendStatus(404);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    response.status(404).send(Error_1.noSuchItem(id));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    /**
   * path: /api/items/:id
   * @returns {item} item with matching name
   */
    app.get('/api/items/name/:name', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var name, item, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = request.params.name;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, itemsData.getByName(name)];
                case 2:
                    item = _a.sent();
                    if (item) {
                        response.json({ item: item }).status(200);
                    }
                    else {
                        response.sendStatus(404);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    response.status(404).send(Error_1.noSuchItem(name));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.get('/api/items/rating/:rating', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var type, item, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    type = request.params.type;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, itemsData.getByType(type)];
                case 2:
                    item = _a.sent();
                    if (item) {
                        response.json({ item: item }).status(200);
                    }
                    else {
                        response.sendStatus(404);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    response.status(404).send(Error_1.noSuchItem(type));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.post('/api/populate', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var rest, id, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rest = JSON.parse(request.body.Restaurant);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, itemsData.createItem(rest)];
                case 2:
                    id = _a.sent();
                    //response.writeHead(201)
                    response.setHeader("_id", id.toHexString());
                    response.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    response.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.listen(process.env.PORT || 3000, function () {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
}
