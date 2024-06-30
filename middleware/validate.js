const validator = require('../helpers/validate');

const bookCheck = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        author: 'required|string',
        publicationYear: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    bookCheck
};