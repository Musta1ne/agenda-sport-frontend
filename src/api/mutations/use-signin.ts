import {useMutation} from "react-query";

import {useAuth} from "@/store/auth-store";

type SigninData = {
    email: string;
    password: string;
};

export const useSignin = () => {
    const {setToken, setUserId} = useAuth();

    return useMutation(async (data: SigninData) => {
        const response = await fetch("http://localhost:3000/api/v1/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error en el inicio de sesión");
        }

        setToken(result.token);
        setUserId(result.userId);

        return result;
    });
};
