const adjectives = [
    'Mighty',
    'Swift',
    'Ancient',
    'Brave',
    'Cunning',
    'Fierce',
    'Valiant',
    'Nimble',
    'Stealthy',
    'Fearless',
    'Daring',
    'Intrepid',
    'Resolute',
    'Gallant',
    'Stalwart',
    'Bold',
    'Luminous',
    'Radiant',
    'Mystic',
    'Savage'
];

const nouns = [
    'Lion',
    'Eagle',
    'Dragon',
    'Wolf',
    'Phoenix',
    'Tiger',
    'Bear',
    'Falcon',
    'Stallion',
    'Viper',
    'Griffin',
    'Hydra',
    'Serpent',
    'Raven',
    'Panther',
    'Hawk',
    'Leopard',
    'Cobra',
    'Ram',
    'Bull',
    'Knight',
    'Crusader',
    'Sentinel',
    'Ranger',
    'Avenger',
    'Barbarian',
    'Assassin',
    'Titan',
    'Storm',
    'Fury',
    'Justice',
    'Warden',
    'Soul',
    'Spirit',
    'Moon',
    'Star',
    'Sky',
    'Earth',
    'Ocean',
    'Wave',
    'Light',
    'Shadow',
    'Fire',
    'Ember',
    'Inferno',
    'Frost',
    'Blizzard',
    'Avalanche',
    'Thunder',
    'Lightning',
    'Bolt',
    'Tempest',
    'Zephyr',
    'Cyclone',
    'Vortex',
    'Mirage',
    'Echo',
    'Nova',
    'Comet',
    'Galaxy',
    'Cosmos',
    'Sword',
    'Axe',
    'Spear',
    'Bow',
    'Shield',
    'Hammer',
    'Lance',
    'Dagger',
    'Mace',
    'Flame',
    'Mystery',
    'Legend',
    'Myth',
    'Oracle',
    'Revenant',
    'Harbinger',
    'Specter',
    'Wraith',
    'Berserker',
    'Gladiator'
];



const classes = {
    warrior: {
        labels: {
            fr: "Guerrier",
            en: "Warrior"
        },
        roles: ['tank', 'damage']
    },
    paladin: {
        labels: {
            fr: "Paladin",
            en: "Paladin"
        },
        roles: ['tank', 'damage', 'healer']
    },
    hunter: {
        labels: {
            fr: "Chasseur",
            en: "Hunter"
        },
        roles: ['damage']
    },
    rogue: {
        labels: {
            fr: "Voleur",
            en: "Rogue"
        },
        roles: ['damage']
    },
    priest: {
        labels: {
            fr: "Prêtre",
            en: "Priest"
        },
        roles: ['damage', 'healer']
    },
    shaman: {
        labels: {
            fr: "Chaman",
            en: "Shaman"
        },
        roles: ['damage', 'healer']
    },
    mage: {
        labels: {
            fr: "Mage",
            en: "Mage"
        },
        roles: ['damage']
    },
    warlock: {
        labels: {
            fr: "Démoniste",
            en: "Warlock"
        },
        roles: ['damage']
    },
    monk: {
        labels: {
            fr: "Moine",
            en: "Monk"
        },
        roles: ['damage']
    },
    druid: {
        labels: {
            fr: "Druide",
            en: "Druid"
        },
        roles: ['tank', 'damage', 'healer']
    },
    dh: {
        labels: {
            fr: "Chasseur de démon",
            en: "Demon Hunter"
        },
        roles: ['tank', 'damage']
    },
    dk: {
        labels: {
            fr: "Chevalier de la mort",
            en: "Deat Knight"
        },
        roles: ['tank', 'damage']
    },
    evoker: {
        labels: {
            fr: "Évocateur",
            en: "Evoker"
        },
        roles: ['healer', 'damage']
    }
}


module.exports = { adjectives, nouns, classes }