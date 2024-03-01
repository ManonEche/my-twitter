/* eslint-disable react/no-unescaped-entities */

import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Buttons/Button";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../store/AuthProvider";
import { toast } from 'sonner';

export default function Signup() {
    // Variables
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const {createUser} = useContext(AuthContext);

    // State
    const [loading, setLoading] = useState(false);

    // Function
    const onSubmit = async (data) => {
        if (loading) return;

        setLoading(true);

        createUser(data.email, data.password).then(() => {
            setLoading(false);
            toast.success("Compte créé avec succès.")
            navigate("/");
        })
            .catch(error => {
                setLoading(false);
                const { code } = error;
                if (code == "auth/email-already-in-use") {
                    toast.error("Cet email est déjà utilisé.")
                } else if (code == "auth/weak-password") {
                    toast.error("Mot de passe trop court (6 caractères min.)")
                } else {
                    toast.error(code)
                }
            })
    };

    return (
        <>
            <div className="bg-glass min-h-screen">
                <Header />
                <div className="flex flex-row items-center justify-center h-screen">
                    <div className="relative">
                        {/* Bloc décoratif */}
                        <div className="absolute drop drop-4"></div>
                    </div>
                    <div className="relative backCard">
                        <h1 className="text-3xl text-center font-extrabold mb-10">S'inscrire à Twitter</h1>
                        <div>
                            {/* Connexion */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Email */}
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={`input && ${errors.email && "bg-red-50"}`}
                                    {...register("email", {
                                        required: true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Renseignez une adresse valide."
                                        }
                                    })}
                                />
                                {errors.email && (<p className="text-red-400 mb-10">{errors.email.message}</p>)}
                                {/* Mot de passe */}
                                <input
                                    type="password"
                                    placeholder="Mot de passe"
                                    className="input"
                                    {...register("password", {
                                        required: true
                                    })}
                                />
                                {errors.password && (<p className="text-red-400 mb-10">{errors.password.message}</p>)}
                                {/* Bouton */}
                                <div className="mt-10 flex justify-center">
                                    <Button disabled={loading}>S'inscrire</Button>
                                </div>
                            </form>

                            {/* Inscription */}
                            <div className="text-center mt-6">
                                <Link to="/">
                                    Vous avez déjà un compte ? <strong>Connectez-vous</strong>
                                </Link>
                            </div>

                            {/* Blocs décoratifs */}
                            <div className="absolute drop drop-1"></div>
                            <div className="absolute drop drop-2"></div>
                        </div>
                    </div>

                </div>
                <div className="bg-glass">
                    <Footer />
                </div>
            </div>
        </>
    )
}