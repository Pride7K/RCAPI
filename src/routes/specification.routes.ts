import { Router } from "express";
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';


const specificationRoutes = Router();

specificationRoutes.post("/",(req,resp)=>{
    return createSpecificationController.handle(req,resp);
})

export {specificationRoutes};