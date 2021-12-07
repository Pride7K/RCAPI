import csvParser from "csv-parser"
import fs from "fs";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

export class ImportCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) {

    }


    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);

            const parseFile = csvParser({

            });

            stream.pipe(parseFile)

            const categories: IImportCategory[] = [];

            parseFile.on("data", async (line) => {
                var { name, description } = line;
                categories.push({
                    name, description
                })
            }).on("end", () => {
                fs.promises.unlink(file.path)
                return resolve(categories)
            })
                .on("error", (error) => {
                    return reject(error)
                })
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(category => {
            const { name, description } = category
            const existCategory = this.categoriesRepository.findByName(name);
            if (!existCategory) {
                this.categoriesRepository.create({
                    name, description
                })
            }
        })
    }
}