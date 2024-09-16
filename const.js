const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

// Account code ids
const SUPER_ADMIN = 0;
const COMAPNY = 1;
const PARTNER = 2;
const CUSTOMER = 3;

// sets default new account type to customer
const DEF_ACC_TYPE = CUSTOMER;

module.exports = {
  SALT_ROUNDS,
  JWT_TOKEN_SECRET,
  SUPER_ADMIN,
  COMAPNY,
  PARTNER,
  CUSTOMER,
  DEF_ACC_TYPE,
};
