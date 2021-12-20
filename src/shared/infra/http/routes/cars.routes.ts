import { CreateCarController } from './../../../../modules/cars/useCases/createCar/CreateCarController';
import { Router } from "express";
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { ensureAdmin } from '../middlewares/ensureAdmin';


const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", ensureAuthenticate, ensureAdmin, createCarController.handle);


export { carsRoutes }