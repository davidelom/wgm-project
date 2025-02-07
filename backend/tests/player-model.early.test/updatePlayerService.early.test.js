// Unit tests for: updatePlayerService

const { updatePlayerService } = require("../../models/player-model");
const pool = require("../../config/db");

jest.mock("../../config/db");

describe("updatePlayerService() updatePlayerService method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Happy Path Tests
    describe("Happy Paths", () => {
        it("should update a player with valid fields and return the updated player", async () => {
            // Arrange
            const id = 1;
            const updatedFields = {
                username: "newUsername",
                email: "newEmail@example.com",
            };
            const expectedResult = { id, ...updatedFields };

            pool.query.mockResolvedValueOnce({ rows: [expectedResult] });

            // Act
            const result = await updatePlayerService(id, updatedFields);

            // Assert
            expect(pool.query).toHaveBeenCalledWith(
                "UPDATE players SET username = $1, email = $2 WHERE id = $3 RETURNING *",
                ["newUsername", "newEmail@example.com", id]
            );
            expect(result).toEqual(expectedResult);
        });

        it("should update a player with a single field and return the updated player", async () => {
            // Arrange
            const id = 2;
            const updatedFields = { email: "updatedEmail@example.com" };
            const expectedResult = { id, ...updatedFields };

            pool.query.mockResolvedValueOnce({ rows: [expectedResult] });

            // Act
            const result = await updatePlayerService(id, updatedFields);

            // Assert
            expect(pool.query).toHaveBeenCalledWith(
                "UPDATE players SET email = $1 WHERE id = $2 RETURNING *",
                ["updatedEmail@example.com", id]
            );
            expect(result).toEqual(expectedResult);
        });
    });

    // Edge Case Tests
    describe("Edge Cases", () => {
        it("should throw an error if no fields are provided for update", async () => {
            // Arrange
            const id = 3;
            const updatedFields = {};

            // Act & Assert
            await expect(
                updatePlayerService(id, updatedFields)
            ).rejects.toThrow("Aucune donnée à mettre à jour");
        });

        it("should handle undefined fields gracefully by ignoring them", async () => {
            // Arrange
            const id = 4;
            const updatedFields = {
                username: undefined,
                email: "validEmail@example.com",
            };
            const expectedResult = { id, email: "validEmail@example.com" };

            pool.query.mockResolvedValueOnce({ rows: [expectedResult] });

            // Act
            const result = await updatePlayerService(id, updatedFields);

            // Assert
            expect(pool.query).toHaveBeenCalledWith(
                "UPDATE players SET email = $1 WHERE id = $2 RETURNING *",
                ["validEmail@example.com", id]
            );
            expect(result).toEqual(expectedResult);
        });

        it("should return null if the player does not exist", async () => {
            // Arrange
            const id = 5;
            const updatedFields = { email: "nonExistentEmail@example.com" };

            pool.query.mockResolvedValueOnce({ rows: [] });

            // Act
            const result = await updatePlayerService(id, updatedFields);

            // Assert
            expect(pool.query).toHaveBeenCalledWith(
                "UPDATE players SET email = $1 WHERE id = $2 RETURNING *",
                ["nonExistentEmail@example.com", id]
            );
            expect(result).toBeUndefined();
        });
    });
});

// End of unit tests for: updatePlayerService
