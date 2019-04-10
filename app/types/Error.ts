import { Item } from './Item'


export interface Error {
    parameter : string,
    parameterValue : string,
    errorText : string
}
export function invalidDescription(item: Item){
    let err :Error;
    err = {
        parameter: "Description",
        parameterValue : item.description || "undefined",
        errorText : ""
    }
    if(item.description === undefined){
        err.errorText = "No Description Parameter Included";
    } else {
        err.errorText = "Description Empty";
    }   
    return err;
  }
  export function noSuchItem(id: any){
    return {
        parameter: "Id",
        parameterValue : id || "",
        errorText : "No Item exists with given Id"
    }
  }
  export function noChange(id: any){
    return {
        parameter: "Id",
        parameterValue : id || "",
        errorText : "Identical Object: No Changes Made"
    }
}