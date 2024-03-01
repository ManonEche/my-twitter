/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";
import Error404 from "../components/Error404/Error404";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function Error() {

    return (
        <>
            <div className="bg-glass min-h-screen">
                <Header />
                <div className="flex justify-end p-4">
                    <div className="navBack px-4 py-2 w-48 flex justify-center">
                        <Link to="/"
                            className="navStyle text-md font-normal"
                        >
                            Retourner à l'accueil
                        </Link>
                    </div>
                </div>
                <Error404 />
                <div className="bg-glass">
                    <Footer />
                </div>
            </div>
        </>
    )
}