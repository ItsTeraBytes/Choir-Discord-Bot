const config = require(`../../config.json`);
const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`clear`)
    .setDescription(`Clear all music in the queue`),

  async execute({ interaction }) {
    const queue = player.getQueue(config.GUILD_ID);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: `✅ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });

    if (!queue.tracks[0])
      return interaction.reply({
        content: `✅ | No music in the queue after the current one ${interaction.member}`,
        ephemeral: true,
      });

    await queue.clear();

    interaction.reply(`✅ | The queue has just been cleared 🗑️`);
  },
};
