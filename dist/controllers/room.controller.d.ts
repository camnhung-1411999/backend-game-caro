import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';
export declare class RoomController {
    private readonly appService;
    constructor(appService: RoomService);
    list(): any;
    getRoom(idroom: string): any;
    create(req: any): Promise<Room>;
    join(idroom: string, req: any): Promise<any>;
    out(idroom: string, req: any): Promise<any>;
}
