import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Buttons/Button";
import Footer from "../components/Footer/Footer";
import { useForm } from "react-hook-form";
import { AuthContext } from "../store/AuthProvider";
import { useContext, useState } from "react";
import { toast } from 'sonner';
import Header from "../components/Header/Header";


export default function Home() {
    // Variables
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // State
    const [loading, setLoading] = useState(false);

    // Function
    const onSubmit = (data) => {
        if (loading) return;

        loginUser(data.email, data.password).then(() => {
            setLoading(false);
            navigate("/thread");
            toast.success("Vous êtes connecté(e) !")
        })
            .catch(error => {
                setLoading(false);
                const { code } = error;
                if (code == "auth/user-not-found") {
                    toast.error("Cet email n'existe pas.")
                }
                else if (code == "auth/invalid-credential") {
                    toast.error("Erreur de saisie.")
                }
                else {
                    toast.error(code)
                }
            })
    }

    return (
        <>
            <div className="bg-glass min-h-screen">
                <div className="lg:hidden">
                    <Header />
                </div>
                <div className="flex flex-row items-center justify-center gap-56 p-5 h-screen">
                    <div className="lg:w-1/4 lg:block hidden gap-0">
                        <img src="../../src/assets/favicon.webp" alt="Oiseau" className="w-full m-0" />
                    </div>
                    <div>
                        <div className="relative">
                            {/* Bloc décoratif */}
                            <div className="absolute drop drop-3"></div>
                        </div>
                        <div className="relative backCard">
                            <h1 className="text-3xl font-extrabold mb-10">Se connecter à Twitter</h1>
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
                                        {/* <Link to="/th"> */}
                                        <Button>Se connecter</Button>
                                        {/* </Link> */}
                                    </div>
                                </form>

                                {/* Inscription */}
                                <div className="text-center mt-6">
                                    <Link to="/signup">
                                        Pas de compte ? <strong>Inscrivez-vous</strong>
                                    </Link>
                                </div>

                                {/* Blocs décoratifs */}
                                <div className="absolute drop drop-1"></div>
                                <div className="absolute drop drop-2"></div>
                            </div>
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