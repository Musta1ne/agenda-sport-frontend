import {useMutation} from "react-query";

type SignupData = {
    name: string;
    email: string;
    password: string;
};

export const useSignup = () => {
    return useMutation(async (data: SignupData) => {
        const response = await fetch("http://localhost:3000/api/v1/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Error en el registro");
        }

        return response.json();
    });
};
