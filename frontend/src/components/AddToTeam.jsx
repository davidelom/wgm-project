import { useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";

export default function AddToTeam({ character, teams, onClose, onSave }) {
    const [selectedTeam, setSelectedTeam] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSave(selectedTeam, character);
            onClose();
        } catch (error) {
            console.error("Error adding character to team:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">
                        Ajouter à une équipe
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-4">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Personnage
                        </h3>
                        <div className="bg-slate-900 p-3 rounded-lg">
                            <p className="text-white">{character.name}</p>
                            <p className="text-gray-400">
                                {character.classLabel} - {character.role}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">
                                Équipe
                            </label>
                            <select
                                value={selectedTeam}
                                onChange={(e) =>
                                    setSelectedTeam(e.target.value)
                                }
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white"
                                required
                            >
                                <option value="">
                                    Sélectionner une équipe
                                </option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
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
                                {loading ? "Ajout..." : "Ajouter"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

AddToTeam.propTypes = {
    character: PropTypes.object.isRequired,
    teams: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
