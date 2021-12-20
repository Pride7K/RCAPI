import { container } from 'tsyringe';
import { Router } from "express";
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { ensureAdmin } from '../middlewares/ensureAdmin';


const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post("/",ensureAuthenticate,ensureAdmin, createSpecificationController.handle);

export { specificationRoutes };