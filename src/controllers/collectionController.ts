import { Request, Response } from "express";
import { ICollectionController } from "../interfaces/collection/ICollectionController";
import { ICollectionservice } from "../interfaces/collection/ICollectionService";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export class CollectionController implements ICollectionController {
  constructor(private collectionService: ICollectionservice) { };

  // async createCollectionRequest(req: Request, res: Response): Promise<void> {
  //   try {

  //     const userId = req.headers['x-user-id'];
  //     const collectionData = { ...req.body, userId };

  //     console.log("collectionData", collectionData);

  //     const collection = await this.collectionService.createCollectionRequest(collectionData);

  //     if (!collection) {
  //       res.status(HTTP_STATUS.NOT_FOUND).json({
  //         success: false,
  //         message: MESSAGES.CATEGORY_NOT_FOUND,
  //       });
  //       return;
  //     }

  //     res.status(HTTP_STATUS.OK).json({
  //       success: true,
  //       data: collection
  //     });

  //   } catch (error: any) {
  //     console.error("Error during login:", error);
  //     res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
  //   }
  // }

  async getCollectionHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.headers['x-user-id'];
      const collectionHistories = await this.collectionService.getCollectionHistory(userId as string);
      res.status(HTTP_STATUS.OK).json({ success: true, data: collectionHistories });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  }

  async getCollectionHistories(req: Request, res: Response): Promise<void> {
    try {
      const collectionHistories = await this.collectionService.getCollectionHistories();
      res.status(HTTP_STATUS.OK).json({ success: true, data: collectionHistories });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  }

  async getAvailableCollectors(req: Request, res: Response): Promise<void> {
    try {
      const { serviceAreaId } = req.params;
      const { success, collectors } = await this.collectionService.getAvailableCollectors(serviceAreaId);

      res.status(HTTP_STATUS.OK).json({
        success,
        collectors
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  }

  async getPendingRequests(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.collectionService.processPendingRequests();
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: response
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  }

  async assignRequests(req: Request, res: Response): Promise<void> {
    try {
      await this.collectionService.processPendingRequests();
      res.status(200).json({ message: "Requests processed successfully" });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  }

  async getAssignedCollections(req: Request, res: Response): Promise<void> {
    try {
      const collectorId = req.headers['x-user-id'];

      const assignedCollections = await this.collectionService.getAssignedCollections(collectorId as string);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        collections: assignedCollections
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  }

}