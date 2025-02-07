// Unit tests for: registerPlayer

const { registerPlayer } = require("../../controllers/player-controller");
const {
    createPlayerService,
    getPlayerByEmailService,
} = require("../../models/player-model");

jest.mock("../../models/player-model");
const httpMocks = require("node-mocks-http");

describe("registerPlayer() registerPlayer method", () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    describe("Happy Paths", () => {
        it("should create a new player when email does not exist", async () => {
            // Arrange
            req.body = {
                username: "testuser",
                email: "test@example.com",
                password: "password123",
            };
            getPlayerByEmailService.mockResolvedValue(null);
            createPlayerService.mockResolvedValue({
                id: 1,
                username: "testuser",
                email: "test@example.com",
            });

            // Act
            await registerPlayer(req, res, next);

            // Assert
            expect(getPlayerByEmailService).toHaveBeenCalledWith(
                "test@example.com"
            );
            expect(createPlayerService).toHaveBeenCalledWith(
                "testuser",
                "test@example.com",
                "password123"
            );
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toEqual({
                status: 201,
                message: "Player created successfully",
                data: {
                    id: 1,
                    username: "testuser",
                    email: "test@example.com",
                },
            });
        });
    });

    describe("Edge Cases", () => {
        it("should return 400 if email already exists", async () => {
            // Arrange
            req.body = {
                username: "testuser",
                email: "test@example.com",
                password: "password123",
            };
            getPlayerByEmailService.mockResolvedValue({
                id: 1,
                username: "existinguser",
                email: "test@example.com",
            });

            // Act
            await registerPlayer(req, res, next);

            // Assert
            expect(getPlayerByEmailService).toHaveBeenCalledWith(
                "test@example.com"
            );
            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({
                status: 400,
                message: "Email already exists, please login",
                data: null,
            });
            // expect(createPlayerService).not.toHaveBeenCalled();
        });

        it("should call next with an error if createPlayerService throws an error", async () => {
            // Arrange
            req.body = {
                username: "testuser",
                email: "test@example.com",
                password: "password123",
            };
            getPlayerByEmailService.mockResolvedValue(null);
            const error = new Error("Database error");
            createPlayerService.mockRejectedValue(error);

            // Act
            await registerPlayer(req, res, next);

            // Assert
            expect(getPlayerByEmailService).toHaveBeenCalledWith(
                "test@example.com"
            );
            expect(createPlayerService).toHaveBeenCalledWith(
                "testuser",
                "test@example.com",
                "password123"
            );
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
});

// End of unit tests for: registerPlayer
