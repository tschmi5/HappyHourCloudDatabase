export interface Task {
    description: string;
    dateCreated: string;
    isComplete: boolean;
    dateCompleted: string;
}
export function isValidTask(task: Task){
    if(task.description === undefined){
        return false;
    }
    if(task.description.length === 0){
        return false;
    }
    return true;    
}         


      
    
  