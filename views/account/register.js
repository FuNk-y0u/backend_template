const { SALT_ROUNDS, DEF_ACC_TYPE } = require("../../const");
const { bcrypt, jwt, prisma, app } = require("../../includes");

const register = async (request, response) => {
  var body = request.body;

  // Fetching the user from data base
  var user = await prisma.User.findUnique({
    where: {
      email: body.email,
    },
  });

  // Checking if user exists or not
  if (!user) {
    // if exists
    var hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);

    await prisma.User.create({
      data: {
        email: body.email,
        firstname: body.firstname,
        middlename: body.middlename,
        lastname: body.lastname,
        password: hashedPassword,
        accountTypeCode: DEF_ACC_TYPE,
      },
    });

    // returning sucess response
    response.status(200).send(
      JSON.stringify({
        message: "Account sucessfully registered",
      })
    );
    return;
  } else {
    // returning error response
    response.status(200).send(
      JSON.stringify({
        message: "Account with same email already exists",
      })
    );
  }
};

module.exports = register;
