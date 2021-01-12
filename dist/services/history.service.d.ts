import { IHistory, History } from '../models/history.model';
import { IUser } from '../models/user.model';
import { Model } from 'mongoose';
export declare class HistoryService {
    private readonly historyModel;
    private readonly userModel;
    constructor(historyModel: Model<IHistory>, userModel: Model<IUser>);
    listAll(): Promise<IHistory[]>;
    create(input: History): Promise<IHistory>;
    findByUsername(input: string): Promise<IHistory[]>;
    findSingByID(input: string): Promise<IHistory>;
}
