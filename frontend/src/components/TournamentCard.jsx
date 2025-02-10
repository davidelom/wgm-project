import { Calendar, Users, Trophy } from "lucide-react";
import PropTypes from 'prop-types';

export default function TournamentCard({
    name,
    date,
    teamCount,
    prizePool,
    backgroundUrl,
}) {
    return (
        <div className="relative group overflow-hidden rounded-xl">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
            <div className="relative p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2">{name}</h3>
                <div className="space-y-2 text-gray-300 flex-1">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{teamCount} Teams</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        <span className="text-amber-500">{prizePool}</span>
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 transition-colors text-white font-medium">
                        Join
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors text-white font-medium">
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}

TournamentCard.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    teamCount: PropTypes.number.isRequired,
    prizePool: PropTypes.string.isRequired,
    backgroundUrl: PropTypes.string.isRequired,
};

