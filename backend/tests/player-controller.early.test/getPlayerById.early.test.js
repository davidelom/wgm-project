// Unit tests for: getPlayerById

const { getPlayerById } = require("../../controllers/player-controller");
const { getPlayerByIdService } = require("../../models/player-model");

jest.mock("../../models/player-model");

describe("getPlayerById() getPlayerById method", () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: { id: "1" } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe("Happy paths", () => {
        it("should return player data when player is found", async () => {
            // Arrange
            const player = {
                id: "1",
                username: "testuser",
                email: "test@example.com",
            };
            getPlayerByIdService.mockResolvedValue(player);

            // Act
            await getPlayerById(req, res, next);

            // Assert
            expect(getPlayerByIdService).toHaveBeenCalledWith("1");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Player retrieved successfully",
                data: {
                    id: "1",
                    username: "testuser",
                    email: "test@example.com",
                },
            });
        });
    });

    describe("Edge cases", () => {
        it("should return 404 when player is not found", async () => {
            // Arrange
            getPlayerByIdService.mockResolvedValue(null);

            // Act
            await getPlayerById(req, res, next);

            // Assert
            expect(getPlayerByIdService).toHaveBeenCalledWith("1");
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 404,
                message: "Player not found",
                data: null,
            });
        });

        it("should handle errors thrown by the service", async () => {
            // Arrange
            const error = new Error("Database error");
            getPlayerByIdService.mockRejectedValue(error);

            // Act
            await getPlayerById(req, res, next);

            // Assert
            expect(getPlayerByIdService).toHaveBeenCalledWith("1");
            expect(next).toHaveBeenCalledWith(error);
        });

        it("should handle invalid id format gracefully", async () => {
            // Arrange
            req.params.id = "invalid-id";
            getPlayerByIdService.mockResolvedValue(null);

            // Act
            await getPlayerById(req, res, next);

            // Assert
            expect(getPlayerByIdService).toHaveBeenCalledWith("invalid-id");
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 404,
                message: "Player not found",
                data: null,
            });
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
});

// End of unit tests for: getPlayerById
