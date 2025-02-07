// tests/init-db.early.test/initDB.early.test.js

const { initDB } = require("../../data/init-db");
const pool = require("../../config/db");

// On simule (mock) la méthode pool.query
jest.mock("../../config/db", () => ({
    query: jest.fn(),
}));

describe("initDB() function", () => {
    beforeEach(() => {
        // On réinitialise les appels avant chaque test
        pool.query.mockClear();
    });

    describe("Happy Paths", () => {
        it("should create tables and insert predefined data successfully", async () => {
            // Arrange : on simule un succès pour la création des tables...
            pool.query.mockResolvedValueOnce();
            // ...puis un succès pour l'insertion des données prédéfinies.
            pool.query.mockResolvedValueOnce();

            // Act : on appelle initDB()
            await initDB();

            // Assert : pool.query doit avoir été appelée 2 fois (1 pour createTables et 1 pour insertPredefinedData)
            expect(pool.query).toHaveBeenCalledTimes(2);
        });
    });

    describe("Edge Cases", () => {
        it("should handle errors during table creation gracefully", async () => {
            // Arrange : simuler une erreur lors de la création des tables (premier appel de pool.query)
            pool.query.mockRejectedValueOnce(new Error("Table creation error"));

            // Act : on appelle initDB()
            await initDB();

            // Assert : seul l'appel à createTables est effectué (donc pool.query a été appelée 1 fois)
            expect(pool.query).toHaveBeenCalledTimes(1);
        });

        it("should handle errors during predefined data insertion gracefully", async () => {
            // Arrange : simuler un succès pour la création des tables...
            pool.query.mockResolvedValueOnce();
            // ...puis une erreur lors de l'insertion des données prédéfinies (deuxième appel)
            pool.query.mockRejectedValueOnce(new Error("Data insertion error"));

            // Act : on appelle initDB()
            await initDB();

            // Assert : pool.query doit être appelée 2 fois (même si la seconde lève une erreur, elle est gérée)
            expect(pool.query).toHaveBeenCalledTimes(2);
        });
    });
});
