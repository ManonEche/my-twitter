// import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import Button from "../components/Button/Button";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
// import { toast } from 'sonner';

export default function Thread() {

    return (
        <>
            <div className="bg-glass min-h-screen">
                <Header />
                <Nav />
                <div className="min-h-screen">
                    <div className="flex justify-center pt-5 w-full">
                        <div>
                            <form className="inputPost h-full">
                                {/* Zone de texte */}
                                <textarea className="bg-transparent border-none outline-none resize-none" placeholder=" Quoi de neuf ?" rows={3} />
                                {/* Bouton */}
                                <div className="flex justify-end pe-5">
                                    <Button>Publier</Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Posts des abonnées */}
                    <div className="flex justify-center">
                        <div className="backPost">
                            <div className="flex flex-row gap-4 items-center">
                                <div className="flex gap-2 items-center">
                                    <CircleUserRound />
                                    <strong className="text-lg">Pseudo</strong>
                                </div>
                                <p className="text-md">20 Fév. 2024</p>
                            </div>
                            <p className="pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                <br />
                                <br />Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="backPost">
                            <div className="flex flex-row gap-4 items-center">
                                <div className="flex gap-2 items-center">
                                    <CircleUserRound />
                                    <strong className="text-lg">Pseudo</strong>
                                </div>
                                <p className="text-md">20 Fév. 2024</p>
                            </div>
                            <p className="pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                <br />
                                <br />Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="backPost rounded-b-md">
                            <div className="flex flex-row gap-4 items-center">
                                <div className="flex gap-2 items-center">
                                    <CircleUserRound />
                                    <strong className="text-lg">Pseudo</strong>
                                </div>
                                <p className="text-md">20 Fév. 2024</p>
                            </div>
                            <p className="pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                <br />
                                <br />Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-glass mt-5">
                    <Footer />
                </div>
            </div>
        </>
    )
}