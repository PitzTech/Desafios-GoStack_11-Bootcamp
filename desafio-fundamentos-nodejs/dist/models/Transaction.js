"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Transaction = /** @class */ (function () {
    function Transaction(_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        this.id = uuid_1.v4();
        this.title = title;
        this.value = value;
        this.type = type;
    }
    return Transaction;
}());
exports.default = Transaction;
