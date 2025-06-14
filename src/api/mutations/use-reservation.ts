import {useMutation} from "react-query";

type ReserveFieldInput = {
    date: string;
    startTime: string;
    id_user: number;
    id_field: string;
};

export const useReserveField = () => {
    return useMutation(
        async (reservation: ReserveFieldInput) => {
            const response = await fetch(`http://localhost:3000/api/v1/reservation/${reservation.id_field}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservation),
            });

            if (!response.ok) {
                throw new Error("Error al realizar la reserva");
            }

            return response.json();
        },
        {
            onSuccess: () => {
                alert("Reserva confirmada");
            },
            onError: (error: any) => {
                alert(error.message);
            },
        },
    );
};
