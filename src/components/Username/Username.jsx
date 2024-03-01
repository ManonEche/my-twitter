import { auth } from "../../firebase";

export default function Username() {
    // Variable
    const currentUser = auth.currentUser;

    // Function
    if (currentUser) {
        const email = currentUser.email;

        if (email) {
            const username = email.split("@")[0];

            return <div className="capitalize">{username}</div>;
        }
    }
}