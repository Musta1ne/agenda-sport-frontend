import {Calendar, Clock, MapPin, Search, Star, Users} from "lucide-react";
import {Link} from "react-router-dom";

import {Footer} from "../layout/footer";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export function Home() {
    return (
        <div className="w-full">
            <section className="h-screen bg-[url('https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2070')] bg-center bg-cover shadow-[inset_0_100vh_0_rgba(0,0,0,0.4)]">
                <div className="container flex items-center h-full px-4 mx-auto">
                    <div className="max-w-xl">
                        <h1 className="mb-6 font-bold text-transparent text-7xl md:text-8xl bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text">
                            FÚTBOLYA
                        </h1>
                        <p className="mb-8 text-xl text-white">
                            Reservá tu cancha de fútbol en segundos. La manera más fácil de organizar tu partido.
                        </p>
                        <div className="flex gap-4">
                            <Button size="lg">
                                <Link to="/login">Reservar Ahora</Link>
                            </Button>
                            <Button size="lg" variant="secondary">
                                <Link to="/login">Ver Canchas</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <h2 className="mb-12 text-4xl font-bold text-center">¿Por qué elegir FÚTBOLYA?</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <FeatureCard
                            description="Confirmá tu cancha en segundos, sin llamadas ni esperas"
                            icon={<Clock className="w-12 h-12 text-yellow-500" />}
                            title="Reserva Instantánea"
                        />
                        <FeatureCard
                            description="Encontrá las mejores canchas en tu zona"
                            icon={<MapPin className="w-12 h-12 text-yellow-500" />}
                            title="Canchas Cercanas"
                        />
                        <FeatureCard
                            description="Consultá horarios disponibles actualizados"
                            icon={<Calendar className="w-12 h-12 text-yellow-500" />}
                            title="Disponibilidad en Tiempo Real"
                        />
                    </div>
                </div>
            </section>

            {/* Popular Fields Section */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 mx-auto">
                    <h2 className="mb-12 text-4xl font-bold text-center">Canchas Destacadas</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <FieldCard
                            image="https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2070"
                            location="Palermo"
                            name="La Bombonera"
                            rating={4.8}
                        />
                        <FieldCard
                            image="https://images.unsplash.com/photo-1536122985607-4fe00b283652?q=80&w=2069"
                            location="Núñez"
                            name="El Monumental"
                            rating={4.9}
                        />
                        <FieldCard
                            image="https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=2070"
                            location="Belgrano"
                            name="La Catedral"
                            rating={4.7}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-yellow-500">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="mb-6 text-4xl font-bold text-white">¿Listo para jugar?</h2>
                    <p className="mb-8 text-xl text-white">Unite a miles de jugadores que ya reservan con FÚTBOLYA</p>
                    <Button className="text-yellow-500 bg-white hover:bg-gray-100" size="lg">
                        <Search className="w-4 h-4 mr-2" /> Buscar Canchas
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function FeatureCard({icon, title, description}: {icon: React.ReactNode; title: string; description: string}) {
    return (
        <Card className="text-center">
            <CardHeader>
                <div className="mx-auto mb-4">{icon}</div>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{description}</CardDescription>
            </CardContent>
        </Card>
    );
}

function FieldCard({image, name, location, rating}: {image: string; name: string; location: string; rating: number}) {
    return (
        <Card className="overflow-hidden">
            <img alt={name} className="object-cover w-full h-48" src={image} />
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                    <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> {location}
                    </span>
                    <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" /> {rating}
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-1" /> 5 vs 5
                    </div>
                    <Button>Ver Disponibilidad</Button>
                </div>
            </CardContent>
        </Card>
    );
}
