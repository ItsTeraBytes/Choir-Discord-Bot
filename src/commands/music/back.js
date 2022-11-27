const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`back`)
    .setDescription(`Go back to the song before`),

  async execute({ interaction }) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });

    if (!queue.previousTracks[1])
      return interaction.reply({
        content: `❌ | There was no music played before ${interaction.member}`,
        ephemeral: true,
      });

    await queue.back();

    interaction.reply({ content: `✅ | Playing the **previous** track` });
  },
};
