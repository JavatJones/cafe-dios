import * as z from "zod";



//id
export const signin = z.object({
    email: z.string(),
    password: z.string(),
});
