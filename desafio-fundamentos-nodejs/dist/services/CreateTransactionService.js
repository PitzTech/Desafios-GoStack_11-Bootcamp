"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        if (!["income", "outcome"].includes(type))
            throw new Error("Invalid Transaction Type");
        var total = this.transactionsRepository.getBalance().total;
        if (type == "outcome" && total < value)
            throw new Error("You don't have enought balance!");
        var transaction = this.transactionsRepository.create({
            title: title,
            value: value,
            type: type
        });
        return transaction;
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
