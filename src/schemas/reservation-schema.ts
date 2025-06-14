import {z} from "zod";

export const ReservationSchema = z.object({
    date: z.date({message: "Por favor, selecciona una fecha"}),
    time: z.string({
        message: "Por favor, selecciona un horario",
    }),
});

export type ReservationValues = z.infer<typeof ReservationSchema>;
