"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=Task.js.map