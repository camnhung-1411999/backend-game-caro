import { IRoom, Room } from '../models/room.model';
import { Model } from 'mongoose';
export declare class RoomService {
    private readonly roomModel;
    constructor(roomModel: Model<IRoom>);
    list(): Promise<IRoom[]>;
    getRoom(id: string): Promise<IRoom>;
    create(input: Room): Promise<IRoom>;
    join(input: any): Promise<IRoom>;
    outRoom(input: any): Promise<IRoom>;
}
