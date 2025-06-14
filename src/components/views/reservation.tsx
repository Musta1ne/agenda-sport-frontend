import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {es} from "date-fns/locale";
import {CalendarIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";

import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {ReservationSchema, ReservationValues} from "@/schemas/reservation-schema";
import {useReserveField} from "@/api/mutations/use-reservation";
import {useAuth} from "@/store/auth-store";
import {useGetField} from "@/api/queries/use-fields";

export function Reservation() {
    const reservationForm = useForm<ReservationValues>({
        resolver: zodResolver(ReservationSchema),
        defaultValues: {
            date: undefined,
            time: undefined,
        },
    });

    const navigate = useNavigate();
    const {id} = useParams();
    const {userId} = useAuth();
    const {data: fieldData} = useGetField(id);
    const {mutate: reserveField} = useReserveField();

    const onSubmit = (data: ReservationValues) => {
        if (!id) {
            alert("ID del campo no encontrado.");

            return;
        }

        if (!userId) {
            alert("Usuario no encontrado.");

            return;
        }

        const reservationData = {
            date: format(data.date, "yyyy-MM-dd"),
            startTime: data.time,
            id_user: Number(userId),
            id_field: id,
        };

        reserveField(reservationData);
    };

    const availableTimes = ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="pb-8 text-4xl font-extrabold">Reservar</h2>
            {fieldData ? (
                <div className="space-y-1">
                    <span className="text-xl font-semibold">{fieldData.name}</span>
                    <p className="text-sm">{fieldData.description}</p>
                    <p className="text-xs text-gray-600">{fieldData.direction}</p>
                </div>
            ) : (
                <div className="text-xl text-center text-gray-600">Cargando...</div>
            )}

            <hr className="w-full my-4" />

            <Form {...reservationForm}>
                <form className="flex flex-col w-fit" onSubmit={reservationForm.handleSubmit(onSubmit)}>
                    <FormField
                        control={reservationForm.control}
                        name="date"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="mb-1">Fecha</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground",
                                                )}
                                                variant={"outline"}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP", {locale: es})
                                                ) : (
                                                    <span>Selecciona una fecha</span>
                                                )}
                                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent align="start" className="w-auto p-0">
                                        <Calendar
                                            initialFocus
                                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                            locale={es}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <div className="h-[20px]">
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={reservationForm.control}
                        name="time"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Hora</FormLabel>
                                <Select defaultValue={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={
                                                    field.value ? field.value : <span>Selecciona una hora</span>
                                                }
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {availableTimes.map((time) => (
                                            <SelectItem key={time} value={time}>
                                                {time}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div className="h-[20px]">
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button className="mt-1" type="submit">
                        Reservar
                    </Button>
                    <Button className="mt-1" type="button" variant={"ghost"} onClick={() => navigate(-1)}>
                        Volver
                    </Button>
                </form>
            </Form>
        </div>
    );
}
