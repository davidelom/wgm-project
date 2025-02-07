const Joi = require("joi");

const playerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const validatePlayer = (req, res, next) => {
    const { error } = playerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
            data: null,
        });
    }
    next();
};

module.exports = { validatePlayer };
