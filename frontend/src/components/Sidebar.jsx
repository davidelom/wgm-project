import { Trophy, Users, BarChart2, Settings, Swords, User } from "lucide-react";
import PropTypes from "prop-types";

const menuItems = [
    { icon: Trophy, label: "Tournaments", value: "tournaments" },
    { icon: Users, label: "Teams", value: "teams" },
    { icon: User, label: "Characters", value: "characters" },
    { icon: Swords, label: "Matches", value: "matches" },
    { icon: BarChart2, label: "Statistics", value: "statistics" },
    { icon: Settings, label: "Settings", value: "settings" },
];

export default function Sidebar({ onNavigate, currentPage }) {
    return (
        <aside className="w-64 bg-slate-800 border-r border-slate-700 p-4 hidden lg:block">
            <div className="flex flex-col h-full">
                <div className="space-y-6">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => onNavigate(item.value)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                currentPage === item.value
                                    ? "bg-amber-500/10 text-amber-500"
                                    : "text-gray-400 hover:bg-slate-700/50 hover:text-gray-100"
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}

Sidebar.propTypes = {
    onNavigate: PropTypes.func.isRequired,
    currentPage: PropTypes.string.isRequired,
};
