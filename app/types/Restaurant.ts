import { Item } from './Item';

export interface Restaurant {
    name: String,
    happyHourStart: Number,
    happyHourEnd: Number,
    price: String,
    rating: Number,
    address: String,
    menu: Item[]
}