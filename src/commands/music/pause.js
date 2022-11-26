module.exports = {
  name: "pause",
  description: "pause the track",
  voiceChannel: true,

  execute({ interaction }) {
    const queue = player.getQueue(interaction.guildId);

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
