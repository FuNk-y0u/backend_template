const { JWT_TOKEN_SECRET } = require("../../const");
const { bcrypt, prisma, jwt } = require("../../includes");

const genLoginToken = (user) => {
  let data = {
    time: Date(),
    email: user.email,
    id: user.id,
  };
  let token = jwt.sign(data, JWT_TOKEN_SECRET);
  return token;
};

const login = async (request, response) => {
  var body = request.body;

  // Fetching the user
  var user = await prisma.User.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    response.status(200).send(
      JSON.stringify({
        message: "Please check your login credentials",
      })
    );
  } else {
    // Comparing hashed password
    var passCompare = await bcrypt.compare(body.password, user.password);

    if (passCompare == true) {
      let token = genLoginToken(user);
      response.status(200).send(
        JSON.stringify({
          message: `Success logging in`,
          token: `${token}`,
        })
      );
    } else {
      response.status(404).send(
        JSON.stringify({
          message: "Please check your login credentials",
        })
      );
    }
    return;
  }
};

module.exports = login;
