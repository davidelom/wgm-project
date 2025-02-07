// Unit tests for: getAllPlayersService

const { getAllPlayersService } = require("../../models/player-model");
const pool = require("../../config/db");

// Import necessary modules
// Mock the pool.query method
jest.mock("../../config/db", () => ({
    query: jest.fn(),
}));

describe("getAllPlayersService() getAllPlayersService method", () => {
    // Happy Path Tests
    describe("Happy Paths", () => {
        it("should return an array of players when the query is successful", async () => {
            // Arrange: Set up the mock return value for a successful query
            const mockPlayers = [
                { id: 1, username: "Player1", email: "player1@example.com" },
                { id: 2, username: "Player2", email: "player2@example.com" },
            ];
            pool.query.mockResolvedValue({ rows: mockPlayers });

            // Act: Call the service function
            const result = await getAllPlayersService();

            // Assert: Verify the result matches the expected output
            expect(result).toEqual(mockPlayers);
            expect(pool.query).toHaveBeenCalledWith("SELECT * FROM players");
        });
    });

    // Edge Case Tests
    describe("Edge Cases", () => {
        it("should return an empty array when there are no players in the database", async () => {
            // Arrange: Set up the mock return value for an empty result
            pool.query.mockResolvedValue({ rows: [] });

            // Act: Call the service function
            const result = await getAllPlayersService();

            // Assert: Verify the result is an empty array
            expect(result).toEqual([]);
            expect(pool.query).toHaveBeenCalledWith("SELECT * FROM players");
        });

        it("should handle database query errors gracefully", async () => {
            // Arrange: Set up the mock to throw an error
            const mockError = new Error("Database query failed");
            pool.query.mockRejectedValue(mockError);

            // Act & Assert: Call the service function and expect it to throw an error
            await expect(getAllPlayersService()).rejects.toThrow(
                "Database query failed"
            );
            expect(pool.query).toHaveBeenCalledWith("SELECT * FROM players");
        });
    });
});

// End of unit tests for: getAllPlayersService
