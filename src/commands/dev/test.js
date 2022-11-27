const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`test`)
    .setDescription(`Test slash commands`),

  async execute(interaction) {
    await interaction.reply(`It works!`);
  },
};