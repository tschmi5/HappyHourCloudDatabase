import { Collection, MongoClient, ObjectId } from 'mongodb';
import { Task } from './types/Task'
import * as dotenv from 'dotenv';
dotenv.config();
const URL = process.env.MONGO_CONNECTION || '';

export class TasksData {
  tasks: Collection;

  constructor(client: MongoClient) {
    this.tasks = client.db().collection('tasks');
  }
  
  
  static async connect() {
    return new Promise<MongoClient>((resolve, reject) =>
      MongoClient.connect(URL, async (err: Error, client: MongoClient) => {
        if (err) {
          reject(err);
        }
        resolve(client);
      }));
  }

  async getAllTasks() {
    return await this.tasks.find({}).toArray();
  }

  async getOneTask(id: string) {
    return await this.tasks.findOne({ _id: new ObjectId(id)})
  }

  async createTask(task: Task) {
    let res = await this.tasks.insertOne({ 
      task
    });
      return(res.insertedId);
  }

  async deleteTask(id : string) {
    let res = await this.tasks.deleteOne({ _id: new ObjectId(id) });
    
      return  res.deletedCount
  }

  async updateTask(id: any, task: Task){
    let res = await this.tasks.updateOne(
      {_id: new ObjectId(id)},
      { $set: { 
        "task":{
          "description": task.description,
          "isComplete": task.isComplete,
          "dateCompleted": task.dateCompleted
        }
      }},
      {upsert: false});
      return res
  }
  
} 