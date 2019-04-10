import { MongoClient } from "mongodb";
import { ItemsData } from "./itemsdata";
import * as express from 'express';
import * as morgan from 'morgan';
import { Request, Response } from 'express';
import { isValidItem } from "./types/Item";
import { invalidDescription, noSuchItem, noChange } from "./types/Error";


const bodyParser = require('body-parser');

ItemsData
  .connect()
  .then((client: MongoClient) => {
    const itemsDatabase = new ItemsData(client);
    startServer(itemsDatabase);
  });

function startServer(itemsData: ItemsData) {
  const app = express();

  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

/**
 * 
 * path: /api/items
 * @returns {JSON} -all items in db
 */
  app.get('/api/items', async (request: Request, response: Response) => {
    const items = await itemsData.getAllItems();
    response.json({ items: items });
  });
/**
 * path: /api/items/:id
 * @returns {JSON} 
 */
  app.get('/api/items/id/:id', async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
    const item = await itemsData.getOneItem(id);
    if(item){
      response.json({ item: item }).status(200)
    } else {
      response.sendStatus(404)
    }
    } catch (error) {
      response.status(404).send(noSuchItem(id));
    }
  });
  /**
 * path: /api/items/:id
 * @returns {item} item with matching name 
 */
  app.get('/api/items/name/:name', async (request: Request, response: Response) => {
    const name = request.params.name;
    try {
    const item = await itemsData.getByName(name);
    if(item){
      response.json({ item: item }).status(200)
    } else {
      response.sendStatus(404)
    }
    } catch (error) {
      response.status(404).send(noSuchItem(name));
    }
  });
  app.get('/api/items/type/:type', async (request: Request, response: Response) => {
    const type = request.params.type;
    try {
    const item = await itemsData.getByType(type);
    if(item){
      response.json({ item: item }).status(200)
    } else {
      response.sendStatus(404)
    }
    } catch (error) {
      response.status(404).send(noSuchItem(type));
    }
  });

  app.post('/api/items', async (request, response) => {
    const item = { 
    description : request.body.description,
    isComplete : request.body.isComplete || false,
    dateCreated : new Date().toISOString(),
    dateCompleted : request.body.dateCompleted || ''
    }
    
    if(isValidItem(item)){
    
    try {

      let id = await itemsData.createItem(item);
      //response.writeHead(201)
      response.setHeader("_id",id.toHexString())
      response.sendStatus(201)
    } catch (error) {
      response.sendStatus(500);
    }

  } else {
    response.status(400).send(invalidDescription(item));
  }
  });
    
  app.delete('/api/items/:id', async (request, response) => {
    const id = request.params.id;
    try {
      let valid = await itemsData.deleteItem(id);
      if(valid){
        response.sendStatus(204);

      } else {
        response.status(404).send(noSuchItem(id));
      }
    } catch (error) {
      response.sendStatus(500);
    }
  });

  app.patch('/api/items/:id', async (request, response) => {
    const id = request.params.id;
    const item = { 
      description : request.body.description,
      dateCreated : request.body.dateCreated,
      isComplete : request.body.isComplete || false,
      dateCompleted : request.body.dateCompleted || ''
      }
    if(isValidItem(item)){
    try{
      let valid = await itemsData.updateItem(id, item);
      if(valid.matchedCount > 0 && valid.modifiedCount > 0){
        response.sendStatus(204);
      } else if (valid.modifiedCount == 0) {
        response.status(400).send(noChange(id))
      } else {

      }
    } catch (error) {
      console.log(error)
      response.sendStatus(404);
    }
  } else {
    response.status(400).send(invalidDescription(item));
  }
  });

  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
}