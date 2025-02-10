import { Users, Trophy, Shield, Star } from "lucide-react";
import PropTypes from "prop-types";
function TeamCard({
    name,
    members,
    rating,
    achievements,
    avatarUrl,
    classColors,
    roleIcons,
}) {
    return (
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-colors">
            <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div
                        className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-amber-500"
                        style={{ backgroundImage: `url(${avatarUrl})` }}
                    />
                    <div>
                        <h3 className="text-xl font-bold">{name}</h3>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Users className="h-4 w-4" />
                            <span>{members.length} Members</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-amber-500" />
                            <span className="text-gray-300">Rating</span>
                        </div>
                        <span className="text-amber-500 font-bold">
                            {rating}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-amber-500" />
                            <span className="text-gray-300">
                                Team Composition
                            </span>
                        </div>
                        <div className="space-y-2">
                            {members.map((member, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">
                                            {roleIcons[member.role]}
                                        </span>
                                        <span
                                            className={`bg-gradient-to-r ${
                                                classColors[member.class]
                                            } bg-clip-text text-transparent font-medium`}
                                        >
                                            {member.name}
                                        </span>
                                    </div>
                                    <span className="text-gray-400">
                                        {member.classLabel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span className="text-gray-300">
                                Recent Achievements
                            </span>
                        </div>
                        <div className="space-y-1">
                            {achievements.map((achievement, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 text-sm text-gray-400"
                                >
                                    <Star className="h-3 w-3" />
                                    <span>{achievement}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex gap-2">
                    <button className="flex-1 btn btn-primary">
                        View Details
                    </button>
                    <button className="btn btn-secondary">Challenge</button>
                </div>
            </div>
        </div>
    );
}

TeamCard.propTypes = {
    name: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
            class: PropTypes.string.isRequired,
            classLabel: PropTypes.string.isRequired,
        })
    ).isRequired,
    rating: PropTypes.number.isRequired,
    achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
    avatarUrl: PropTypes.string.isRequired,
    classColors: PropTypes.objectOf(PropTypes.string).isRequired,
    roleIcons: PropTypes.objectOf(PropTypes.node).isRequired,
};

export default TeamCard;
