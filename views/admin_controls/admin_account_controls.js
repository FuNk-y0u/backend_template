const { SUPER_ADMIN, SALT_ROUNDS, JWT_TOKEN_SECRET } = require("../../const");
const { bcrypt, jwt, prisma, app } = require("../../includes");

const admin_view_accounts = async (request, response) => {
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
      return;
    }
    // querying user data
    var user = await prisma.User.findUnique({
      where: {
        email: verified.email,
      },
      include: {
        accountType: true,
      },
    });

    if (user.accountType.id != SUPER_ADMIN) {
      response.status(401).send(
        JSON.stringify({
          message: "Invalid login session",
        })
      );
      return;
    }

    var users = await prisma.user.findMany({
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
    response.status(200).send(
      JSON.stringify({
        message: "Sucess",
        users: users,
      })
    );
    return;
  }
};

const admin_update_account = async (request, response) => {
  var body = request.body;
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
      return;
    }
    // querying user data
    var user = await prisma.User.findUnique({
      where: {
        email: verified.email,
      },
      include: {
        accountType: true,
      },
    });

    if (user.accountType.id != SUPER_ADMIN) {
      response.status(401).send(
        JSON.stringify({
          message: "Invalid login session",
        })
      );
      return;
    }

    // Fetching the user from data base
    var user = await prisma.User.findUnique({
      where: {
        id: body.id,
      },
    });

    // Checking if user exists or not
    if (!user) {
      // returning 404 response
      response.status(404).send(
        JSON.stringify({
          message: "Account account doesnot exist",
        })
      );
      return;
    } else {
      var hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);
      var upd_user = await prisma.User.update({
        where: {
          id: body.id,
        },
        data: {
          id: body.newId,
          email: body.email,
          firstname: body.firstname,
          middlename: body.middlename,
          lastname: body.lastname,
          password: hashedPassword,
          accountTypeCode: body.accountTypeCode,
        },
      });
      // returning error response
      response.status(200).send(
        JSON.stringify({
          message: "Account sucessfully updated",
        })
      );
    }
  }
};

const admin_delete_account = async (request, response) => {
  var body = request.body;
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
      return;
    }
    // querying user data
    var user = await prisma.User.findUnique({
      where: {
        email: verified.email,
      },
      include: {
        accountType: true,
      },
    });

    if (user.accountType.id != SUPER_ADMIN) {
      response.status(401).send(
        JSON.stringify({
          message: "Invalid login session",
        })
      );
      return;
    }

    // Fetching the user from data base
    var user = await prisma.User.findUnique({
      where: {
        id: body.id,
      },
    });

    // Checking if user exists or not
    if (!user) {
      // returning 404 response
      response.status(404).send(
        JSON.stringify({
          message: "Account account doesnot exist",
        })
      );
      return;
    } else {
      var del_user = await prisma.User.delete({
        where: {
          id: body.id,
        },
      });
      // returning error response
      response.status(200).send(
        JSON.stringify({
          message: "Account sucessfully deleted",
        })
      );
    }
  }
};

const admin_create_account = async (request, response) => {
  var body = request.body;
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
      return;
    }
    // querying user data
    var user = await prisma.User.findUnique({
      where: {
        email: verified.email,
      },
      include: {
        accountType: true,
      },
    });

    if (user.accountType.id != SUPER_ADMIN) {
      response.status(401).send(
        JSON.stringify({
          message: "Invalid login session",
        })
      );
      return;
    }

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
          accountTypeCode: body.accountTypeCode,
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
  }
};

module.exports = {
  admin_create_account,
  admin_delete_account,
  admin_update_account,
  admin_view_accounts,
};
