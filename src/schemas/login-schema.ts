import {z} from "zod";

export const SignupSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Correo inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const SigninSchema = z.object({
    email: z.string().email("Correo inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type SignupValues = z.infer<typeof SignupSchema>;
export type SigninValues = z.infer<typeof SigninSchema>;
