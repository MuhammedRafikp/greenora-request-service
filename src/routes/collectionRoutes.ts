import { Router } from "express";
import { CollectionController } from "../controllers/collectionController";
import { CollectionService } from "../services/collectionService";
import collectionRepository from "../repositories/collectionRepository";
import categoryRepository from "../repositories/categoryRepository";
import redisRepository from "../repositories/redisRepository";
import multer from 'multer';
const collectionService = new CollectionService(collectionRepository, categoryRepository, redisRepository);
const collectionController = new CollectionController(collectionService);

const router = Router();


// router.post('/', collectionController.createCollectionRequest.bind(collectionController));
router.get('/', collectionController.getCollectionHistory.bind(collectionController));
router.get('/collections', collectionController.getCollectionHistories.bind(collectionController));
router.get('/available-collectors/:serviceAreaId', collectionController.getAvailableCollectors.bind(collectionController));
router.get('/collector/assigned-collections',collectionController.getAssignedCollections.bind(collectionController));
router.post('/:collectionId', collectionController.completeCollection.bind(collectionController));
router.patch('/cancel',collectionController.cancelCollection.bind(collectionController));

export default router;