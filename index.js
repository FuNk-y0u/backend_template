const { app } = require("./includes");

// Including different endpoints
const register = require("./views/account/register");
const login = require("./views/account/login");
const session = require("./views/account/session");
const account_detail = require("./views/account/account_detail");

// including admin controls
const {
  admin_create_account,
  admin_delete_account,
  admin_update_account,
  admin_view_accounts,
} = require("./views/admin_controls/admin_account_controls");

// including product controls
const {
  product_add,
  product_update,
  product_delete,
  product_search,
  product_detail,
  product_list,
} = require("./views/product_controls/product_control");

// Account crud
app.post("/register", register);
app.post("/login", login);
app.post("/session", session);
app.get("/account_detail/:id", account_detail);

// SUPER_ADMIN crud
app.post("/admin_create_account", admin_create_account);
app.post("/admin_delete_account", admin_delete_account);
app.post("/admin_update_account", admin_update_account);
app.post("/admin_view_accounts", admin_view_accounts);

// Products crud
app.post("/product_add", product_add);
app.post("/product_update", product_update);
app.post("/product_delete", product_delete);
app.get("/product_search", product_search);
app.get("/product_detail/:id", product_detail);
app.get("/product_list", product_list);

app.listen(3000, () => {
  console.log("[NOTE] Server Started At localhost:3000");
});
