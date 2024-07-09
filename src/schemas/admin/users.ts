import * as z from "zod";


export const LoginSchema = z.object({
    email: z.string().email("Email invalido"),
    password: z.string().min(1, { message: "La contraseña es requerida" }),
});

// La contraseña debe tener mínimo 10 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial Ej ! . @ # $ % & * ^
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{10,}$/
);

//Create user
export const CreateUserSchema = z.object({
    name: z.string({ message: "Escribe un nombre para este usuario" }).min(1, "Asigna un nombre para este usuario"),
    email: z.string({ message: "Escribe un nombre para este usuario" }).min(1, "Asigna un nombre para este usuario"),
    password: z.string().min(1, { message: 'Ingresa una contraseña' }).regex(passwordValidation, { message: 'La contraseña debe tener mínimo 10 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial Ej ! @ # $ % & * ^' }),
    role: z.string().min(1, "Seleeciona una categoria"),
});

//update user
export const UpdateUserSchema = z.object({
    id: z.string(),
    User_id: z.string(),
    name: z.string({ message: "Escribe un nombre para este usuario" }).min(1, "Asigna un nombre para este usuario"),
    role: z.string().min(1, "Seleeciona una categoria"),
});


export const DeleteUserSchema = z.object({
    id: z.string(),
});

export const ResetPasswordSchema = z.object({
    id: z.string(),
    password: z.string().min(1, { message: 'Ingresa una contraseña' }).regex(passwordValidation, { message: 'La contraseña debe tener mínimo 10 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial Ej . ! @ # $ % & * ^' }),
    passwordConfirm: z.string(),
}).refine((data) => {
    return data.password === data.passwordConfirm
}, {
    message: "Las contraseñas no coinciden!",
    path: ["passwordConfirm"]
})