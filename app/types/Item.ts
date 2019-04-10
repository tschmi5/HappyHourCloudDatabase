export interface Item {
    description: string;
    dateCreated: string;
    isComplete: boolean;
    dateCompleted: string;
}
export function isValidItem(item: Item){
    if(item.description === undefined){
        return false;
    }
    if(item.description.length === 0){
        return false;
    }
    return true;    
}         


      
    
  