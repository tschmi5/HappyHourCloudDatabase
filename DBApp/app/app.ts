import { MongoClient } from "mongodb";
import { TasksData } from "./tasksdata";
import * as express from 'express';
import * as morgan from 'morgan';
import { Request, Response } from 'express';
import { isValidTask } from "./types/Task";
import { invalidDescription, noSuchTask, noChange } from "./types/Error";
import * as swagger from 'swagger-ui-express'
import { SwaggerDefinitionConstant } from 'swagger-express-ts'
import swaggerUiExpress = require("swagger-ui-express");
import { RSA_NO_PADDING } from "constants";
//import swaggerDocument from '../swagger.json';

//const config = require("../config.json")
const bodyParser = require('body-parser');

TasksData
  .connect()
  .then((client: MongoClient) => {
    const tasksDatabase = new TasksData(client);
    startServer(tasksDatabase);
  });

function startServer(tasksData: TasksData) {
  const app = express();

  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  
  //app.get('/api/docs', express.static( 'swagger' ));RSA_NO_PADDING

  app.get('/api/tasks', async (request: Request, response: Response) => {
    const tasks = await tasksData.getAllTasks();
    response.json({ tasks: tasks });
  });
  app.get('/api/tasks/:id', async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
    const task = await tasksData.getOneTask(id);
    if(task){
      response.json({ task: task }).status(200)
    } else {
      response.sendStatus(404)
    }
    } catch (error) {
      response.status(404).send(noSuchTask(id));
    }
  });
  app.post('/api/tasks', async (request, response) => {
    const task = { 
    description : request.body.description,
    isComplete : request.body.isComplete || false,
    dateCreated : new Date().toISOString(),
    dateCompleted : request.body.dateCompleted || ''
    }
    
    if(isValidTask(task)){
    
    try {

      let id = await tasksData.createTask(task);
      //response.writeHead(201)
      response.setHeader("_id",id.toHexString())
      response.sendStatus(201)
    } catch (error) {
      response.sendStatus(500);
    }

  } else {
    response.status(400).send(invalidDescription(task));
  }
  });
    
  app.delete('/api/tasks/:id', async (request, response) => {
    const id = request.params.id;
    try {
      let valid = await tasksData.deleteTask(id);
      if(valid){
        response.sendStatus(204);

      } else {
        response.status(404).send(noSuchTask(id));
      }
    } catch (error) {
      response.sendStatus(500);
    }
  });

  app.patch('/api/tasks/:id', async (request, response) => {
    const id = request.params.id;
    const task = { 
      description : request.body.description,
      dateCreated : request.body.dateCreated,
      isComplete : request.body.isComplete || false,
      dateCompleted : request.body.dateCompleted || ''
      }
    if(isValidTask(task)){
    try{
      let valid = await tasksData.updateTask(id, task);
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
    response.status(400).send(invalidDescription(task));
  }
  });

  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
}