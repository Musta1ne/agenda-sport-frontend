import {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import {Button} from "../ui/button";

import {useGetField} from "@/api/queries/use-fields";

export function FieldDetail() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {data: fieldData, isLoading} = useGetField(id);

    useEffect(() => {
        if (!id) {
            navigate("/not-found");
        }
    }, []); // eslint-disable-line

    if (isLoading) {
        return <div className="text-xl text-center text-gray-600">Cargando...</div>;
    }

    if (!fieldData) {
        return <div className="text-xl text-center text-gray-600">Cancha no encontrada</div>;
    }

    return (
        <div className="flex justify-center w-full gap-10">
            {fieldData.photo === "" ? (
                <img alt={fieldData.name} className="rounded-lg shadow-md max-w-96" src="/no-image.webp" width={384} />
            ) : (
                <img
                    alt={fieldData.name}
                    className="rounded-lg shadow-md max-w-96"
                    src={`/images/${fieldData.photo}`}
                    width={384}
                />
            )}
            <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                    <span className="text-3xl font-bold">{fieldData.name}</span>
                    <p className="text-gray-700">{fieldData.description}</p>
                    <span className="text-sm text-gray-700">{fieldData.direction}</span>
                </div>
                <div className="flex justify-end gap-4">
                    <Button variant={"ghost"} onClick={() => navigate(-1)}>
                        Volver
                    </Button>
                    <Button asChild className="bg-green-500 hover:bg-green-500/90">
                        <Link to={`/reservation/${id}`}>Reservar</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
