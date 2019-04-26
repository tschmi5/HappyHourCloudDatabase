import {Item} from './Item';

export interface Restaurant {
    name: String,
    price: String,
    rating: Number,
    address: String,
    menuItems: Item[]
}