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
const itemsdata_1 = require("./itemsdata");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
itemsdata_1.ItemsData
    .connect()
    .then((client) => {
    const itemsDatabase = new itemsdata_1.ItemsData(client);
    startServer(itemsDatabase);
});
function startServer(itemsData) {
    const app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    /**
     *
     * path: /api/items
     * @returns {JSON} -all items in db
     */
    app.use(cors());
    app.get('/api/items', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const items = yield itemsData.getAllItems();
        response.json({ items: items });
        console.log(response);
    }));
    /**
     * path: /api/items/:id
     * @returns {JSON}
     */
    app.get('/api/items/id/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const id = request.params.id;
        try {
            const item = yield itemsData.getOneItem(id);
            if (item) {
                response.json({ item: item }).status(200);
            }
            else {
                response.sendStatus(404);
            }
        }
        catch (error) {
            response.status(404).send(id);
        }
    }));
    /**
   * path: /api/items/:id
   * @returns {item} item with matching name
   */
    app.get('/api/items/name/:name', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const name = request.params.name;
        try {
            const item = yield itemsData.getByName(name);
            if (item) {
                response.json({ item: item }).status(200);
            }
            else {
                response.sendStatus(404);
            }
        }
        catch (error) {
            response.status(404).send(name);
        }
    }));
    app.get('/api/items/rating/:rating', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const type = request.params.type;
        try {
            const item = yield itemsData.getByType(type);
            if (item) {
                response.json({ item: item }).status(200);
            }
            else {
                response.sendStatus(404);
            }
        }
        catch (error) {
            response.status(404).send(type);
        }
    }));
    app.post('/api/populate', (request, response) => __awaiter(this, void 0, void 0, function* () {
        console.log(request.body.Restaurant);
        const rest = request.body.Restaurant;
        try {
            let id = yield itemsData.createItem(rest);
            //response.writeHead(201)
            response.setHeader("_id", id.toHexString());
            response.sendStatus(201);
        }
        catch (error) {
            response.sendStatus(500);
        }
    }));
    app.listen(process.env.PORT || 3000, function () {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
}
//# sourceMappingURL=app.js.map