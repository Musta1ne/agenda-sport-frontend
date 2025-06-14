import {Facebook, Instagram, MapPin, Phone, Twitter} from "lucide-react";

export function Footer() {
    return (
        <footer className="py-12 text-white bg-gray-900">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-xl font-bold">FÚTBOLYA</h3>
                        <p className="text-gray-400">La mejor forma de reservar tu cancha de fútbol.</p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-lg font-semibold">Enlaces</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-400 cursor-pointer hover:text-white">Sobre Nosotros</li>
                            <li className="text-gray-400 cursor-pointer hover:text-white">Contacto</li>
                            <li className="text-gray-400 cursor-pointer hover:text-white">Términos y Condiciones</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-lg font-semibold">Contacto</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center text-gray-400">
                                <Phone className="w-4 h-4 mr-2" /> +54 3564 575274
                            </li>
                            <li className="flex items-center text-gray-400">
                                <MapPin className="w-4 h-4 mr-2" /> San Francisco, Córdoba
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-lg font-semibold">Seguinos</h4>
                        <div className="flex space-x-4 text-gray-400">
                            <Facebook className="cursor-pointer hover:text-white" />
                            <Instagram className="cursor-pointer hover:text-white" />
                            <Twitter className="cursor-pointer hover:text-white" />
                        </div>
                    </div>
                </div>
                <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-800">
                    <p>&copy; 2024 FÚTBOLYA. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
