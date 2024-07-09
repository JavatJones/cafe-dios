import * as z from "zod";

//Create Category
export const CreatePostSchema = z.object({
    title: z.string({ required_error: 'Requerido' }).min(1, "Requerido"),
    content: z.string({ required_error: 'Requerido' }).min(1, "Requerido"),
  
});


//Update Category
export const UpdatePostSchema = z.object({
    id: z.string(),
    title: z.string({ required_error: 'Requerido' }).min(1, "Requerido"),
    content: z.string({ required_error: 'Requerido' }).min(1, "Requerido"),
});

