import { useState } from "react";
import { Shield } from "lucide-react";
import { authApi } from "../lib/auth";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export default function Auth({ onSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                await authApi.login(email, password);
                toast.success("Connexion réussie!");
            } else {
                await authApi.register({ email, password, username, fullName });
                toast.success("Compte créé avec succès!");
            }
            onSuccess();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Shield className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-white mb-2">
                        WoW Tournament Manager
                    </h1>
                    <p className="text-gray-400">
                        {isLogin
                            ? "Connectez-vous pour continuer"
                            : "Créez votre compte"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">
                                    {"Nom d'utilisateur"}
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-4 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-4 text-white"
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-4 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-4 text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        {loading
                            ? "Chargement..."
                            : isLogin
                            ? "Se connecter"
                            : "S'inscrire"}
                    </button>
                </form>

                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full text-center text-amber-500 hover:text-amber-400 mt-4"
                >
                    {isLogin
                        ? "Pas encore de compte ? S'inscrire"
                        : "Déjà un compte ? Se connecter"}
                </button>
            </div>
        </div>
    );
}

Auth.propTypes = {
    onSuccess: PropTypes.func.isRequired,
};
