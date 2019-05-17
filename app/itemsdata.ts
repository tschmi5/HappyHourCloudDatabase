import { Collection, MongoClient, ObjectId } from 'mongodb';
import { Item } from './types/Item'
import * as dotenv from 'dotenv';
import { Restaurant } from './types/Restaurant';
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
    return await this.items.findOne({ _id: new ObjectId(id) })
  }
  async getByName(name: String) {
    return await this.items.findOne({ name: name })
  }
  async getByType(type: String) {
    return await this.items.find({ type: type }).toArray();
  }
  async createItem(item: Restaurant) {
    let res = await this.items.insertOne({
      item: item
    });
    return (res.insertedId);
  }



} 