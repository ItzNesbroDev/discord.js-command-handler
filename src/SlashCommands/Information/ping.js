const { Command } = require("../../Structures/Command/command");
const ee = require(`../../settings/config`).embed;

module.exports = new Command({
  name: "ping",
  description: "get bots ping",
  category: "Information",
  cooldown: 5,
  run: async ({ client, interaction, args, prefix }) => {
    interaction.followUp(`${client.ws.ping} \`Ms\`!`);
  },
});
