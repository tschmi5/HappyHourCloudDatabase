import { Collection, MongoClient, ObjectId } from 'mongodb';
import { Item } from './types/Item'
import * as dotenv from 'dotenv';
dotenv.config();
const URL = process.env.MONGO_CONNECTION || '';

export class ItemsData {
  items: Collection;

  constructor(client: MongoClient) {
    this.items = client.db().collection('items');
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

  async getAllItems() {
    return await this.items.find({}).toArray();
  }

  async getOneItem(id: string) {
    return await this.items.findOne({ _id: new ObjectId(id)})
  }
  async getByName(name: String){
    return await this.items.findOne({ name: name })
  }
  async getByType(type: String){
    return await this.items.find({ type: type }).toArray();
  }
  async createItem(item: Item) {
    let res = await this.items.insertOne({ 
      item: item
    });
      return(res.insertedId);
  }

  async deleteItem(id : string) {
    let res = await this.items.deleteOne({ _id: new ObjectId(id) });
    
      return  res.deletedCount
  }

  async updateItem(id: any, item: Item){
    let res = await this.items.updateOne(
      {_id: new ObjectId(id)},
      { $set: { 
        "item":{
          "description": item.description,
          "isComplete": item.isComplete,
          "dateCompleted": item.dateCompleted
        }
      }},
      {upsert: false});
      return res
  }
  
} 