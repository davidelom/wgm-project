// Unit tests for: validatePlayer

const { validatePlayer } = require("../../middlewares/inputValidator");
describe("validatePlayer() validatePlayer method", () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    // Happy Path Tests
    describe("Happy Paths", () => {
        test("should call next() when valid data is provided", () => {
            // Arrange: Set up valid request body
            req.body = {
                username: "validUser",
                email: "valid@example.com",
                password: "validPass123",
            };

            // Act: Call the middleware
            validatePlayer(req, res, next);

            // Assert: Ensure next() is called and no error response is sent
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    // Edge Case Tests
    describe("Edge Cases", () => {
        test("should return 400 if username is missing", () => {
            // Arrange: Set up request body with missing username
            req.body = {
                email: "valid@example.com",
                password: "validPass123",
            };

            // Act: Call the middleware
            validatePlayer(req, res, next);

            // Assert: Ensure 400 response is sent with appropriate error message
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: 400,
                message: expect.stringContaining('"username" is required'),
                data: null,
            });
            expect(next).not.toHaveBeenCalled();
        });

        test("should return 400 if email is invalid", () => {
            // Arrange: Set up request body with invalid email
            req.body = {
                username: "validUser",
                email: "invalid-email",
                password: "validPass123",
            };

            // Act: Call the middleware
            validatePlayer(req, res, next);

            // Assert: Ensure 400 response is sent with appropriate error message
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: 400,
                message: expect.stringContaining(
                    '"email" must be a valid email'
                ),
                data: null,
            });
            expect(next).not.toHaveBeenCalled();
        });

        test("should return 400 if password is too short", () => {
            // Arrange: Set up request body with short password
            req.body = {
                username: "validUser",
                email: "valid@example.com",
                password: "short",
            };

            // Act: Call the middleware
            validatePlayer(req, res, next);

            // Assert: Ensure 400 response is sent with appropriate error message
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: 400,
                message: expect.stringContaining(
                    '"password" length must be at least 8 characters long'
                ),
                data: null,
            });
            expect(next).not.toHaveBeenCalled();
        });

        test("should return 400 if all fields are missing", () => {
            // Arrange: Set up request body with all fields missing
            req.body = {};

            // Act: Call the middleware
            validatePlayer(req, res, next);

            // Assert: Ensure 400 response is sent with appropriate error message
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: 400,
                message: expect.stringContaining('"username" is required'),
                data: null,
            });
            expect(next).not.toHaveBeenCalled();
        });
    });
});

// End of unit tests for: validatePlayer
