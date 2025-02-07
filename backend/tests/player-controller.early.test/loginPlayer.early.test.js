// Unit tests for: loginPlayer

const { loginPlayer } = require("../../controllers/player-controller");
const { getPlayerByEmailService } = require("../../models/player-model");
const bcrypt = require("bcrypt");

jest.mock("../../models/player-model");
jest.mock("bcrypt");

describe("loginPlayer() loginPlayer method", () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                email: "test@example.com",
                password: "password123",
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe("Happy Paths", () => {
        it("should log in a player successfully with correct credentials", async () => {
            // Arrange
            const player = {
                id: 1,
                username: "testuser",
                email: "test@example.com",
                password: "hashedpassword",
            };
            getPlayerByEmailService.mockResolvedValue(player);
            bcrypt.compare.mockResolvedValue(true);

            // Act
            await loginPlayer(req, res, next);

            // Assert
            expect(getPlayerByEmailService).toHaveBeenCalledWith(
                "test@example.com"
            );
            expect(bcrypt.compare).toHaveBeenCalledWith(
                "password123",
                "hashedpassword"
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Player logged in successfully",
                data: {
                    id: player.id,
                    username: player.username,
                    email: player.email,
                },
            });
        });
    });

    describe("Edge Cases", () => {
        it("should return 404 if player is not found", async () => {
            // Arrange
            getPlayerByEmailService.mockResolvedValue(null);

            // Act
            await loginPlayer(req, res, next);

            // Assert
            expect(getPlayerByEmailService).toHaveBeenCalledWith(
                "test@example.com"
            );
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 404,
                message: "Player not found",
                data: null,
            });
        });

        it("should return 400 if password does not match", async () => {
            // Arrange
            const player = {
                id: 1,
                username: "testuser",
                email: "test@example.com",
                password: "hashedpassword",
            };
            getPlayerByEmailService.mockResolvedValue(player);
            bcrypt.compare.mockResolvedValue(false);

            // Act
            await loginPlayer(req, res, next);

            // Assert
            expect(getPlayerByEmailService).toHaveBeenCalledWith(
                "test@example.com"
            );
            expect(bcrypt.compare).toHaveBeenCalledWith(
                "password123",
                "hashedpassword"
            );
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: 400,
                message: "Invalid credentials",
                data: null,
            });
        });

        it("should call next with an error if an exception is thrown", async () => {
            // Arrange
            const error = new Error("Database error");
            getPlayerByEmailService.mockRejectedValue(error);

            // Act
            await loginPlayer(req, res, next);

            // Assert
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
});

// End of unit tests for: loginPlayer
