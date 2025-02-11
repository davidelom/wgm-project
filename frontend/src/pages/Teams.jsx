import { useEffect, useState } from "react";
import { Search, Filter, Plus } from "lucide-react";

// Hypothétique fonction pour supprimer une team côté API
import {
    generateTeams,
    getCharacters,
    getTeamsCharacters,
    deleteTeamById,
    CreateTeamAPI,
} from "../lib/api";
import TeamCard from "../components/TeamCard";
import CreateTeam from "../components/CreateTeam";
import GenerateTeamsModal from "../components/GenerateTeamsModal";

import useGameData from "../hooks/data-hook";

const roleIconsMap = {
    1: "🛡️", // tank
    2: "⚔️", // damage
    3: "💚", // healer
};

export default function Teams() {
    const [searchQuery, setSearchQuery] = useState("");
    const [teams, setTeams] = useState([]);
    const [showCreateTeam, setShowCreateTeam] = useState(false);
    const [showGenerateTeams, setShowGenerateTeams] = useState(false);
    const [availableCharacters, setAvailableCharacters] = useState([]);

    const { classes } = useGameData();

    // Récupère tous les personnages disponibles
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const charactersData = await getCharacters();
                setAvailableCharacters(charactersData);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement des personnages :",
                    error
                );
            }
        };
        fetchCharacters();
    }, []);

    // Récupère les équipes
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const teamsData = await getTeamsCharacters();
                setTeams(teamsData);
                console.log(teamsData);
            } catch (error) {
                console.error("Erreur lors du chargement des équipes :", error);
            }
        };
        fetchTeams();
    }, []);

    // Créer une équipe
    const handleCreateTeam = async (newTeam) => {
        try {
            const createdTeam = await CreateTeamAPI(newTeam);
            setTeams((prevTeams) => [...prevTeams, createdTeam]);
        } catch (error) {
            console.error("Erreur lors de la création de l'équipe :", error);
        }
    };

    // Générer plusieurs équipes
    const handleGenerateTeams = async (numberOfTeams) => {
        try {
            const generated = await generateTeams(numberOfTeams);
            setTeams((prevTeams) => [...prevTeams, ...generated]);
        } catch (error) {
            console.error("Erreur lors de la génération des équipes :", error);
        }
    };

    // Supprimer une équipe
    const handleDeleteTeam = async (teamId) => {
        try {
            await deleteTeamById(teamId);
            setTeams((prev) => prev.filter((team) => team.party_id !== teamId));
        } catch (error) {
            console.error("Erreur lors de la suppression de l'équipe :", error);
        }
    };

    // Filtrage sur party_name ou sur le nom des personnages
    const filteredTeams = teams.filter((team) => {
        const lowerQuery = searchQuery.toLowerCase();

        // Si party_name est undefined, on prend ""
        const teamName = team.party_name || "";
        const matchTeamName = teamName.toLowerCase().includes(lowerQuery);

        // Si team.characters est undefined, on prend []
        const matchAnyCharacter = (team.characters || []).some((c) => {
            const charName = c.name || "";
            return charName.toLowerCase().includes(lowerQuery);
        });

        return matchTeamName || matchAnyCharacter;
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Teams</h2>
                    <p className="text-gray-400">
                        Browse and manage World of Warcraft tournament teams
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 transition-colors"
                        onClick={() => setShowCreateTeam(true)}
                    >
                        <Plus className="h-5 w-5" />
                        Create Team
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 transition-colors"
                        onClick={() => setShowGenerateTeams(true)}
                    >
                        <Plus className="h-5 w-5" />
                        Generate Team
                    </button>
                </div>
            </div>

            <div className="flex gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search teams or players..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-amber-500"
                    />
                </div>
                <button className="btn btn-secondary flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeams.map((team) => (
                    <div key={team.party_id}>
                        <TeamCard
                            partyId={team.party_id}
                            partyName={team.party_name}
                            characters={team.characters}
                            avatarUrl={team.avatarUrl}
                            classColors={classes}
                            roleIcons={roleIconsMap}
                            onDeleteTeam={handleDeleteTeam}
                        />
                    </div>
                ))}
            </div>

            {/* Modale de création */}
            {showCreateTeam && (
                <CreateTeam
                    onClose={() => setShowCreateTeam(false)}
                    onSave={handleCreateTeam}
                    availableCharacters={availableCharacters}
                />
            )}

            {/* Modale de génération */}
            {showGenerateTeams && (
                <GenerateTeamsModal
                    onClose={() => setShowGenerateTeams(false)}
                    onSave={handleGenerateTeams}
                    availableCharacters={availableCharacters}
                />
            )}
        </div>
    );
}
