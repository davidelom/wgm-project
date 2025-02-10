import { useState } from "react";
import TeamCard from "../components/TeamCard";
import { Search, Filter, Plus } from "lucide-react";

// Sample data
const teams = [
    {
        name: "Azeroth Avengers",
        members: [
            {
                name: "Swift Falcon",
                class: "paladin",
                role: "tank",
                classLabel: "Paladin",
            },
            {
                name: "Mighty Lion",
                class: "priest",
                role: "healer",
                classLabel: "Prêtre",
            },
            {
                name: "Ancient Phoenix",
                class: "mage",
                role: "damage",
                classLabel: "Mage",
            },
            {
                name: "Daring Shadow",
                class: "rogue",
                role: "damage",
                classLabel: "Voleur",
            },
            {
                name: "Fierce Storm",
                class: "warlock",
                role: "damage",
                classLabel: "Démoniste",
            },
        ],
        rating: 2500,
        achievements: [
            "Winner - Dragon Isle Tournament 2024",
            "Top 3 - Battle for Azeroth Cup",
        ],
        avatarUrl:
            "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80",
    },
    {
        name: "Storm Raiders",
        members: [
            {
                name: "Thunder Blade",
                class: "warrior",
                role: "tank",
                classLabel: "Guerrier",
            },
            {
                name: "Nature's Wrath",
                class: "druid",
                role: "healer",
                classLabel: "Druide",
            },
            {
                name: "Shadow Hunter",
                class: "hunter",
                role: "damage",
                classLabel: "Chasseur",
            },
            {
                name: "Frost Weaver",
                class: "mage",
                role: "damage",
                classLabel: "Mage",
            },
            {
                name: "Soul Reaper",
                class: "warlock",
                role: "damage",
                classLabel: "Démoniste",
            },
        ],
        rating: 2350,
        achievements: [
            "Runner-up - Shadowlands Championship",
            "Most Valuable Team - Season 8",
        ],
        avatarUrl:
            "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80",
    },
    {
        name: "Horde Elite",
        members: [
            {
                name: "Blood Guard",
                class: "death-knight",
                role: "tank",
                classLabel: "Chevalier de la mort",
            },
            {
                name: "Spirit Mender",
                class: "shaman",
                role: "healer",
                classLabel: "Chaman",
            },
            {
                name: "Void Walker",
                class: "priest",
                role: "damage",
                classLabel: "Prêtre",
            },
            {
                name: "Storm Archer",
                class: "hunter",
                role: "damage",
                classLabel: "Chasseur",
            },
            {
                name: "Fel Blade",
                class: "demon-hunter",
                role: "damage",
                classLabel: "Chasseur de démons",
            },
        ],
        rating: 2200,
        achievements: [
            "Winner - Arena Championship 2023",
            "Perfect Season Record - Season 7",
        ],
        avatarUrl:
            "https://images.unsplash.com/photo-1612404730960-5c71577fca11?auto=format&fit=crop&q=80",
    },
];

const classColors = {
    warrior: "from-[#C79C6E] to-[#8F7450]",
    paladin: "from-[#F58CBA] to-[#BE6A92]",
    hunter: "from-[#ABD473] to-[#7BA350]",
    rogue: "from-[#FFF569] to-[#CCC44F]",
    priest: "from-[#FFFFFF] to-[#CCCCCC]",
    shaman: "from-[#0070DE] to-[#0058AE]",
    mage: "from-[#69CCF0] to-[#4FA8CC]",
    warlock: "from-[#9482C9] to-[#7666A5]",
    monk: "from-[#00FF96] to-[#00CC78]",
    druid: "from-[#FF7D0A] to-[#CC6408]",
    "demon-hunter": "from-[#A330C9] to-[#8226A1]",
    "death-knight": "from-[#C41F3B] to-[#9D182F]",
};

const roleIcons = {
    tank: "🛡️",
    healer: "💚",
    damage: "⚔️",
};

export default function Teams() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Teams</h2>
                    <p className="text-gray-400">
                        Browse and manage World of Warcraft tournament teams
                    </p>
                </div>
                <button className="btn btn-primary flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create Team
                </button>
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
                {teams
                    .filter(
                        (team) =>
                            team.name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                            team.members.some(
                                (member) =>
                                    member.name
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase()) ||
                                    member.classLabel
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase())
                            )
                    )
                    .map((team, index) => (
                        <TeamCard
                            key={index}
                            {...team}
                            classColors={classColors}
                            roleIcons={roleIcons}
                        />
                    ))}
            </div>
        </div>
    );
}
