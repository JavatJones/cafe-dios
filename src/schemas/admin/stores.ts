import * as z from "zod";


//Create Category
export const CreateStoreSchema = z.object({
    name: z.string({ required_error: 'Requerido' }).min(1, "Requerido"),
    address: z.string({ required_error: 'Requerido' }).min(1, "Requerido"),
    url: z.string({ required_error: 'Requerido' }).min(1, "Requerido"),

});


//Edit Category
export const EditStoreSchema = z.object({
    id: z.string(),
    name: z.string({ required_error: 'Requerido' }).min(1, "Requerido"),
    address: z.string({ required_error: 'Requerido' }).min(1, "Requerido"),
    url: z.string({ required_error: 'Requerido' }).min(1, "Requerido"),

});

//Delete Category
export const DeleteStoreSchema = z.object({
    id: z.string({ required_error: 'Requerido' })
});