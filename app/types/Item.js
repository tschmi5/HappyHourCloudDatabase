"use strict";
exports.__esModule = true;
function isValidTask(task) {
    if (task.description === undefined) {
        return false;
    }
    if (task.description.length === 0) {
        return false;
    }
    return true;
}
exports.isValidTask = isValidTask;
