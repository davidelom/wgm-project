const generatorData = require("./generator-datas");

const generateRandomName = () => {
    const adjective =
        generatorData.adjectives[
            Math.floor(Math.random() * generatorData.adjectives.length)
        ];
    const noun =
        generatorData.nouns[
            Math.floor(Math.random() * generatorData.nouns.length)
        ];
    return `${adjective} ${noun}`;
};

const generateParties = async (number) => {
    const requiredRoles = ["tank", "healer", "damage", "damage", "damage"];
    const parties = [];

    for (let i = 0; i < number; i++) {
        const characters = requiredRoles
            .map((role) => {
                const name = generateRandomName();

                // Vérifier si les données sont bien importées
                if (!generatorData || !generatorData.classes) {
                    console.error(
                        "Erreur: Les données du générateur ne sont pas disponibles."
                    );
                    return null;
                }

                const classes = generatorData.classes;
                const validClasses = Object.entries(classes).filter(
                    ([className, classData]) => classData.roles.includes(role)
                );

                if (validClasses.length === 0) {
                    console.error(
                        `Aucune classe trouvée pour le rôle : ${role}`
                    );
                    return null;
                }

                const randomIndex = Math.floor(
                    Math.random() * validClasses.length
                );
                const [selectedClass, classData] = validClasses[randomIndex];

                return {
                    name,
                    class: selectedClass,
                    role: role,
                    classLabel: classData.labels.fr,
                };
            })
            .filter(Boolean); // Supprime les entrées nulles en cas d'erreur

        const party = {
            name: generateRandomName(),
            characters,
        };

        parties.push(party);
    }

    return parties;
};

module.exports = { generateParties };
