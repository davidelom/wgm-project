// Unit tests for: getAllPlayers

const { getAllPlayers } = require("../../controllers/player-controller");
const { getAllPlayersService } = require("../../models/player-model");

// Import necessary modules and functions
// Mock the necessary services
jest.mock("../../models/player-model", () => {
    const originalModule = jest.requireActual("../../models/player-model");
    return {
        __esModule: true,
        ...originalModule,
        getAllPlayersService: jest.fn(),
    };
});

// Mock response object
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mock next function
const mockNext = jest.fn();

describe("getAllPlayers() getAllPlayers method", () => {
    let res;
    let next;

    beforeEach(() => {
        res = mockResponse();
        next = mockNext;
    });

    describe("Happy Paths", () => {
        it("should return a list of players when players exist", async () => {
            // Arrange
            const players = [
                {
                    id: 1,
                    username: "Player1",
                    email: "player1@example.com",
                    password: "hashedPassword1",
                },
                {
                    id: 2,
                    username: "Player2",
                    email: "player2@example.com",
                    password: "hashedPassword2",
                },
            ];
            getAllPlayersService.mockResolvedValue(players);

            // Act
            await getAllPlayers({}, res, next);

            // Assert
            expect(getAllPlayersService).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Players fetched successfully",
                data: [
                    {
                        id: 1,
                        username: "Player1",
                        email: "player1@example.com",
                    },
                    {
                        id: 2,
                        username: "Player2",
                        email: "player2@example.com",
                    },
                ],
            });
        });
    });

    describe("Edge Cases", () => {
        it("should return 404 when no players are found", async () => {
            // Arrange
            getAllPlayersService.mockResolvedValue([]);

            // Act
            await getAllPlayers({}, res, next);

            // Assert
            expect(getAllPlayersService).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 404,
                message: "No players found",
                data: null,
            });
        });

        it("should call next with an error when an exception is thrown", async () => {
            // Arrange
            const error = new Error("Database error");
            getAllPlayersService.mockRejectedValue(error);

            // Act
            await getAllPlayers({}, res, next);

            // Assert
            expect(getAllPlayersService).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
});

// End of unit tests for: getAllPlayers
