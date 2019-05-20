import { MongoClient } from "mongodb";
import { ItemsData } from "./itemsdata";
import * as express from 'express';
import * as morgan from 'morgan';
import { Request, Response } from 'express';
import { Restaurant } from "./types/Restaurant";


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
    
    response.sendStatus(418).json({ items: items }).setHeader("Access-Control-Allow-Origin","*")
  });
  /**
   * path: /api/items/:id
   * @returns {JSON} 
   */
  app.get('/api/items/id/:id', async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
      const item = await itemsData.getOneItem(id);
      if (item) {
        response.json({ item: item }).status(200)
      } else {
        response.sendStatus(404)
      }
    } catch (error) {
      response.status(404).send(id);
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
      if (item) {
        response.json({ item: item }).status(200)
      } else {
        response.sendStatus(404)
      }
    } catch (error) {
      response.status(404).send(name);
    }
  });
  app.get('/api/items/rating/:rating', async (request: Request, response: Response) => {
    const type = request.params.type;
    try {
      const item = await itemsData.getByType(type);
      if (item) {
        response.json({ item: item }).status(200)
      } else {
        response.sendStatus(404)
      }
    } catch (error) {
      response.status(404).send(type);
    }
  });

  app.post('/api/populate', async (request, response) => {
    console.log(request.body.Restaurant);

    const rest: Restaurant = request.body.Restaurant;


    try {

      let id = await itemsData.createItem(rest);
      //response.writeHead(201)
      response.setHeader("_id", id.toHexString())
      response.sendStatus(201)
    } catch (error) {
      response.sendStatus(500);
    }


  });





  app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
}