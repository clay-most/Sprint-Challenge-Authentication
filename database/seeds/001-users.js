exports.seed = function(knex) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        { username: "Frodo", password: "chozen1" },
        { username: "Sam", password: "1/2wise" },
        { username: "Pippin", password: "fool0Took" }
      ]);
    });
};
