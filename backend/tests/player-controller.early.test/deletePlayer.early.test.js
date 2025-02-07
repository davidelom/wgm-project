// Unit tests for: deletePlayer

const { deletePlayer } = require("../../controllers/player-controller");
const { deletePlayerService } = require("../../models/player-model");

// Import necessary modules and functions
// Mock the necessary services
jest.mock("../../models/player-model", () => {
    const originalModule = jest.requireActual("../../models/player-model");
    return {
        __esModule: true,
        ...originalModule,
        deletePlayerService: jest.fn(),
    };
});

// Mock the response object
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mock the next function
const mockNext = jest.fn();

describe("deletePlayer() deletePlayer method", () => {
    let req;
    let res;

    beforeEach(() => {
        req = { params: { id: "123" } };
        res = mockResponse();
        mockNext.mockClear();
    });

    describe("Happy Paths", () => {
        it("should delete a player successfully and return a 200 status", async () => {
            // Arrange: Set up the mock to resolve successfully
            deletePlayerService.mockResolvedValue({
                id: "123",
                username: "testuser",
            });

            // Act: Call the deletePlayer function
            await deletePlayer(req, res, mockNext);

            // Assert: Check that the response is correct
            expect(deletePlayerService).toHaveBeenCalledWith("123");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Player deleted successfully",
                data: { id: "123", username: "testuser" },
            });
        });
    });

    describe("Edge Cases", () => {
        it("should handle errors thrown by deletePlayerService", async () => {
            // Arrange: Set up the mock to reject with an error
            const error = new Error("Database error");
            deletePlayerService.mockRejectedValue(error);

            // Act: Call the deletePlayer function
            await deletePlayer(req, res, mockNext);

            // Assert: Check that the error is passed to the next function
            expect(deletePlayerService).toHaveBeenCalledWith("123");
            expect(mockNext).toHaveBeenCalledWith(error);
        });

        it("should handle the case where no player is found to delete", async () => {
            // Arrange: Set up the mock to resolve with null
            deletePlayerService.mockResolvedValue(null);

            // Act: Call the deletePlayer function
            await deletePlayer(req, res, mockNext);

            // Assert: Check that the response is correct
            expect(deletePlayerService).toHaveBeenCalledWith("123");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Player deleted successfully",
                data: null,
            });
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
});

// End of unit tests for: deletePlayer
