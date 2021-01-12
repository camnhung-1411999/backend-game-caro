import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IHistory, History } from '../models/history.model';
import { IUser, User } from '../models/user.model';
import { Model } from 'mongoose';
import * as moment from 'moment';

@Injectable()
export class HistoryService {
    constructor(
        @InjectModel(History.name)
        private readonly historyModel: Model<IHistory>,

        @InjectModel(User.name)
        private readonly userModel: Model<IUser>,
    ) { }

    async listAll() {
        return this.historyModel.find();
    }
    async create(input: History) {
        const createdDate = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");
        const findWinner = await this.userModel.findOne({
            user: input.winner,
        });
        
        if(findWinner){
            findWinner.totalMatch = findWinner.totalMatch + 1;
            findWinner.cups = findWinner.cups + 1;
            findWinner.wins = findWinner.wins + 1;
        }

        const findLoser = await this.userModel.findOne({
            user: input.loser,
        });
        
        if(findLoser){
            findLoser.totalMatch = findLoser.totalMatch + 1;
            findLoser.cups = findLoser.cups - 1;
        }

        // haven't handle input exist roomid
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

    async findByUsername(input: string) {
        let username = input;
        const histories = await this.historyModel.find({ $or: [{ winner: username }, { loser: username }]});
        return histories;

    }

    async findSingByID(input: string) {
        let _id = input;
        const history = await this.historyModel.findOne({_id});
        return history;

    }

}