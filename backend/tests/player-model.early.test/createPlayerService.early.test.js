// Unit tests for: createPlayerService

const { createPlayerService } = require("../../models/player-model");
const pool = require("../../config/db");
const bcrypt = require("bcrypt");

jest.mock("../../config/db");
jest.mock("bcrypt");

describe("createPlayerService() createPlayerService method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("Happy Paths", () => {
        it("should create a player successfully with valid inputs", async () => {
            // Arrange
            const username = "testuser";
            const email = "test@example.com";
            const password = "password123";
            const hashedPassword = "hashedPassword123";
            const mockResult = { rows: [{ id: 1, username, email }] };

            bcrypt.genSalt.mockResolvedValue("salt");
            bcrypt.hash.mockResolvedValue(hashedPassword);
            pool.query.mockResolvedValue(mockResult);

            // Act
            const result = await createPlayerService(username, email, password);

            // Assert
            expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
            expect(bcrypt.hash).toHaveBeenCalledWith(password, "salt");
            expect(pool.query).toHaveBeenCalledWith(
                "INSERT INTO players (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                [username, email, hashedPassword]
            );
            expect(result).toEqual(mockResult.rows[0]);
        });
    });

    describe("Edge Cases", () => {
        it("should handle database query failure gracefully", async () => {
            // Arrange
            const username = "testuser";
            const email = "test@example.com";
            const password = "password123";
            const hashedPassword = "hashedPassword123";

            bcrypt.genSalt.mockResolvedValue("salt");
            bcrypt.hash.mockResolvedValue(hashedPassword);
            pool.query.mockRejectedValue(new Error("Database error"));

            // Act & Assert
            await expect(
                createPlayerService(username, email, password)
            ).rejects.toThrow("Database error");
        });

        it("should handle bcrypt failure gracefully", async () => {
            // Arrange
            const username = "testuser";
            const email = "test@example.com";
            const password = "password123";

            bcrypt.genSalt.mockResolvedValue("salt");
            bcrypt.hash.mockRejectedValue(new Error("Bcrypt error"));

            // Act & Assert
            await expect(
                createPlayerService(username, email, password)
            ).rejects.toThrow("Bcrypt error");
        });
    });
});

// End of unit tests for: createPlayerService
