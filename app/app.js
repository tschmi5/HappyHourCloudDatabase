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
var tasksdata_1 = require("./tasksdata");
var express = require("express");
var morgan = require("morgan");
var Task_1 = require("./types/Task");
var Error_1 = require("./types/Error");
//import swaggerDocument from '../swagger.json';
//const config = require("../config.json")
var bodyParser = require('body-parser');
tasksdata_1.TasksData
    .connect()
    .then(function (client) {
    var tasksDatabase = new tasksdata_1.TasksData(client);
    startServer(tasksDatabase);
});
function startServer(tasksData) {
    var _this = this;
    var app = express();
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    //app.get('/api/docs', express.static( 'swagger' ));RSA_NO_PADDING
    app.get('/api/tasks', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tasksData.getAllTasks()];
                case 1:
                    tasks = _a.sent();
                    response.json({ tasks: tasks });
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/api/tasks/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var id, task, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, tasksData.getOneTask(id)];
                case 2:
                    task = _a.sent();
                    if (task) {
                        response.json({ task: task }).status(200);
                    }
                    else {
                        response.sendStatus(404);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    response.status(404).send(Error_1.noSuchTask(id));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.post('/api/tasks', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var task, id, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    task = {
                        description: request.body.description,
                        isComplete: request.body.isComplete || false,
                        dateCreated: new Date().toISOString(),
                        dateCompleted: request.body.dateCompleted || ''
                    };
                    if (!Task_1.isValidTask(task)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, tasksData.createTask(task)];
                case 2:
                    id = _a.sent();
                    //response.writeHead(201)
                    response.setHeader("_id", id.toHexString());
                    response.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    response.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    response.status(400).send(Error_1.invalidDescription(task));
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); });
    app["delete"]('/api/tasks/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var id, valid, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, tasksData.deleteTask(id)];
                case 2:
                    valid = _a.sent();
                    if (valid) {
                        response.sendStatus(204);
                    }
                    else {
                        response.status(404).send(Error_1.noSuchTask(id));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    response.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.patch('/api/tasks/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var id, task, valid, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.params.id;
                    task = {
                        description: request.body.description,
                        dateCreated: request.body.dateCreated,
                        isComplete: request.body.isComplete || false,
                        dateCompleted: request.body.dateCompleted || ''
                    };
                    if (!Task_1.isValidTask(task)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, tasksData.updateTask(id, task)];
                case 2:
                    valid = _a.sent();
                    if (valid.matchedCount > 0 && valid.modifiedCount > 0) {
                        response.sendStatus(204);
                    }
                    else if (valid.modifiedCount == 0) {
                        response.status(400).send(Error_1.noChange(id));
                    }
                    else {
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.log(error_4);
                    response.sendStatus(404);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    response.status(400).send(Error_1.invalidDescription(task));
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); });
    app.listen(process.env.PORT || 3000, function () {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
}
