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
class ItemsData {
    constructor(client) {
        this.items = client.db().collection('items');
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
    getAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.items.find({}).toArray();
        });
    }
    getOneItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.items.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.items.findOne({ name: name });
        });
    }
    getByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.items.find({ type: type }).toArray();
        });
    }
    createItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.items.insertOne({
                item: item
            });
            return (res.insertedId);
        });
    }
}
exports.ItemsData = ItemsData;
//# sourceMappingURL=itemsdata.js.map