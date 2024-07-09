import * as z from "zod";


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

//Create Category
export const CreateCategorySchema = z.object({
    name: z.string().min(1, "Escribe un nombre"),
});

//Delete Category

export const DeleteCategorySchema = z.object({
    id: z.string()

});


//Update Category
export const UpdateCategorySchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Asigna un nombre para esta categoria"),

});

//Create SubCategory
export const CreateSubCategorySchema = z.object({
    name: z.string().min(1, "Asigna un nombre para esta categoria"),
    category_id: z.string().min(1, "Seleeciona una categoria"),
});

//Delete SubCategory
export const DeleteSubCategorySchema = z.object({
    id: z.string()

});

//Update SubCategory
export const UpdateSubCategorySchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Asigna un nombre para esta categoria"),
    category_id: z.string().min(1, "Seleeciona una categoria"),
});


//Create Product
export const CreateProductSchema = z.object({
    name: z.string({ message: "Escribe un nombre para este producto" }).min(1, "Asigna un nombre para esta categoria"),
    price: z.coerce.number({ message: "Ingresa un precio" }).nonnegative("No puede ser negativo").default(0),
    description: z.string().optional(),
    category_id: z.string().min(1, "Seleeciona una categoria"),
});

//Delete Product
export const DeleteProductSchema = z.object({
    id: z.string()

});

//Update Product
export const UpdateProductSchema = z.object({
    id: z.string(),
    name: z.string({ message: "Escribe un nombre para este producto" }).min(1, "Asigna un nombre para esta categoria"),
    price: z.coerce.number({ message: "Ingresa un precio" }).nonnegative("No puede ser negativo").default(0),
    description: z.string().optional(),
    category_id: z.string().min(1, "Seleeciona una categoria"),
});
