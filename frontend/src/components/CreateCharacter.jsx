import { useEffect, useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { getClasses, getRolesByClassId } from "../lib/api";

export default function CreateCharacter({ onClose, onSave }) {
    const [name, setName] = useState("");
    const [classes, setClasses] = useState([]);
    const [roles, setRoles] = useState([]);
    const [characterClass, setCharacterClass] = useState("");
    const [role, setRole] = useState("");
    const [level, setLevel] = useState(70);
    const [rio, setRio] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const classesData = await getClasses();
                setClasses(classesData);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des classes :",
                    error
                );
            }
        };

        fetchClasses();
    }, []);

    // get roles
    useEffect(() => {
        const fetchRoles = async () => {
            if (characterClass) {
                try {
                    const rolesData = await getRolesByClassId(characterClass);
                    setRoles(rolesData);
                } catch (error) {
                    console.error(
                        "Erreur lors de la récupération des rôles :",
                        error
                    );
                }
            }
        };

        fetchRoles();
    }, [characterClass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!name || !characterClass || !role) {
                console.warn("Tous les champs sont requis !");
                setLoading(false);
                return;
            }

            const character = {
                name,
                class_id: characterClass,
                role_id: role,
                ilvl: level,
                classLabel: classes.find((c) => c.id == Number(characterClass))
                    .label,
                roleLabel: roles.find((r) => r.id == role).label,
                rio,
                player_id: 1,
            };

            await onSave(character);
            onClose();
        } catch (error) {
            console.error("Erreur lors de la création du personnage :", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">
                        Créer un personnage
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            Nom du personnage
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            Classe
                        </label>
                        <select
                            value={characterClass}
                            onChange={(e) => setCharacterClass(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white"
                            required
                        >
                            <option value="">Sélectionner une classe</option>
                            {classes.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            Rôle
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white"
                            required
                        >
                            <option value="">Sélectionner un rôle</option>
                            {roles.map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            Niveau
                        </label>
                        <input
                            type="number"
                            value={level}
                            onChange={(e) => setLevel(parseInt(e.target.value))}
                            min="1"
                            max="70"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            Rio
                        </label>
                        <input
                            type="number"
                            value={rio}
                            onChange={(e) => setRio(parseInt(e.target.value))}
                            min="1"
                            max="70"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors"
                        >
                            {loading ? "Création..." : "Créer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

CreateCharacter.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
