import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {Button} from "./ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {Input} from "./ui/input";

import {SignupSchema, SignupValues} from "@/schemas/login-schema";
import {useSignup} from "@/api/mutations/use-signup";

import { useNavigate } from "react-router-dom";

export function SignUpForm() {
    const navigate = useNavigate();
    const signupForm = useForm<SignupValues>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const {mutate} = useSignup();

    const onSubmit = (data: SignupValues) => {
        mutate(data, {
            onSuccess: () => {
                navigate("/fields");
            },
            onError: (error: any) => {
                alert(`Error: ${error.message}`);
            },
        });
    };

    return (
        <Form {...signupForm}>
            <form className="flex flex-col w-full" onSubmit={signupForm.handleSubmit(onSubmit)}>
                <FormField
                    control={signupForm.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese su nombre" {...field} />
                            </FormControl>
                            <div className="h-[20px]">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={signupForm.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese su correo" type="email" {...field} />
                            </FormControl>
                            <div className="h-[20px]">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={signupForm.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese su contraseña" type="password" {...field} />
                            </FormControl>
                            <div className="h-[20px]">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button className="mt-2" type="submit">
                    Registrarse
                </Button>
            </form>
        </Form>
    );
}
