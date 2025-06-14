import {Link} from "react-router-dom";

import {useGetFields} from "@/api/queries/use-fields";

export function Fields() {
    const {data: fieldsData, isLoading} = useGetFields();

    if (isLoading) {
        return <div className="text-xl text-center text-gray-600">Cargando...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="pb-8 text-4xl font-extrabold">Canchas disponibles</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {fieldsData?.map((field, index) => (
                    <Link
                        key={index}
                        className="flex flex-col p-4 space-y-2 transition-all duration-200 rounded-lg hover:shadow-lg"
                        to={`/field-detail/${field.id}`}
                    >
                        <span className="text-xl font-semibold text-gray-900">{field.name}</span>
                        {field.photo === "" ? (
                            <img
                                alt={field.name}
                                className="h-auto max-w-full rounded-lg shadow-md"
                                src="/no-image.webp"
                            />
                        ) : (
                            <img
                                alt={field.name}
                                className="h-auto max-w-full rounded-lg shadow-md"
                                src={`/images/${field.photo}`}
                            />
                        )}
                        <p className="text-sm text-gray-600">{field.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
