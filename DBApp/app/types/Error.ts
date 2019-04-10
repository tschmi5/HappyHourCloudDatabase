import { Task } from './Task'


export interface Error {
    parameter : string,
    parameterValue : string,
    errorText : string
}
export function invalidDescription(task: Task){
    let err :Error;
    err = {
        parameter: "Description",
        parameterValue : task.description || "undefined",
        errorText : ""
    }
    if(task.description === undefined){
        err.errorText = "No Description Parameter Included";
    } else {
        err.errorText = "Description Empty";
    }   
    return err;
  }
  export function noSuchTask(id: any){
    return {
        parameter: "Id",
        parameterValue : id || "",
        errorText : "No Task exists with given Id"
    }
  }
  export function noChange(id: any){
    return {
        parameter: "Id",
        parameterValue : id || "",
        errorText : "Identical Object: No Changes Made"
    }
}