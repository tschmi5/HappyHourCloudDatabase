"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasksdata_1 = require("./tasksdata");
const express = require("express");
const morgan = require("morgan");
const Task_1 = require("./types/Task");
const Error_1 = require("./types/Error");
//import swaggerDocument from '../swagger.json';
//const config = require("../config.json")
const bodyParser = require('body-parser');
tasksdata_1.TasksData
    .connect()
    .then((client) => {
    const tasksDatabase = new tasksdata_1.TasksData(client);
    startServer(tasksDatabase);
});
function startServer(tasksData) {
    const app = express();
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    //app.get('/api/docs', express.static( 'swagger' ));RSA_NO_PADDING
    app.get('/api/tasks', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const tasks = yield tasksData.getAllTasks();
        response.json({ tasks: tasks });
    }));
    app.get('/api/tasks/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const id = request.params.id;
        try {
            const task = yield tasksData.getOneTask(id);
            response.json({ task: task });
        }
        catch (error) {
            response.status(404).send(Error_1.noSuchTask(id));
        }
    }));
    app.post('/api/tasks', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const task = {
            description: request.body.description,
            isComplete: request.body.isComplete || false,
            dateCreated: new Date().toISOString(),
            dateCompleted: request.body.dateCompleted || ''
        };
        if (Task_1.isValidTask(task)) {
            try {
                let temp = yield tasksData.createTask(task);
                response.status(201).send('_id: ' + temp);
            }
            catch (error) {
                response.sendStatus(500);
            }
        }
        else {
            response.status(400).send(Error_1.invalidDescription(task));
        }
    }));
    app.delete('/api/tasks/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const id = request.params.id;
        try {
            yield tasksData.deleteTask(id);
            response.sendStatus(204);
        }
        catch (error) {
            response.sendStatus(500);
        }
    }));
    app.patch('/api/tasks/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const id = request.params.id;
        const task = {
            description: request.body.description,
            dateCreated: request.body.dateCreated,
            isComplete: request.body.isComplete || false,
            dateCompleted: request.body.dateCompleted || ''
        };
        if (Task_1.isValidTask(task)) {
            try {
                yield tasksData.updateTask(id, task);
                response.sendStatus(204);
            }
            catch (error) {
                console.log(error);
                response.sendStatus(404);
            }
        }
        else {
            response.status(400).send(Error_1.invalidDescription(task));
        }
    }));
    app.listen(process.env.PORT || 3000, function () {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
}
//# sourceMappingURL=app.js.map