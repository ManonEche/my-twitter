import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthProvider";

export default function Nav() {
    // Variable
    const { logOut } = useContext(AuthContext);

    return (
        <nav className="flex justify-end p-4">
            <ul className="navBack flex flex-row gap-4 px-4 py-2">
                <li className="navStyle text-md font-normal">
                    <NavLink to="/thread">Accueil</NavLink>
                </li>
                <li className="navStyle text-md font-normal">
                    <NavLink to="/profile">Profil</NavLink>
                </li>
                <li className="navStyle text-md font-normal" >
                        <NavLink to="/" onClick={() => logOut()}>Déconnexion</NavLink>
                </li>
            </ul >
        </nav >
    )
}