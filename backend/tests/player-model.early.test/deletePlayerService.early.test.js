// Unit tests for: deletePlayerService

const { deletePlayerService } = require("../../models/player-model");
const pool = require("../../config/db");

// Import necessary modules
// Mock the pool.query method
jest.mock("../../config/db", () => ({
    query: jest.fn(),
}));

describe("deletePlayerService() deletePlayerService method", () => {
    // Happy Path Tests
    describe("Happy Path", () => {
        it("should delete a player and return the deleted player data when a valid ID is provided", async () => {
            // Arrange: Set up the mock to return a successful deletion result
            const mockId = 1;
            const mockResult = {
                id: mockId,
                username: "testuser",
                email: "test@example.com",
            };
            pool.query.mockResolvedValueOnce({ rows: [mockResult] });

            // Act: Call the deletePlayerService function
            const result = await deletePlayerService(mockId);

            // Assert: Verify the result and that the query was called correctly
            expect(result).toEqual(mockResult);
            expect(pool.query).toHaveBeenCalledWith(
                "DELETE FROM players WHERE id = $1",
                [mockId]
            );
        });
    });

    // Edge Case Tests
    describe("Edge Cases", () => {
        it("should return undefined when trying to delete a player with a non-existent ID", async () => {
            // Arrange: Set up the mock to return an empty result
            const nonExistentId = 999;
            pool.query.mockResolvedValueOnce({ rows: [] });

            // Act: Call the deletePlayerService function
            const result = await deletePlayerService(nonExistentId);

            // Assert: Verify the result is undefined
            expect(result).toBeUndefined();
            expect(pool.query).toHaveBeenCalledWith(
                "DELETE FROM players WHERE id = $1",
                [nonExistentId]
            );
        });

        it("should handle database errors gracefully", async () => {
            // Arrange: Set up the mock to throw an error
            const mockId = 1;
            const mockError = new Error("Database error");
            pool.query.mockRejectedValueOnce(mockError);

            // Act & Assert: Call the deletePlayerService function and expect it to throw
            await expect(deletePlayerService(mockId)).rejects.toThrow(
                "Database error"
            );
            expect(pool.query).toHaveBeenCalledWith(
                "DELETE FROM players WHERE id = $1",
                [mockId]
            );
        });

        it("should handle invalid ID input gracefully", async () => {
            // Arrange: Set up the mock to return an empty result
            const invalidId = null;
            pool.query.mockResolvedValueOnce({ rows: [] });

            // Act: Call the deletePlayerService function
            const result = await deletePlayerService(invalidId);

            // Assert: Verify the result is undefined
            expect(result).toBeUndefined();
            expect(pool.query).toHaveBeenCalledWith(
                "DELETE FROM players WHERE id = $1",
                [invalidId]
            );
        });
    });
});

// End of unit tests for: deletePlayerService
