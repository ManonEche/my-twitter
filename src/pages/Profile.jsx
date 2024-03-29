/* eslint-disable react-hooks/exhaustive-deps */

import { FilePenLine, Trash2 } from "lucide-react";
import Button from "../components/Buttons/Button";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Username from "../components/Username/Username";
import Nav from "../components/Nav/Nav";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import Avatar from "../components/Avatar/Avatar";

export default function Profile() {

  // Variables
  const currentUser = auth.currentUser || { email: "" };


  // States
  const [tweets, setTweets] = useState([]);
  const [editingTweetId, setEditingTweetId] = useState(null);
  const [editedText, setEditedText] = useState('');


  // Functions

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
          toast.error("Une erreur est survenue.");
          return;
        }

        const data = await response.json();

        if (data) {
          const tweetsArray = Object.entries(data)
            .filter(tweet => tweet[1].user.uid === currentUser?.uid)
            .map((tweet) => ({
              ...tweet[1],
              id: tweet[0]
            }));

          setTweets(tweetsArray);

          // Stocker tweets de l'user connecté dans le stockage local
          localStorage.setItem('userTweets', JSON.stringify(tweetsArray));
        }
      } catch (error) {
        toast.error("Une erreur est survenue lors de l'affichage des tweets.")
      }
    };

    // Vérif si tweets stockés localement
    const getStoredTweets = () => {
      const storedTweets = localStorage.getItem('userTweets');
      return storedTweets ? JSON.parse(storedTweets) : [];
    };
    const storedTweets = getStoredTweets();

    // Mettre à jour nouveau tweet dans le stockage local
    const updatedTweets = [...storedTweets, ...tweets];
    localStorage.setItem('userTweets', JSON.stringify(updatedTweets))

    fetchTweets();


    // Supprimer tweets stockés localement à la déconnexion
    const handleLogout = () => {
      localStorage.removeItem('userTweets');
    }

    const disconnect = auth.onAuthStateChanged((user) => {
      if (!user) {
        handleLogout();
      }
    })

    return () => {
      disconnect()
    };

  }, [currentUser, tweets]);

  // Pour définir le contenu à modifier
  const handleEdit = (tweet) => {
    setEditingTweetId(tweet.id);
    setEditedText(tweet.text);
  };

  const handleSaveEdit = async () => {
    try {
      // Trouver le tweet à modifier
      const tweetToEdit = tweets.find(() => editingTweetId);

      // Mettre à jour le texte du tweet
      if (tweetToEdit) {
        tweetToEdit.text = editedText;
      }

      // Récupérer le contenu de la bdd firebase
      const response = await fetch(
        `https://mon-twitter-default-rtdb.europe-west1.firebasedatabase.app/tweets/${editingTweetId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: editedText,
          }),
        },
      );

      // Erreur
      if (!response.ok) {
        toast.error("Une erreur est survenue lors de la mise à jour.");
        return;
      }

      // Réinitiliser l'état
      setEditingTweetId(null);
      setEditedText('');

    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour du tweet.");
    }
  }

  const handleDelete = async (tweet) => {

    // Trouver le tweet à supprimer
    setEditingTweetId(tweet.id);

    try {

      // Supprimer le tweet de la bdd firebase
      const response = await fetch(
        `https://mon-twitter-default-rtdb.europe-west1.firebasedatabase.app/tweets/${tweet.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Erreur
      if (!response.ok) {
        toast.error("Une erreur est survenue lors de la suppression.");
        return;
      }

      // Suppression réussie
      toast.success("Tweet supprimé avec succès.")


    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression du tweet.");
    }

  }

  return (
    <>
      <div className="bg-glass min-h-screen">
        <Header />
        <Nav />
        <div className="min-h-screen">
          <div className="flex justify-center pt-5">
            <div className="profileBack">
              <div className="flex justify-between items-center p-6">
                <div className="flex gap-4 items-center">
                  <Avatar email={currentUser.email} />
                  <strong className="text-lg">
                    <Username />
                  </strong>
                </div>
              </div>
            </div>
          </div>
          {/* Posts du profil */}
          <div className="flex justify-center text-lg font-bold">
            <p className="titleProfile bg-white">Posts</p>
          </div>

          <div className="flex flex-col items-center">
            {editingTweetId &&

              <div id="tweet" className="modal">
                <div className="modalContent textAreaPost">
                  <textarea
                    className="bg-transparent border-none outline-none resize-none"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <div className="flex justify-end gap-4">
                    <Button onClick={handleSaveEdit}>Enregistrer</Button>
                    <Button onClick={() => setEditingTweetId(null)}>Annuler</Button>
                  </div>
                </div>
              </div>}
            <div>
              {tweets
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((tweet, index) => (
                  <div key={tweet.id || index} className="backPost">

                    <div>
                      <div className="flex gap-4 justify-between items-center">
                        <p className="text-sm font-normal">{new Date(tweet.date).toLocaleDateString()}</p>
                        <div className="flex gap-3 items-start">
                          <a href="#tweet">
                            <button
                              onClick={() => handleEdit(tweet)} >
                              <FilePenLine />
                            </button>
                          </a>
                          <button
                            onClick={() => handleDelete(tweet)} >
                            <Trash2 />
                          </button>
                        </div>
                      </div>
                      <p className="pt-2 font-medium">{tweet.text}</p>

                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="bg-glass mt-5">
          <Footer />
        </div>
      </div >
    </>
  )
}