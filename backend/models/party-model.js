const pool = require("../config/db");
const { generateParties } = require("../data/party-generator");
const getAllPartiesService = async () => {
    const result = await pool.query("SELECT * FROM parties");
    return result.rows;
};

const getPartyByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM parties WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
};

const createPartyService = async (party) => {
    console.log(party);

    try {
        const partyRes = await pool.query(
            "INSERT INTO parties (party_name) VALUES ($1) RETURNING id",
            [party.party_name]
        );
        const partyId = partyRes.rows[0].id;

        for (const member of party.characters) {
            await pool.query(
                "INSERT INTO compose (parties_id, characters_id) VALUES ($1, $2)",
                [partyId, member.character_id]
            );
        }
        return partyRes.rows[0];
    } catch (error) {
        console.error(error);
    }
};

const addPartyToTournamentService = async (tournament_id, party_id) => {
    // Vérifier si le tournoi existe
    const tournamentExists = await pool.query(
        "SELECT id FROM tournament WHERE id = $1",
        [tournament_id]
    );
    if (tournamentExists.rowCount === 0) {
        throw new Error("Le tournoi spécifié n'existe pas.");
    }

    // Vérifier si la partie existe
    const partyExists = await pool.query(
        "SELECT id FROM parties WHERE id = $1",
        [party_id]
    );
    if (partyExists.rowCount === 0) {
        throw new Error("La partie spécifiée n'existe pas.");
    }

    // Vérifier si la partie est déjà inscrite au tournoi
    const alreadyRegistered = await pool.query(
        "SELECT * FROM registered WHERE tournament_id = $1 AND party_id = $2",
        [tournament_id, party_id]
    );
    if (alreadyRegistered.rowCount > 0) {
        throw new Error("Cette partie est déjà inscrite à ce tournoi.");
    }

    // Inscrire la partie au tournoi
    const result = await pool.query(
        "INSERT INTO registered (tournament_id, party_id, registration_date) VALUES ($1, $2, NOW()) RETURNING *",
        [tournament_id, party_id]
    );
    return result.rows[0];
};

const updatePartyService = async (id, party) => {
    const result = await pool.query(
        "UPDATE parties SET name = $1, date = $2, time = $3, location = $4, description = $5 WHERE id = $6 RETURNING *",
        [
            party.name,
            party.date,
            party.time,
            party.location,
            party.description,
            id,
        ]
    );
    return result.rows[0];
};

const deletePartyService = async (id) => {
    const result = await pool.query("DELETE FROM parties WHERE id = $1", [id]);
    return result.rows[0];
};

const saveGeneratedPartiesService = async (nb) => {
    const parties = await generateParties(nb);
    console.log("parties", parties);

    for (const party of parties) {
        try {
            const partyRes = await pool.query(
                "INSERT INTO parties (party_name) VALUES ($1) RETURNING id",
                [party.name]
            );
            const partyId = partyRes.rows[0].id;

            for (const member of party.characters) {
                const classRes = await pool.query(
                    "SELECT id FROM classes WHERE label = $1",
                    [member.classLabel]
                );
                const classId = classRes.rows[0].id;

                const roleRes = await pool.query(
                    "SELECT id FROM roles WHERE label = $1",
                    [member.role]
                );

                const roleId = roleRes.rows[0].id;

                const charRes = await pool.query(
                    "INSERT INTO characters (name, class_id, role_id, ilvl, rio) VALUES ($1, $2, $3, $4, $5) RETURNING id",
                    [
                        member.name,
                        classId,
                        roleId,
                        Math.floor(Math.random() * 645),
                        Math.floor(Math.random() * 4500),
                    ]
                );
                const characterId = charRes.rows[0].id;

                await pool.query(
                    "INSERT INTO compose (parties_id, characters_id) VALUES ($1, $2)",
                    [partyId, characterId]
                );
            }
            return parties;
        } catch (error) {
            console.error(error);
        }
    }
};

const getAllPartiesWithCharactersService = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                p.id AS party_id,
                p.party_name,
                c.id AS character_id,
                c.name AS character_name,
                c.class_id,
                c.role_id,
                c.ilvl,
                c.rio
            FROM parties p
            JOIN compose cp ON p.id = cp.parties_id
            JOIN characters c ON cp.characters_id = c.id
            ORDER BY p.id, c.id;
        `);

        // Regrouper les personnages par partie
        const parties = {};
        result.rows.forEach((row) => {
            if (!parties[row.party_id]) {
                parties[row.party_id] = {
                    party_id: row.party_id,
                    party_name: row.party_name,
                    characters: [],
                };
            }
            parties[row.party_id].characters.push({
                character_id: row.character_id,
                name: row.character_name,
                class_id: row.class_id,
                role_id: row.role_id,
                ilvl: row.ilvl,
                rio: row.rio,
            });
        });

        return Object.values(parties);
    } catch (error) {
        console.error("Erreur lors de la récupération des parties :", error);
        throw new Error("Erreur lors de la récupération des parties");
    }
};

module.exports = {
    getAllPartiesService,
    getPartyByIdService,
    createPartyService,
    updatePartyService,
    deletePartyService,
    addPartyToTournamentService,
    saveGeneratedPartiesService,
    getAllPartiesWithCharactersService,
};
