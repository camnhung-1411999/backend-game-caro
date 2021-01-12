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
const user_model_1 = require("../models/user.model");
const mongoose_2 = require("mongoose");
const moment = require("moment");
let HistoryService = class HistoryService {
    constructor(historyModel, userModel) {
        this.historyModel = historyModel;
        this.userModel = userModel;
    }
    async listAll() {
        return this.historyModel.find();
    }
    async create(input) {
        const createdDate = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");
        const findWinner = await this.userModel.findOne({
            user: input.winner,
        });
        if (findWinner) {
            findWinner.totalMatch = findWinner.totalMatch + 1;
            findWinner.cups = findWinner.cups + 1;
            findWinner.wins = findWinner.wins + 1;
        }
        const findLoser = await this.userModel.findOne({
            user: input.loser,
        });
        if (findLoser) {
            findLoser.totalMatch = findLoser.totalMatch + 1;
            findLoser.cups = findLoser.cups - 1;
        }
        const createHistory = new this.historyModel({
            roomId: input.roomId,
            result: input.result,
            winner: input.winner,
            loser: input.loser,
            datetime: createdDate,
        });
        await createHistory.save();
        return createHistory;
    }
    async findByUsername(input) {
        let username = input;
        const histories = await this.historyModel.find({ $or: [{ winner: username }, { loser: username }] });
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
    __param(1, mongoose_1.InjectModel(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map