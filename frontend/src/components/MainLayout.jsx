import Sidebar from "./Sidebar";
import { Shield } from "lucide-react";
import { authApi } from "../lib/auth";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
export default function Layout({ children, onNavigate, currentPage, user }) {
    const handleSignOut = async () => {
        try {
            await authApi.logout();
            window.location.reload();
            toast.success("Déconnexion réussie");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100 flex">
            <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
            <div className="flex-1">
                <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 sticky top-0 z-10">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Shield className="h-8 w-8 text-amber-500" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                                WoW Tournament Manager
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400">{user.email}</span>
                            <button
                                onClick={handleSignOut}
                                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                            >
                                Déconnexion
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 transition-colors">
                                Create Tournament
                            </button>
                        </div>
                    </div>
                </header>
                <main className="container mx-auto p-6">{children}</main>
            </div>
        </div>
    );
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
    onNavigate: PropTypes.func.isRequired,
    currentPage: PropTypes.string.isRequired,
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
    }).isRequired,
};
