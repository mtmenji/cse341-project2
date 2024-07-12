const validator = require('../helpers/validate');

const bookCheck = (req, res, next) => {
    console.log(`TEST 0.00: ${JSON.stringify(req.body)}`);
    const validationRule = {
        title: 'required|string',
        author: 'required|string',
        publicationYear: 'required|string'
    };
    console.log(`TEST 0: ${req.body}`);
    console.log(`Test 0.5: ${JSON.stringify(req.body)}`);
    validator(req.body, validationRule, {}, (err, status) => {
        console.log(`TEST 4: ${req.body}`);
        console.log(`Test 4.5: ${JSON.stringify(req.body)}`);
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