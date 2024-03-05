/* eslint-disable react/no-unescaped-entities */
import { MessageSquareMore, X } from "lucide-react";
import Button from "../components/Buttons/Button";
import ButtonFollower from "../components/Buttons/ButtonFollower";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import Avatar from "../components/Avatar/Avatar";

export default function Thread() {

	// Variables
	const { register, handleSubmit } = useForm();
	const currentUser = auth.currentUser;
	const currentDate = new Date().toISOString();
	const textRegister = useRef(register);

	// States
	const [tweetText, setTweetText] = useState('');
	const [replyText, setReplyText] = useState('');
	const [tweets, setTweets] = useState([]);
	const [replyingToTweet, setReplyingToTweet] = useState(null);
	const [comments, setComments] = useState({});
	const [selectedUserTweets, setSelectedUserTweets] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [isFollowing, setIsFollowing] = useState(false);
	const [userFollowId, setUserFollowId] = useState(null);

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
					const tweetsArray = Object.entries(data)
						.filter(tweet => tweet[1].user.uid)
						.map((tweet) => ({
							...tweet[1],
							id: tweet[0]
						}));
					setTweets(tweetsArray);
				}
			} catch (error) {
				toast.error("Une erreur est survenue lors de l'affichage du tweet.")
			}
		};

		fetchTweets();
	}, []);

	const handleReplyClick = (tweetId) => {
		setReplyingToTweet(tweetId);
	}

	const handleSaveReply = async (tweetId) => {

		// Récupérer données saisies formulaire
		const newResponse = {
			text: replyText,
			user: currentUser,
			date: currentDate,

		};

		try {
			// Ajouter à la bdd firebase
			const response = await fetch(
				`https://mon-twitter-default-rtdb.europe-west1.firebasedatabase.app/tweets/${tweetId}/comments.json`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newResponse),
				},
			);

			console.log(response);

			setReplyText('');
			setReplyingToTweet(null);

			location.reload();
		} catch (error) {
			toast.error("Une erreur est survenue lors de la publication.")
		}
	}

	const handleCancelReply = () => {
		setReplyText('');
		setReplyingToTweet(null);
	}

	useEffect(() => {
		const fetchComments = async (tweetId) => {
			try {
				// Ajouter à la bdd firebase
				const response = await fetch(
					`https://mon-twitter-default-rtdb.europe-west1.firebasedatabase.app/tweets/${tweetId}/comments.json`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					},
				);

				// Erreur
				if (!response.ok) {
					toast.error("Une erreur est survenue.");
					return;
				}

				const data = await response.json();

				if (data) {
					setComments((prevComments) => ({
						...prevComments,
						[tweetId]: Object.entries(data).map(([id, comment]) => ({
							id,
							...comment
						}))
					}))
				}

			} catch (error) {
				toast.error("Une erreur est survenue lors de la récupération du commentaire.")
			}
		}

		tweets.forEach((tweet) => {
			fetchComments(tweet.id);
		})

	}, [tweets])

	const handleUserClick = async (userId) => {

		try {

			setSelectedUser(userId);

			const response = await fetch(
				`https://mon-twitter-default-rtdb.europe-west1.firebasedatabase.app/tweets.json`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			// Erreur
			if (!response.ok) {
				toast.error("Une erreur est survenue.");
				return;
			}

			const data = await response.json();
			console.log(response);
			console.log(data);

			if (data) {
				const tweetsArray = Object.keys(data)
					.filter(tweetId => data[tweetId].user.uid === userId.uid)
					.map((tweetId) => ({
						id: tweetId,
						...data[tweetId],
					}))

				setSelectedUserTweets(tweetsArray);
			}

		} catch (error) {
			toast.error("Une erreur est survenue lors de la récupération du commentaire.")
		}
	}

	const handleFollow = async () => {

		const followData = {
			followerId: currentUser.uid,
			followingId: selectedUser.uid,
		};


		const followEndpoint = isFollowing
			? `https://mon-twitter-default-rtdb.europe-west1.firebasedatabase.app/follows/${userFollowId}.json`
			: `https://mon-twitter-default-rtdb.europe-west1.firebasedatabase.app/follows.json`;

		try {
			// Ajouter à la bdd firebase
			const response = await fetch(followEndpoint,
				{
					method: isFollowing ? "DELETE" : "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: isFollowing ? null : JSON.stringify(followData),
				},
			);

			if (response.ok) {

				setIsFollowing((prevIsFollowing) => !prevIsFollowing);

			} else {
				toast.error("Une erreur est survenue.");
			}

		} catch (error) {
			toast.error("Une erreur est survenue.")
		}
	}

	useEffect(() => {
		const checkIfFollowing = async () => {
			if (currentUser && selectedUser) {
				try {
					// Ajouter à la bdd firebase
					const response = await fetch(
						`https://mon-twitter-default-rtdb.europe-west1.firebasedatabase.app/follows.json`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
							},
						},
					);

					const data = await response.json();

					if (response.ok) {

						const followsArray = Object.entries(data)
							.map(([id, follow]) => ({
								id,
								...follow,
							}));

						const isFollowingUser = followsArray.some(
							(follow) =>
								follow.followerId === currentUser.uid &&
								follow.followingId === selectedUser.uid
						)

						setIsFollowing(isFollowingUser);
						setUserFollowId(followsArray[0].id);

					} else {
						toast.error("Une erreur est survenue.")
					}

				} catch (error) {
					toast.error("Une erreur est survenue lors de la vérification de l'abonnement.")
				}
			}
		}
		checkIfFollowing();
	}, [currentUser, selectedUser])

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
										<div className="flex gap-3 items-center" >
											<Avatar email={tweet.user.email} />
											<a href="#profile">
												<div onClick={() => handleUserClick(tweet.user)}>
													<strong className="capitalize text-lg">{tweet.user.email.split('@')[0]}</strong>
												</div>
											</a>
										</div>

										<p className="text-sm">{new Date(tweet.date).toLocaleDateString()}</p>
									</div>
									<p className="pt-4">{tweet.text}</p>
									<div className="flex justify-end">
										<button className="pb-4" onClick={() => handleReplyClick(tweet.id)}>
											<MessageSquareMore />
										</button>
									</div>
									{replyingToTweet === tweet.id && (
										<div className="pb-6">
											<form className="responsePost h-full" onSubmit={handleSubmit(handleSaveReply)}>
												<textarea
													className="bg-transparent border-none outline-none resize-none"
													placeholder={`Répondre à @${tweet.user.email.split('@')[0]}`}
													rows={3}
													value={replyText}
													onChange={(e) => setReplyText(e.target.value)}
													name="replyText"
													ref={textRegister}
												/>
												<div className="flex justify-end gap-4 p-4">
													<Button onClick={() => handleSaveReply(tweet.id)}>Enregistrer</Button>
													<Button onClick={handleCancelReply}>Annuler</Button>
												</div>
											</form>
										</div>
									)}

									{/* Afficher les commentaires */}
									{comments[tweet.id] && (
										<div className="comments">
											{comments[tweet.id].map((comment) => (
												<div key={comment.id}>
													<div className="comment">
														<div className="commentBody">
															<div className="commentText">
																<p>{comment.text}</p>
															</div>
															<p className="attribution capitalize">Par {comment.user.email.split('@')[0]}</p>
														</div>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							))}
					</div>

					{/* Fenêtre utilisateur */}
					<div>
						{selectedUser &&
							<div id="profile" className="modal">
								<div className="bg-glass">
									<div className="flex justify-center bg-glass2">
										<div className="w-full p-4">
											<div className="flex justify-end" onClick={() => setSelectedUser(null)}>
												<X />
											</div>
											<div className="flex justify-between items-center py-4">
												<div className="flex gap-3 items-center ps-6">
													<Avatar email={selectedUser.email} />
													<strong className="text-lg capitalize">
														{selectedUser.displayName || selectedUser.email.split('@')[0]}
													</strong>
												</div>
												<div className="pe-8">
													<ButtonFollower onClick={() => handleFollow(selectedUser)}>
														{isFollowing ? "Se désabonner" : "S'abonner"}
													</ButtonFollower>
												</div>
											</div>
										</div>
									</div>
									{/* Posts du profil */}
									<div className="flex justify-center text-lg font-bold">
										<p className="titleProfile bg-white">Posts</p>
									</div>

									<div className="flex flex-col items-center">

										<div>
											{selectedUserTweets
												.sort((a, b) => new Date(b.date) - new Date(a.date))
												.map((tweet, index) => (
													<div key={tweet.id || index} className="backPost">
														<div>
															<div className="flex gap-4 justify-between items-center">
																<p className="text-sm font-normal">{new Date(tweet.date).toLocaleDateString()}</p>
															</div>
															<p className="pt-2 font-medium">{tweet.text}</p>

														</div>
													</div>
												))
											}
										</div>
									</div>
								</div>
							</div>
						}
					</div>

				</div>
				<div className="bg-glass mt-5">
					<Footer />
				</div>
			</div>
		</>
	)
}