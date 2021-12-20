import { container } from 'tsyringe';
import { Router } from "express"
import multer from "multer"
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const upload = multer({
    dest: "./tmp"
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();


categoriesRoutes.post("/",
    ensureAuthenticate,
    ensureAdmin,
    createCategoryController.handle)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post("/import",
    upload.single("file"),
    ensureAuthenticate,
    ensureAdmin,
    importCategoryController.handle)

export { categoriesRoutes }