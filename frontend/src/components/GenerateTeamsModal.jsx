import { useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";

export default function GenerateTeamsModal({
    onClose,
    onSave,
    availableCharacters,
}) {
    const [teamNumber, setTeamNumber] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSave(teamNumber);
            onClose();
        } catch (error) {
            console.error("Error creating team:", error);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = () => {
        console.log(teamNumber, availableCharacters.length);

        return teamNumber > 0;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg w-full max-w-2xl">
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">
                        Générer équipes
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">
                                {"Nombre d'équipes"}
                            </label>
                            <input
                                type="number"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white"
                                value={teamNumber}
                                onChange={(e) => setTeamNumber(e.target.value)}
                                required
                            />
                        </div>
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
                            disabled={loading || !isFormValid()}
                            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Création..." : "Générer l'équipe"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

GenerateTeamsModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    availableCharacters: PropTypes.array.isRequired,
};
