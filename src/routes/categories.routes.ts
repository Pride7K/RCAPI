import { container } from 'tsyringe';
import { CreateCategoryController } from './../modules/cars/useCases/createCategory/CreateCategoryController';
import { Router } from "express"
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";
import multer from "multer"
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';

const upload = multer({
    dest: "./tmp"
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();


categoriesRoutes.post("/",
    createCategoryController.handle)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post("/import",
    upload.single("file"),
    importCategoryController.handle)

export { categoriesRoutes }