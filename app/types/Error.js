"use strict";
exports.__esModule = true;
function invalidDescription(item) {
    var err;
    err = {
        parameter: "Description",
        parameterValue: item.description || "undefined",
        errorText: ""
    };
    if (item.description === undefined) {
        err.errorText = "No Description Parameter Included";
    }
    else {
        err.errorText = "Description Empty";
    }
    return err;
}
exports.invalidDescription = invalidDescription;
function noSuchItem(id) {
    return {
        parameter: "Id",
        parameterValue: id || "",
        errorText: "No Item exists with given Id"
    };
}
exports.noSuchItem = noSuchItem;
function noChange(id) {
    return {
        parameter: "Id",
        parameterValue: id || "",
        errorText: "Identical Object: No Changes Made"
    };
}
exports.noChange = noChange;
