/* eslint-disable react/prop-types */
import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from 'sonner';
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Signup = lazy(() => import("./pages/Signup"));
const Thread = lazy(() => import("./pages/Thread"));
const Error = lazy(() => import("./pages/Error"));

export default function App() {

    // State
    const [user, setUser] = useState(null);

    // Functions
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        })

        return () => unsubscribe();
    }, [])

    const isUserAuthenticated = () => {
        return !!user;
    }

    const ProtectedRoute = ({ element }) => {
        return isUserAuthenticated() ? element : <Navigate to="/" />
    }

    return (
        <>
            <Toaster expand={false} position="bottom-right" />
            <Routes>
                <Route
                    path="*"
                    element={
                        <Suspense>
                            <Error />
                        </Suspense>}
                />
                <Route
                    path="/"
                    element={
                        <Suspense>
                            <Home />
                        </Suspense>}
                />
                <Route
                    path="/signup"
                    element={
                        <Suspense>
                            <Signup />
                        </Suspense>}
                />
                <Route
                    path="/thread"
                    element={
                        <Suspense>
                            <ProtectedRoute
                                path="/thread"
                                element={<Thread />}
                            />
                        </Suspense>}
                />
                <Route
                    path="/profile"
                    element={
                        <Suspense>
                            <ProtectedRoute
                                path="/profile"
                                element={<Profile />}
                            />
                        </Suspense>}
                />
                <Route
                    path="/error"
                    element={
                        <Suspense>
                            <Error />
                        </Suspense>}
                />
            </Routes>
        </>
    );
}

