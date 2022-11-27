const config = require(`../../config.json`);
const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`pause`)
    .setDescription(`Pauses the music`),

  async execute(interaction) {
    const queue = player.getQueue(config.GUILD_ID);

    if (!queue)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });

    if (queue.connection.paused)
      return interaction.reply({
        content: "The track is currently paused!",
        ephemeral: true,
      });

    if (queue.connection.paused)
      return interaction.reply({
        content: `❌ | The track is currently paused, ${interaction.member}`,
        ephemeral: true,
      });

    const success = queue.setPaused(true);

    return interaction.reply({
      content: success
        ? `✅ | Current music ${queue.current.title}`
        : `❌ | Something went wrong ${interaction.member}`,
    });
  },
};
