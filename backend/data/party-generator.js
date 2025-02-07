const generatorData = require('./generator-datas');

const generateRandomName = () => {
    const adjective = generatorData.adjectives[Math.floor(Math.random() * generatorData.adjectives.length)];
    const noun = generatorData.nouns[Math.floor(Math.random() * generatorData.adjectives.length)];
    return `${adjective} ${noun}`;
}

const generateParties = (number) => {
    const requiredRoles = ['tank', 'healer', 'damage', 'damage', 'damage'];
    const parties = []
    for (let i = 0; i < number; i++) {

        const party = requiredRoles.map((role) => {
            const name = generateRandomName();
            const classes = generatorData.classes
            const validClasses = Object.entries(classes).filter(([className, classData]) => {
                return classData.roles.includes(role)
            })
            const randomIndex = Math.floor(Math.random() * validClasses.length);
            const [selectedClass, classData] = validClasses[randomIndex];
            return {
                name,
                class: selectedClass,
                role: role,
                classLabel: classData.labels.fr
            }
        })
        parties.push(party);
    }
    return parties
}

const parties = generateParties(5)
console.log(parties)