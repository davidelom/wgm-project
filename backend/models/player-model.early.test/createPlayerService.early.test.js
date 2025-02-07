// Unit tests for: createPlayerService

const { createPlayerService } = require("../player-model");
const pool = require("../../config/db");
const bcrypt = require("bcrypt");

// Import necessary modules
// Mock the dependencies
jest.mock("../../config/db", () => ({
    query: jest.fn(),
}));

jest.mock("bcrypt", () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
}));

describe("createPlayerService() createPlayerService method", () => {
    // Happy path tests
    describe("Happy Paths", () => {
        it("should create a player successfully with valid inputs", async () => {
            // Arrange
            const username = "testuser";
            const email = "test@example.com";
            const password = "password123";
            const salt = "randomSalt";
            const passwordHash = "hashedPassword";
            const expectedPlayer = {
                id: 1,
                username,
                email,
                password: passwordHash,
            };

            bcrypt.genSalt.mockResolvedValue(salt);
            bcrypt.hash.mockResolvedValue(passwordHash);
            pool.query.mockResolvedValue({ rows: [expectedPlayer] });

            // Act
            const result = await createPlayerService(username, email, password);

            // Assert
            expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
            expect(bcrypt.hash).toHaveBeenCalledWith(password, salt);
            expect(pool.query).toHaveBeenCalledWith(
                "INSERT INTO players (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                [username, email, passwordHash]
            );
            expect(result).toEqual(expectedPlayer);
        });
    });

    // Edge case tests
    describe("Edge Cases", () => {
        it("should handle bcrypt genSalt failure", async () => {
            // Arrange
            const username = "testuser";
            const email = "test@example.com";
            const password = "password123";
            const errorMessage = "genSalt error";

            bcrypt.genSalt.mockRejectedValue(new Error(errorMessage));

            // Act & Assert
            await expect(
                createPlayerService(username, email, password)
            ).rejects.toThrow(errorMessage);
        });

        it("should handle bcrypt hash failure", async () => {
            // Arrange
            const username = "testuser";
            const email = "test@example.com";
            const password = "password123";
            const salt = "randomSalt";
            const errorMessage = "hash error";

            bcrypt.genSalt.mockResolvedValue(salt);
            bcrypt.hash.mockRejectedValue(new Error(errorMessage));

            // Act & Assert
            await expect(
                createPlayerService(username, email, password)
            ).rejects.toThrow(errorMessage);
        });

        it("should handle database query failure", async () => {
            // Arrange
            const username = "testuser";
            const email = "test@example.com";
            const password = "password123";
            const salt = "randomSalt";
            const passwordHash = "hashedPassword";
            const errorMessage = "database error";

            bcrypt.genSalt.mockResolvedValue(salt);
            bcrypt.hash.mockResolvedValue(passwordHash);
            pool.query.mockRejectedValue(new Error(errorMessage));

            // Act & Assert
            await expect(
                createPlayerService(username, email, password)
            ).rejects.toThrow(errorMessage);
        });
    });
});

// End of unit tests for: createPlayerService
