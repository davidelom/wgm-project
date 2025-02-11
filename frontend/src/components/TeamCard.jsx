import { Users, Trophy, Shield } from "lucide-react";
import PropTypes from "prop-types";

// Quelques avatars par défaut
const defaultAvatars = [
    "/images/default1.jpg",
    "/images/default2.jpg",
    "/images/default3.jpg",
    // etc.
];

function TeamCard({
    partyId,
    partyName,
    characters,
    avatarUrl,
    classColors,
    roleIcons,
    onDeleteTeam,
}) {
    if (!characters) {
        characters = [];
    }
    // Calcul de la moyenne d’ilvl
    let averageIlvl = 0;
    let averageRio = 0;
    if (characters && characters.length) {
        averageIlvl = characters.length
            ? Math.round(
                  characters.reduce((sum, char) => sum + char.ilvl, 0) /
                      characters.length
              )
            : 0;

        averageRio = characters.length
            ? Math.round(
                  characters.reduce((sum, char) => sum + char.rio, 0) /
                      characters.length
              )
            : 0;
    }

    // Calcul de la moyenne RIO

    // Sélectionner un avatar par défaut si avatarUrl est absent
    const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
    const fallbackAvatar = defaultAvatars[randomIndex];
    const finalAvatarUrl = avatarUrl || fallbackAvatar;

    return (
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-colors">
            <div className="p-6">
                {/* En-tête : nom de l’équipe + nombre de membres */}
                <div className="flex items-center gap-4 mb-4">
                    <div
                        className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-amber-500 shadow-sm"
                        style={{
                            backgroundImage: `url(${finalAvatarUrl})`,
                        }}
                    />
                    <div>
                        <h3 className="text-xl font-bold">{partyName}</h3>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Users className="h-4 w-4" />
                            {characters && (
                                <span>{characters.length} Members</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats d’équipe */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-amber-500" />
                            <span className="text-gray-300">Avg iLvl</span>
                        </div>
                        <span className="text-amber-500 font-bold">
                            {averageIlvl}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-amber-500" />
                            <span className="text-gray-300">Avg RIO</span>
                        </div>
                        <span className="text-amber-500 font-bold">
                            {averageRio}
                        </span>
                    </div>

                    {/* Composition */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-amber-500" />
                            <span className="text-gray-300">
                                Team Composition
                            </span>
                        </div>
                        <div className="space-y-2">
                            {characters.map((member) => {
                                const classInfo = classColors[member.class_id];
                                if (!classInfo) {
                                    // fallback si la classe n'est pas trouvée
                                    return (
                                        <div
                                            key={member.character_id}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-base">
                                                    {roleIcons[member.role_id]}
                                                </span>
                                                <span className="font-medium text-gray-100">
                                                    {member.name}
                                                </span>
                                            </div>
                                            <span className="text-gray-400">
                                                iLvl {member.ilvl}, RIO{" "}
                                                {member.rio}
                                            </span>
                                        </div>
                                    );
                                }
                                const { gradient } = classInfo;
                                const textStyle = gradient
                                    ? {
                                          background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`,
                                          WebkitBackgroundClip: "text",
                                          color: "transparent",
                                      }
                                    : {};
                                return (
                                    <div
                                        key={member.character_id}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-base">
                                                {roleIcons[member.role_id]}
                                            </span>
                                            <span
                                                style={textStyle}
                                                className="font-medium"
                                            >
                                                {member.name}
                                            </span>
                                        </div>
                                        <span className="text-gray-400">
                                            iLvl {member.ilvl}, RIO {member.rio}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Boutons d'action */}
                <div className="mt-6 flex flex-wrap gap-2">
                    <button
                        className="
              flex-1
              bg-amber-600 
              hover:bg-amber-700
              text-white
              font-semibold
              rounded-md
              px-3
              py-2
              text-sm
              transition-colors
              focus:outline-none 
              focus:ring-2 
              focus:ring-amber-400
            "
                    >
                        View Details
                    </button>

                    <button
                        className="
              bg-blue-600 
              hover:bg-blue-700
              text-white
              font-semibold
              rounded-md
              px-3
              py-2
              text-sm
              transition-colors
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-400
            "
                    >
                        Challenge
                    </button>

                    <button
                        className="
              bg-red-600 
              hover:bg-red-700
              text-white
              font-semibold
              rounded-md
              px-3
              py-2
              text-sm
              transition-colors
              focus:outline-none 
              focus:ring-2 
              focus:ring-red-400
            "
                        onClick={() => onDeleteTeam(partyId)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

TeamCard.propTypes = {
    partyId: PropTypes.number.isRequired,
    partyName: PropTypes.string.isRequired,
    characters: PropTypes.arrayOf(
        PropTypes.shape({
            character_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            class_id: PropTypes.number.isRequired,
            role_id: PropTypes.number.isRequired,
            ilvl: PropTypes.number.isRequired,
            rio: PropTypes.number.isRequired,
        })
    ).isRequired,
    avatarUrl: PropTypes.string,
    classColors: PropTypes.object.isRequired,
    roleIcons: PropTypes.objectOf(PropTypes.node).isRequired,
    onDeleteTeam: PropTypes.func.isRequired,
};

export default TeamCard;
