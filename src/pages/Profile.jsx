import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Username from "../components/Username/Username";
import Nav from "../components/Nav/Nav";
// import { toast } from 'sonner';

export default function Profile() {

    return (
        <>
            <div className="bg-glass min-h-screen">
                <Header />
                <Nav />
                <div>
                    <div className="flex justify-center pt-5">
                        <div className="profileBack">
                            <div className="flex justify-between items-center py-4">
                                <div className="flex gap-2 items-center">
                                    <CircleUserRound />
                                    <strong className="text-lg">
                                        <Username />
                                    </strong>
                                </div>
                                <div className="flex gap-3">
                                    <Link to="/followers">
                                        <Button>Followers</Button>
                                    </Link>
                                    <Link to="/suivis">
                                        <Button>Suivi(e)s</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Posts du profil */}
                    <div className="flex justify-center text-lg font-bold">
                        <p className="titleProfile bg-white">Posts</p>
                    </div>

                    <div className="flex justify-center">

                        <div className="backPost">
                            <div className="flex flex-row gap-4 items-center">
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