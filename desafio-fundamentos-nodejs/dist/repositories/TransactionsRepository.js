"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var _a = this.transactions.reduce(function (accumulator, transaction) {
            if (transaction.type == "income")
                accumulator.income += transaction.value;
            else if (transaction.type == "outcome")
                accumulator.outcome += transaction.value;
            return accumulator;
        }, {
            income: 0,
            outcome: 0,
            total: 0
        }), income = _a.income, outcome = _a.outcome;
        var total = income - outcome;
        return { income: income, outcome: outcome, total: total };
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        var transaction = new Transaction_1.default({
            title: title,
            value: value,
            type: type
        });
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
