const client = require("../..");
const mongoose = require("mongoose");

client.on("ready", () => {
  console.log(`${client.user.tag} is ready!`);

  if (client.config.database === "") {
    console.log("No database specified, exiting...");
    process.exit(0);
  }
  mongoose
    .connect(client.config.database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database!");
    });
});
