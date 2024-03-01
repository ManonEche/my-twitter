import { ArrowLeft, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
import ButtonFollow from "../components/Buttons/ButtonFollow";
// import { toast } from 'sonner';

export default function Following() {

    return (
        <>
            <div className="bg-glass min-h-screen">
                <Header />
                <Nav />
                <div className="min-h-screen">
                    <div className="flex justify-center pt-5">
                        <div className="profileBack">
                            <div className="flex justify-between items-center py-6">
                                <div className="flex gap-2 items-center">
                                    <Link to="/profile">
                                        <ArrowLeft />
                                    </Link>
                                    <strong className="text-lg">Suivi(e)s</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Liste des followers */}
                    <div className="flex justify-center">
                        <div className="backPost flex flex-col rounded-b-md">

                            <div className="flex gap-2 items-center justify-between pb-5">
                                <div className="flex gap-2">
                                    <CircleUserRound />
                                    <strong className="text-lg">Pseudo</strong>
                                </div>
                                <div>
                                    <ButtonFollow />
                                </div>
                            </div>
                            
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