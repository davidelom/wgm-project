import { useEffect, useState } from "react";
import { Search, Plus, UserPlus } from "lucide-react";
import CreateCharacter from "../components/CreateCharacter";
import AddToTeam from "../components/AddToTeam";
import { getCharacters } from "../lib/api";
import useGameData from "../hooks/data-hook";

// Équipes fictives (exemple)
const mockTeams = [
    { id: "1", name: "Azeroth Avengers" },
    { id: "2", name: "Storm Raiders" },
    { id: "3", name: "Horde Elite" },
];

// Icônes associées à chaque rôle
const roleIcons = {
    tank: "🛡️",
    healer: "💚",
    damage: "⚔️",
};

// Convertir role_id → "tank" | "healer" | "damage"
function roleIdToString(roleId) {
    if (roleId === 1) return "tank";
    if (roleId === 3) return "healer";
    return "damage"; // Par défaut, si c'est 2 ou autre que 1/3
}

export default function Characters() {
    const [characters, setCharacters] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAddToTeamModal, setShowAddToTeamModal] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [filteredCharacters, setFilteredCharacters] = useState([]);

    // Récupère la map roles, classes
    const { roles, classes } = useGameData();

    // Récupération des persos depuis l'API, puis transformation
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const charactersData = await getCharacters();
                // Ajout d'une prop roleLabel ("tank" / "healer" / "damage")
                // et classLabel (Ex: "Guerrier", "Voleur", etc.)
                const updatedCharacters = charactersData.map((char) => ({
                    ...char,
                    roleLabel: roleIdToString(char.role_id),
                    classLabel: classes[char.class_id]?.label || "Inconnu",
                }));
                setCharacters(updatedCharacters);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement des personnages :",
                    error
                );
            }
        };

        // On attend que roles et classes soient chargés avant d'appeler l'API
        if (Object.keys(roles).length > 0 && Object.keys(classes).length > 0) {
            fetchCharacters();
        }
    }, [roles, classes]);

    // Filtrage par nom ou par label de classe
    useEffect(() => {
        if (characters.length === 0) {
            setFilteredCharacters([]);
        } else {
            const lowerQuery = searchQuery.toLowerCase();
            setFilteredCharacters(
                characters.filter(
                    (char) =>
                        char.name.toLowerCase().includes(lowerQuery) ||
                        char.classLabel.toLowerCase().includes(lowerQuery)
                )
            );
        }
    }, [characters, searchQuery]);

    // Création d'un personnage côté API + mise à jour locale
    const handleCreateCharacter = async (character) => {
        const back_url = import.meta.env.VITE_BACK_URL;
        try {
            await fetch(`${back_url}/characters`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: character.name,
                    class_id: Number(character.class_id),
                    role_id: Number(character.role_id),
                    ilvl: Number(character.ilvl),
                    rio: Number(character.rio),
                    player_id: Number(character.player_id),
                }),
            });
            // Mise à jour locale
            setCharacters((prev) => [
                ...prev,
                {
                    id: Date.now().toString(), // ID fictif
                    ...character,
                    roleLabel: roleIdToString(character.role_id),
                    classLabel: classes[character.class_id]?.label || "Inconnu",
                },
            ]);
        } catch (error) {
            console.error("Erreur lors de la création du personnage :", error);
        }
    };

    // Ajout du perso sélectionné à une équipe (mock)
    const handleAddToTeam = async (teamId, character) => {
        console.log(`Ajout du perso ${character.id} à l'équipe ${teamId}`);
        // Ex: POST /teams/{teamId}/characters
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Personnages</h2>
                    <p className="text-gray-400">
                        Gérez vos personnages et ajoutez-les à des équipes
                    </p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="
            px-4 py-2 
            rounded-lg 
            bg-amber-500 
            hover:bg-amber-600 
            text-white 
            transition-colors 
            flex items-center gap-2
          "
                >
                    <Plus className="h-5 w-5" />
                    Créer un personnage
                </button>
            </div>

            {/* Barre de recherche */}
            <div className="flex gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un personnage..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="
              w-full 
              bg-slate-800 
              border 
              border-slate-700 
              rounded-lg 
              py-2 pl-10 pr-4 
              text-white
              outline-none
              focus:border-amber-500
              transition-colors
            "
                    />
                </div>
            </div>

            {/* Cards de personnages avec gradient au hover */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCharacters.map((character) => {
                    const icon = roleIcons[character.roleLabel] || "❓";

                    return (
                        <div
                            key={character.id}
                            className="
                group
                relative
                rounded-xl 
                border 
                border-slate-700 
                bg-slate-800 
                p-4 
                shadow-sm
                hover:shadow-amber-500/30
                hover:border-amber-500/30
                transition-all
                overflow-hidden
              "
                        >
                            {/* Gradient deco (apparait au survol) */}
                            <div
                                className="
                  absolute 
                  inset-0
                  pointer-events-none
                  bg-gradient-to-tr 
                  from-amber-500/10 
                  via-transparent 
                  to-slate-900/40
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  rounded-xl
                "
                            />

                            {/* En-tête / nom */}
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl">{icon}</span>
                                        <h3 className="text-xl font-bold text-white">
                                            {character.name}
                                        </h3>
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        {character.classLabel} • iLvl{" "}
                                        {character.ilvl}
                                    </p>
                                </div>
                                {/* Bouton pour ajouter à l'équipe */}
                                <button
                                    onClick={() => {
                                        setSelectedCharacter(character);
                                        setShowAddToTeamModal(true);
                                    }}
                                    className="text-amber-500 hover:text-amber-400 transition-colors"
                                    title="Ajouter à une équipe"
                                >
                                    <UserPlus className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Badges / Stats */}
                            <div className="flex flex-wrap gap-2 mt-2 relative z-10">
                                <span
                                    className="
                    px-3 py-1 
                    text-sm 
                    rounded-full 
                    bg-slate-700 
                    text-white
                  "
                                >
                                    {character.roleLabel
                                        .charAt(0)
                                        .toUpperCase() +
                                        character.roleLabel.slice(1)}
                                </span>
                                <span
                                    className="
                    px-3 py-1 
                    text-sm 
                    rounded-full 
                    bg-slate-700 
                    text-white
                  "
                                >
                                    RIO {character.rio}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal création */}
            {showCreateModal && (
                <CreateCharacter
                    onClose={() => setShowCreateModal(false)}
                    onSave={handleCreateCharacter}
                />
            )}

            {/* Modal ajout à l'équipe */}
            {showAddToTeamModal && selectedCharacter && (
                <AddToTeam
                    character={selectedCharacter}
                    teams={mockTeams}
                    onClose={() => {
                        setShowAddToTeamModal(false);
                        setSelectedCharacter(null);
                    }}
                    onSave={handleAddToTeam}
                />
            )}
        </div>
    );
}
