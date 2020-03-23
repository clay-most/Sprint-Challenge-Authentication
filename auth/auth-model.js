const data = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

async function createUser(user) {
  user.password = await bcrypt.hashSync(user.password, 8);
  return data.insert(user).into("users");
}

function findByName(username) {
  return data("users")
    .select("id","username","password")
    .where("username", username)
    .first();
}

module.exports = { createUser, findByName };
