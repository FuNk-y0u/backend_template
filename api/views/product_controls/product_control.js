const {
  SUPER_ADMIN,
  SALT_ROUNDS,
  JWT_TOKEN_SECRET,
  CUSTOMER,
} = require("../../const");
const { bcrypt, jwt, prisma, app } = require("../../includes");

// TODO add pagination
const product_list = async (request, response) => {
  const results = await prisma.Product.findMany({
    include: {
      user: {
        select: {
          id: true,
          firstname: true,
          middlename: true,
          lastname: true,
          email: true,
        },
      },
      comments: true,
      ratings: true,
    },
  });
  if (!results) {
    response.status(404).send(
      JSON.stringify({
        message: "No products found",
      })
    );
  } else {
    response.status(200).send(
      JSON.stringify({
        message: "Sucess",
        products: results,
      })
    );
  }
};

const product_detail = async (request, response) => {
  const id = parseInt(request.params.id);
  const result = await prisma.Product.findUnique({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          id: true,
          firstname: true,
          middlename: true,
          lastname: true,
          email: true,
        },
      },
      comments: true,
      ratings: true,
    },
  });
  if (!result) {
    response.status(404).send(
      JSON.stringify({
        message: "No products found",
      })
    );
  } else {
    response.status(200).send(
      JSON.stringify({
        message: "Sucess",
        product: result,
      })
    );
  }
};

// TODO: add pagination
// TODO: add quality of life search features
const product_search = async (request, response) => {
  var search_query = request.query.search;

  const results = await prisma.Product.findMany({
    where: {
      name: {
        search: search_query,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          firstname: true,
          middlename: true,
          lastname: true,
          email: true,
        },
      },
      comments: true,
      ratings: true,
    },
  });

  if (!results) {
    response.status(404).send(
      JSON.stringify({
        message: "No products found",
      })
    );
  } else {
    response.status(200).send(
      JSON.stringify({
        message: "Sucess",
        products: results,
      })
    );
  }
};

const product_delete = async (request, response) => {
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
    if (user.accountType.id == CUSTOMER) {
      response.status(401).send(
        JSON.stringify({
          message: "Invalid login session",
        })
      );
      return;
    }

    // checking for product
    var product = await prisma.Product.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!product) {
      response.status(404).send(
        JSON.stringify({
          message: "Product with the id doesnot exists",
        })
      );
      return;
    }
    await prisma.Product.delete({
      where: {
        id: body.id,
      },
    });
    // returning sucess response
    response.status(200).send(
      JSON.stringify({
        message: "Product sucessfully deleted",
      })
    );
  }
};

const product_update = async (request, response) => {
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
    if (user.accountType.id == CUSTOMER) {
      response.status(401).send(
        JSON.stringify({
          message: "Invalid login session",
        })
      );
      return;
    }

    // checking for product
    var product = await prisma.Product.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!product) {
      response.status(404).send(
        JSON.stringify({
          message: "Product with the id doesnot exists",
        })
      );
      return;
    }
    await prisma.Product.update({
      where: {
        id: body.id,
      },
      data: {
        id: body.newId,
        name: body.name,
        userId: body.userId,
        price: body.price,
        brand: body.brand ? body.brand : "",
        details: body.details,
        image: body.image ? body.image : "",
      },
    });
    // returning sucess response
    response.status(200).send(
      JSON.stringify({
        message: "Product sucessfully updated",
      })
    );
  }
};

const product_add = async (request, response) => {
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
    if (user.accountType.id == CUSTOMER) {
      response.status(401).send(
        JSON.stringify({
          message: "Invalid login session",
        })
      );
      return;
    }
    await prisma.Product.create({
      data: {
        name: body.name,
        userId: user.id,
        price: body.price,
        brand: body.brand ? body.brand : "",
        details: body.details,
        image: body.image ? body.image : "",
      },
    });
    // returning sucess response
    response.status(200).send(
      JSON.stringify({
        message: "Product sucessfully registered",
      })
    );
  }
};

module.exports = {
  product_add,
  product_update,
  product_delete,
  product_search,
  product_detail,
  product_list,
};
