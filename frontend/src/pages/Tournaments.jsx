import TournamentCard from "../components/TournamentCard";

const tournaments = [
    {
        name: "Battle for Azeroth Cup",
        date: "March 15, 2024",
        teamCount: 32,
        prizePool: "50,000 Gold",
        backgroundUrl:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
    },
    {
        name: "Shadowlands Championship",
        date: "April 1, 2024",
        teamCount: 16,
        prizePool: "25,000 Gold",
        backgroundUrl:
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80",
    },
    {
        name: "Dragon Isle Tournament",
        date: "April 15, 2024",
        teamCount: 24,
        prizePool: "35,000 Gold",
        backgroundUrl:
            "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&q=80",
    },
];
function Tournaments() {
    return (
        <>
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Active Tournaments</h2>
                <p className="text-gray-400">
                    Join or create tournaments and compete with other teams
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map((tournament) => (
                    <TournamentCard key={tournament.name} {...tournament} />
                ))}
            </div>
        </>
    );
}

export default Tournaments;
