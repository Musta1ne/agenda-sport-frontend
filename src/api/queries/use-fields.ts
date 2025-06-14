import {useQuery, useQueryClient} from "react-query";
import {useNavigate} from "react-router-dom";

export const useGetFields = () => {
    const queryClient = useQueryClient();

    return useQuery<Fields[]>({
        queryKey: "fields",
        staleTime: Infinity,
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/api/v1/fields");

            if (!response.ok) {
                throw new Error("Error al obtener los campos");
            }

            const data = await response.json();

            return data;
        },
        onSuccess(data: any) {
            queryClient.setQueryData("fields", data);
        },
        onError(error: any) {
            console.error("Error al obtener los campos:", error);
        },
    });
};

export const useGetField = (id?: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useQuery<Fields>(
        ["field", id],
        async () => {
            const response = await fetch(`http://localhost:3000/api/v1/field/${id}`);

            if (!response.ok) {
                throw new Error("Error al obtener los datos de la cancha");
            }

            return response.json();
        },
        {
            retry: 1,
            enabled: Boolean(id),
            staleTime: Infinity,
            onSuccess(data: any) {
                queryClient.setQueryData(["field", id], data);
            },
            onError(error: any) {
                console.error("Error al obtener la cancha:", error);
                navigate("/not-found");
            },
        },
    );
};
