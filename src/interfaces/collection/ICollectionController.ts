import { Request, Response } from "express";

export interface ICollectionController{
    getCollectionHistory(req:Request,res:Response):Promise<void>;
    getCollectionHistories(req:Request,res:Response):Promise<void>;
    getAvailableCollectors(req:Request,res:Response):Promise<void>;
    getAssignedCollections(req:Request,res:Response):Promise<void>;
    completeCollection(req:Request,res:Response):Promise<void>;
    cancelCollection(req:Request,res:Response):Promise<void>;
}