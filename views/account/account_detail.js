const { JWT_TOKEN_SECRET } = require("../../const");
const { bcrypt, prisma, jwt } = require("../../includes");

const account_detail = async (request, response) => {
  const id = parseInt(request.params.id);
  const result = await prisma.User.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      firstname: true,
      middlename: true,
      lastname: true,
      accountType: true,
      products: true,
      comments: true,
      ratings: true,
    },
  });
  if (!result) {
    response.status(404).send(
      JSON.stringify({
        message: "Account not found",
      })
    );
  } else {
    response.status(200).send(
      JSON.stringify({
        message: "Sucess",
        user: result,
      })
    );
  }
};

module.exports = account_detail;
