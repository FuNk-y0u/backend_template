const { JWT_TOKEN_SECRET } = require("../../const");
const { jwt, prisma } = require("../../includes");
const session = async (request, response) => {
  // checking for login token
  if (!request.headers.authorization) {
    response.status(401).send(
      JSON.stringify({
        message: "Login session expired.",
      })
    );
  } else {
    var token = String(request.headers.authorization).split(" ")[1];
    var verified = jwt.verify(token, JWT_TOKEN_SECRET);
    if (!verified) {
      response.status(401).send(
        JSON.stringify({
          message: "Invalid login session",
        })
      );
    } else {
      // querying user data
      var user = await prisma.User.findUnique({
        where: {
          email: verified.email,
        },
        include: {
          accountType: true,
        },
      });

      response.status(200).send(
        JSON.stringify({
          message: "token successfully validated",
          email: user.email,
          id: user.id,
          firstname: user.firstname,
          middlename: user.middlename,
          lastname: user.lastname,
          accountType: user.accountType,
        })
      );
    }
    return;
  }
};

module.exports = session;
