// Unit tests for: updatePlayer

const { updatePlayer } = require("../../controllers/player-controller");
const {
    getPlayerByIdService,
    updatePlayerService,
} = require("../../models/player-model");
const bcrypt = require("bcrypt");

jest.mock("../../models/player-model");
jest.mock("bcrypt");

describe("updatePlayer() updatePlayer method", () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: { id: "1" },
            body: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe("Happy paths", () => {
        it("should update player successfully with valid username and email", async () => {
            // Arrange
            req.body = {
                username: "newUsername",
                email: "newEmail@example.com",
            };
            const player = {
                id: "1",
                username: "oldUsername",
                email: "oldEmail@example.com",
            };
            getPlayerByIdService.mockResolvedValue(player);
            updatePlayerService.mockResolvedValue({ ...player, ...req.body });

            // Act
            await updatePlayer(req, res, next);

            // Assert
            expect(getPlayerByIdService).toHaveBeenCalledWith("1");
            expect(updatePlayerService).toHaveBeenCalledWith("1", req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Player updated successfully",
                data: {
                    id: "1",
                    username: "newUsername",
                    email: "newEmail@example.com",
                },
            });
        });

        it("should update player successfully with valid password", async () => {
            // Arrange
            req.body = { password: "newPassword" };
            const player = {
                id: "1",
                username: "oldUsername",
                email: "oldEmail@example.com",
            };
            getPlayerByIdService.mockResolvedValue(player);
            bcrypt.genSalt.mockResolvedValue("salt");
            bcrypt.hash.mockResolvedValue("hashedPassword");
            updatePlayerService.mockResolvedValue({
                ...player,
                password: "hashedPassword",
            });

            // Act
            await updatePlayer(req, res, next);

            // Assert
            expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
            expect(bcrypt.hash).toHaveBeenCalledWith("newPassword", "salt");
            expect(updatePlayerService).toHaveBeenCalledWith("1", {
                password: "hashedPassword",
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                message: "Player updated successfully",
                data: {
                    id: "1",
                    username: "oldUsername",
                    email: "oldEmail@example.com",
                },
            });
        });
    });

    describe("Edge cases", () => {
        it("should return 404 if player is not found", async () => {
            // Arrange
            getPlayerByIdService.mockResolvedValue(null);

            // Act
            await updatePlayer(req, res, next);

            // Assert
            expect(getPlayerByIdService).toHaveBeenCalledWith("1");
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 404,
                message: "Player not found",
                data: null,
            });
        });

        it("should return 400 if password is empty", async () => {
            // Arrange
            req.body = { password: " " };
            const player = {
                id: "1",
                username: "oldUsername",
                email: "oldEmail@example.com",
            };
            getPlayerByIdService.mockResolvedValue(player);

            // Act
            await updatePlayer(req, res, next);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: 400,
                message: "Le mot de passe ne peut pas être vide",
                data: null,
            });
        });

        it("should return 400 if no fields to update", async () => {
            // Arrange
            const player = {
                id: "1",
                username: "oldUsername",
                email: "oldEmail@example.com",
            };
            getPlayerByIdService.mockResolvedValue(player);

            // Act
            await updatePlayer(req, res, next);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: 400,
                message: "Aucune donnée à mettre à jour",
                data: null,
            });
        });

        it("should call next with error if an exception occurs", async () => {
            // Arrange
            const error = new Error("Database error");
            getPlayerByIdService.mockRejectedValue(error);

            // Act
            await updatePlayer(req, res, next);

            // Assert
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
});

// End of unit tests for: updatePlayer
