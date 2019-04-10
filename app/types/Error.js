"use strict";
exports.__esModule = true;
function invalidDescription(task) {
    var err;
    err = {
        parameter: "Description",
        parameterValue: task.description || "undefined",
        errorText: ""
    };
    if (task.description === undefined) {
        err.errorText = "No Description Parameter Included";
    }
    else {
        err.errorText = "Description Empty";
    }
    return err;
}
exports.invalidDescription = invalidDescription;
function noSuchTask(id) {
    return {
        parameter: "Id",
        parameterValue: id || "",
        errorText: "No Task exists with given Id"
    };
}
exports.noSuchTask = noSuchTask;
function noChange(id) {
    return {
        parameter: "Id",
        parameterValue: id || "",
        errorText: "Identical Object: No Changes Made"
    };
}
exports.noChange = noChange;
