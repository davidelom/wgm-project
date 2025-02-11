import { useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";

export default function CreateTeam({ onClose, onSave, availableCharacters }) {
    const [partyName, setPartyName] = useState("");
    const [selectedMembers, setSelectedMembers] = useState({
        tank: "",
        healer: "",
        dps1: "",
        dps2: "",
        dps3: "",
    });
    const [loading, setLoading] = useState(false);

    // 1) Convertir role_id -> role pour permettre le filtrage par 'tank' | 'healer' | 'damage'
    const mappedCharacters = availableCharacters.map((char) => {
        let role = "damage"; // par défaut
        if (char.role_id === 1) role = "tank";
        else if (char.role_id === 3) role = "healer";

        return { ...char, role };
    });

    // 2) Filtrer par rôle
    const tanks = mappedCharacters.filter((char) => char.role === "tank");
    const healers = mappedCharacters.filter((char) => char.role === "healer");
    const dps = mappedCharacters.filter((char) => char.role === "damage");

    // Vérifie si un perso a déjà été choisi
    const isCharacterSelected = (charId) =>
        Object.values(selectedMembers).includes(charId);

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Récupère les persos sélectionnés
            const rawMembers = [
                mappedCharacters.find(
                    (char) => char.id == selectedMembers.tank
                ),
                mappedCharacters.find(
                    (char) => char.id == selectedMembers.healer
                ),
                mappedCharacters.find(
                    (char) => char.id == selectedMembers.dps1
                ),
                mappedCharacters.find(
                    (char) => char.id == selectedMembers.dps2
                ),
                mappedCharacters.find(
                    (char) => char.id == selectedMembers.dps3
                ),
            ].filter(Boolean);

            // Transforme en structure "finale"
            const characters = rawMembers.map((char) => ({
                character_id: char.id,
                name: char.name,
                class_id: char.class_id,
                role_id: char.role_id,
                ilvl: char.ilvl,
                rio: char.rio,
            }));

            const newTeam = {
                party_name: partyName,
                characters,
                rating: 1500,
                achievements: [],
                avatarUrl:
                    "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80",
            };

            await onSave(newTeam);
            onClose();
        } catch (error) {
            console.error("Error creating team:", error);
        } finally {
            setLoading(false);
        }
    };

    // Validation basique
    const isFormValid = () =>
        partyName.trim() !== "" &&
        selectedMembers.tank &&
        selectedMembers.healer &&
        selectedMembers.dps1 &&
        selectedMembers.dps2 &&
        selectedMembers.dps3;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg w-full max-w-2xl">
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">
                        Créer une équipe
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-6">
                    {/* Nom de l'équipe */}
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            {"Nom de l'équipe"}
                        </label>
                        <input
                            type="text"
                            value={partyName}
                            onChange={(e) => setPartyName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white"
                            required
                        />
                    </div>

                    {/* Composition */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">
                            {"Composition de l'équipe"}
                        </h3>

                        {/* Tank */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">
                                Tank
                            </label>
                            <select
                                value={selectedMembers.tank}
                                onChange={(e) =>
                                    setSelectedMembers((prev) => ({
                                        ...prev,
                                        tank: e.target.value,
                                    }))
                                }
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white"
                                required
                            >
                                <option value="">Sélectionner un tank</option>
                                {tanks.map((char) => (
                                    <option
                                        key={char.id}
                                        value={char.id}
                                        disabled={
                                            isCharacterSelected(char.id) &&
                                            char.id !== selectedMembers.tank
                                        }
                                    >
                                        {char.name} - {char.classLabel}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Healer */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">
                                Soigneur
                            </label>
                            <select
                                value={selectedMembers.healer}
                                onChange={(e) =>
                                    setSelectedMembers((prev) => ({
                                        ...prev,
                                        healer: e.target.value,
                                    }))
                                }
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white"
                                required
                            >
                                <option value="">
                                    Sélectionner un soigneur
                                </option>
                                {healers.map((char) => (
                                    <option
                                        key={char.id}
                                        value={char.id}
                                        disabled={
                                            isCharacterSelected(char.id) &&
                                            char.id !== selectedMembers.healer
                                        }
                                    >
                                        {char.name} - {char.classLabel}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* DPS (3 slots) */}
                        {[1, 2, 3].map((index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-200 mb-1">
                                    DPS {index}
                                </label>
                                <select
                                    value={selectedMembers[`dps${index}`]}
                                    onChange={(e) =>
                                        setSelectedMembers((prev) => ({
                                            ...prev,
                                            [`dps${index}`]: e.target.value,
                                        }))
                                    }
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white"
                                    required
                                >
                                    <option value="">
                                        Sélectionner un DPS
                                    </option>
                                    {dps.map((char) => (
                                        <option
                                            key={char.id}
                                            value={char.id}
                                            disabled={
                                                isCharacterSelected(char.id) &&
                                                char.id !==
                                                    selectedMembers[
                                                        `dps${index}`
                                                    ]
                                            }
                                        >
                                            {char.name} - {char.classLabel}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    {/* Boutons d'action */}
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
                            disabled={loading || !isFormValid()}
                            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Création..." : "Créer l'équipe"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Définition des PropTypes
CreateTeam.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    availableCharacters: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            role_id: PropTypes.number.isRequired, // 1=Tank,2=Damage,3=Healer
            class_id: PropTypes.number.isRequired,
            ilvl: PropTypes.number,
            rio: PropTypes.number,
            classLabel: PropTypes.string, // si c'est stocké ainsi
        })
    ).isRequired,
};
