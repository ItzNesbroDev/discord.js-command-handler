const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);

/*
 * @param {Client} client
 */

module.exports = async (client) => {
  // commands handler
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((f) => {
    // f stands for file
    const file = require(f);
    const splitted = f.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  });

  // events handler
  const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
  eventFiles.map((f) => require(f));

  // slashCommands handler
  const slashCommandFiles = await globPromise(
    `${process.cwd()}/slashCommands/**/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommandFiles.map((f) => {
    const file = require(f);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  client.on("ready", async () => {
    const config = require("../botconfig/config.json");
    await client.guilds.cache
      .get(config.testGuildID)
      .commands.set(arrayOfSlashCommands);

    // if you want to register slashCommands for global uncomment this line
    // await client.application.commands.set(arrayOfSlashCommands);
  });
};
