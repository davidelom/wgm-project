import MainLayout from "../src/components/MainLayout";
import { useEffect, useState } from "react";
import Teams from "./pages/Teams";
import Tournaments from "./pages/Tournaments";
import { authApi } from "./lib/auth";
import Auth from "./components/Auth";
import { Toaster } from "react-hot-toast";

function App() {
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState("tournaments");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Vérifie si un utilisateur est déjà connecté
        authApi.getCurrentUser().then((user) => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-amber-500">Chargement...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <Auth onSuccess={() => authApi.getCurrentUser().then(setUser)} />
        );
    }

    return (
        <>
            <MainLayout
                onNavigate={setCurrentPage}
                currentPage={currentPage}
                user={user}
            >
                {currentPage === "tournaments" ? (
                    <Tournaments />
                ) : currentPage === "teams" ? (
                    <Teams />
                ) : null}
            </MainLayout>
            <Toaster position="top-right" />
        </>
    );
}

export default App;
