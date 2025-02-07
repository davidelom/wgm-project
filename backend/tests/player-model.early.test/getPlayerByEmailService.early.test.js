// Unit tests for: getPlayerByEmailService

const { getPlayerByEmailService } = require("../../models/player-model");
const pool = require("../../config/db");

// Import necessary modules
// Mock the pool.query method
jest.mock("../../config/db", () => ({
    query: jest.fn(),
}));

describe("getPlayerByEmailService() getPlayerByEmailService method", () => {
    // Happy Path Tests
    describe("Happy Paths", () => {
        it("should return a player object when a valid email is provided", async () => {
            // Arrange
            const mockEmail = "test@example.com";
            const mockPlayer = {
                id: 1,
                email: mockEmail,
                username: "testuser",
            };
            pool.query.mockResolvedValueOnce({ rows: [mockPlayer] });

            // Act
            const result = await getPlayerByEmailService(mockEmail);

            // Assert
            expect(pool.query).toHaveBeenCalledWith(
                "SELECT * FROM players WHERE email = $1",
                [mockEmail]
            );
            expect(result).toEqual(mockPlayer);
        });

        it("should return null when no player is found with the given email", async () => {
            // Arrange
            const mockEmail = "nonexistent@example.com";
            pool.query.mockResolvedValueOnce({ rows: [] });

            // Act
            const result = await getPlayerByEmailService(mockEmail);

            // Assert
            expect(pool.query).toHaveBeenCalledWith(
                "SELECT * FROM players WHERE email = $1",
                [mockEmail]
            );
            expect(result).toBeUndefined();
        });
    });

    // Edge Case Tests
    describe("Edge Cases", () => {
        it("should handle SQL injection attempts gracefully", async () => {
            // Arrange
            const maliciousEmail = "'; DROP TABLE players; --";
            pool.query.mockResolvedValueOnce({ rows: [] });

            // Act
            const result = await getPlayerByEmailService(maliciousEmail);

            // Assert
            expect(pool.query).toHaveBeenCalledWith(
                "SELECT * FROM players WHERE email = $1",
                [maliciousEmail]
            );
            expect(result).toBeUndefined();
        });

        it("should handle database errors gracefully", async () => {
            // Arrange
            const mockEmail = "error@example.com";
            const mockError = new Error("Database error");
            pool.query.mockRejectedValueOnce(mockError);

            // Act & Assert
            await expect(getPlayerByEmailService(mockEmail)).rejects.toThrow(
                "Database error"
            );
        });

        it("should return undefined for an empty email string", async () => {
            // Arrange
            const emptyEmail = "";
            pool.query.mockResolvedValueOnce({ rows: [] });

            // Act
            const result = await getPlayerByEmailService(emptyEmail);

            // Assert
            expect(pool.query).toHaveBeenCalledWith(
                "SELECT * FROM players WHERE email = $1",
                [emptyEmail]
            );
            expect(result).toBeUndefined();
        });

        it("should return undefined for a null email", async () => {
            // Arrange
            const nullEmail = null;
            pool.query.mockResolvedValueOnce({ rows: [] });

            // Act
            const result = await getPlayerByEmailService(nullEmail);

            // Assert
            expect(pool.query).toHaveBeenCalledWith(
                "SELECT * FROM players WHERE email = $1",
                [nullEmail]
            );
            expect(result).toBeUndefined();
        });
    });
});

// End of unit tests for: getPlayerByEmailService
