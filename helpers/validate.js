const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
  console.log(`TEST 1: ${JSON.stringify(body)}`);
  const validation = new Validator(body, rules, customMessages);
  console.log(`TEST 3: ${validation}`);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;