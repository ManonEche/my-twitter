import { CircleUserRound } from "lucide-react";
import Button from "../components/Buttons/Button";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";

export default function Thread() {

    // Variables
    const { register, handleSubmit } = useForm();
    const currentUser = auth.currentUser;
    const currentDate = new Date().toISOString();
    const textRegister = useRef(register);

    // States
    const [tweetText, setTweetText] = useState('');
    const [tweets, setTweets] = useState([]);

    // Functions
    const onSubmit = async () => {
        // Récupérer données saisies formulaire
        const newTweet = {
            text: tweetText,
            user: currentUser,
            date: currentDate,

        }

        try {
            // Ajouter à la bdd firebase
            const response = await fetch(
                "https://mon-twitter-default-rtdb.europe-west1.firebasedatabase.app/tweets.json",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTweet),
                },
            );

            // Erreur
            if (!response.ok) {
                toast.error("Une erreur est survenue.");
                return;
            }

            // Récupérer l'id
            const responseData = await response.json();
            console.log(responseData.name);

            setTweetText('');

            toast.success("Tweet publié avec succès.")

            window.location.reload();
        } catch (error) {
            toast.error("Une erreur est survenue lors de la publication.")
        }
    }

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                // Récupérer le contenu de la bdd firebase
                const response = await fetch(
                    "https://mon-twitter-default-rtdb.europe-west1.firebasedatabase.app/tweets.json",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    },
                );

                // Erreur
                if (!response.ok) {
                    toast.error("Une erreur est survenue");
                    return;
                }

                const data = await response.json();

                if (data) {
                    const tweetsArray = Object.entries(data).map(([id, tweet]) => ({
                        id,
                        ...tweet
                    }));
                    setTweets(tweetsArray);
                }
            } catch (error) {
                toast.error("Une erreur est survenue lors de l'affichage du tweet.")
            }
        };

        fetchTweets();
    }, []);

    return (
        <>
            <div className="bg-glass min-h-screen">
                <Header />
                <Nav />
                <div className="min-h-screen">
                    <div className="flex justify-center pt-5 w-full">
                        <div>
                            <form className="inputPost h-full" onSubmit={handleSubmit(onSubmit)}>
                                {/* Zone de texte */}
                                <textarea
                                    className="bg-transparent border-none outline-none resize-none"
                                    placeholder=" Quoi de neuf ?"
                                    rows={3}
                                    value={tweetText}
                                    onChange={(e) => setTweetText(e.target.value)}
                                    name="tweetText"
                                    ref={textRegister}
                                />
                                {/* Bouton */}
                                <div className="flex justify-end pe-5">
                                    <Button>Publier</Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Posts des abonnées */}

                    <div className="flex flex-col items-center">
                        {tweets
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((tweet) => (
                                <div key={tweet.id} className="backPost">
                                    <div className="flex flex-row gap-3 items-center">
                                        <div className="flex gap-2 items-center">
                                            <CircleUserRound />
                                            <strong className="capitalize text-lg">{tweet.user.email.split('@')[0]}</strong>
                                        </div>
                                        <p className="text-sm">{new Date(tweet.date).toLocaleDateString()}</p>
                                    </div>
                                    <p className="pt-2">{tweet.text}</p>
                                </div>
                            ))}
                    </div>

                </div>
                <div className="bg-glass mt-5">
                    <Footer />
                </div>
            </div>
        </>
    )
}