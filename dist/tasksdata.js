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
const mongodb_1 = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const URL = process.env.MONGO_CONNECTION || '';
class TasksData {
    constructor(client) {
        this.tasks = client.db().collection('tasks');
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => mongodb_1.MongoClient.connect(URL, (err, client) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject(err);
                }
                resolve(client);
            })));
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tasks.find({}).toArray();
        });
    }
    getOneTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.tasks.findOne({ _id: new mongodb_1.ObjectId(id) }));
            return yield this.tasks.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            let temp = yield this.tasks.insertOne({
                task
            });
            return (temp.insertedId);
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let temp = yield this.tasks.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            console.log(temp.result);
            return temp.result;
        });
    }
    updateTask(id, task) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tasks.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: {
                    "task": {
                        "description": task.description,
                        "isComplete": task.isComplete,
                        "dateCompleted": task.dateCompleted
                    }
                } }, { upsert: false });
        });
    }
}
exports.TasksData = TasksData;
//# sourceMappingURL=tasksdata.js.map