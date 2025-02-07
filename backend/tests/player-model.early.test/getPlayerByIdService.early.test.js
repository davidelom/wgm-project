// Unit tests for: getPlayerByIdService

const { getPlayerByIdService } = require("../../models/player-model");
const pool = require("../../config/db");

// Import necessary modules
// Mock the pool.query method
jest.mock("../../config/db", () => ({
    query: jest.fn(),
}));

describe("getPlayerByIdService() getPlayerByIdService method", () => {
    // Happy Path Tests
    describe("Happy Paths", () => {
        it("should return a player object when a valid ID is provided", async () => {
            // Arrange
            const mockId = 1;
            const mockPlayer = {
                id: 1,
                username: "testuser",
                email: "test@example.com",
            };
            pool.query.mockResolvedValueOnce({ rows: [mockPlayer] });

            // Act
            const result = await getPlayerByIdService(mockId);

            // Assert
            expect(pool.query).toHaveBeenCalledWith(
                "SELECT * FROM players WHERE id = $1",
                [mockId]
            );
            expect(result).toEqual(mockPlayer);
        });
    });

    // Edge Case Tests
    describe("Edge Cases", () => {
        it("should return undefined when no player is found for the given ID", async () => {
            // Arrange
            const mockId = 999; // Assuming this ID does not exist
            pool.query.mockResolvedValueOnce({ rows: [] });

            // Act
            const result = await getPlayerByIdService(mockId);

            // Assert
            expect(pool.query).toHaveBeenCalledWith(
                "SELECT * FROM players WHERE id = $1",
                [mockId]
            );
            expect(result).toBeUndefined();
        });

        it("should handle database errors gracefully", async () => {
            // Arrange
            const mockId = 1;
            const mockError = new Error("Database error");
            pool.query.mockRejectedValueOnce(mockError);

            // Act & Assert
            await expect(getPlayerByIdService(mockId)).rejects.toThrow(
                "Database error"
            );
            expect(pool.query).toHaveBeenCalledWith(
                "SELECT * FROM players WHERE id = $1",
                [mockId]
            );
        });

        it("should handle non-numeric ID inputs gracefully", async () => {
            // Arrange
            const mockId = "invalid-id";

            // Act & Assert
            await expect(getPlayerByIdService(mockId)).rejects.toThrow();
            expect(pool.query).toHaveBeenCalled();
        });
    });
});

// End of unit tests for: getPlayerByIdService
