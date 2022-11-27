const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");
const { truncateSync } = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`dump`)
    .setDescription(`Used for debugging`)
    .addStringOption((option) =>
      option.setName("target").setDescription("The target").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, client) {
    const target = interaction.options.getString(`target`);
    console.log(target) = function(d) { //
      log_file.write(util.format(d) + '\n');
      log_stdout.write(util.format(d) + '\n');
    };
    await interaction.reply(`Sorry, this command is not finshed.`);
  },
};
