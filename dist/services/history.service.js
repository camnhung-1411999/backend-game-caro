"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const history_model_1 = require("../models/history.model");
const mongoose_2 = require("mongoose");
const moment = require("moment");
let HistoryService = class HistoryService {
    constructor(historyModel) {
        this.historyModel = historyModel;
    }
    async listAll() {
        return this.historyModel.find();
    }
    async create(input) {
        const createdDate = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");
        console.log('create history data', input);
        const createHistory = new this.historyModel({
            roomId: input.roomId,
            result: input.result,
            winner: input.winner,
            loser: input.loser,
            datetime: createdDate,
            chat: input.chat,
        });
        await createHistory.save();
        return createHistory;
    }
    async findByUsername(input) {
        let username = input;
        const histories = await this.historyModel.find({ $or: [{ winner: username }, { loser: username }] });
        console.log(histories);
        return histories;
    }
    async findSingByID(input) {
        let _id = input;
        const history = await this.historyModel.findOne({ _id });
        return history;
    }
};
HistoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(history_model_1.History.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map