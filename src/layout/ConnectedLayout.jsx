/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function ConnectedLayout({ children }) {
    // Variables
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    if (loading) {
        return <div>...</div>;
    }

    if (!loading && !user) {
        navigate("/");
        toast.error("Page réservée aux membres connectés");
        return <div></div>;
    }

    return <>{children}</>;
}