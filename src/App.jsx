/* eslint-disable react/prop-types */
import { lazy, Suspense } from "react";
import { Toaster } from 'sonner';
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Signup = lazy(() => import("./pages/Signup"));
const Thread = lazy(() => import("./pages/Thread"));
const Error = lazy(() => import("./pages/Error"));

export default function App() {

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
                            <Thread />
                        </Suspense>}
                />
                <Route
                    path="/profile"
                    element={
                        <Suspense>
                            <Profile />
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

