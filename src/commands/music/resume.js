module.exports = {
  name: "resume",
  description: "play the track",
  voiceChannel: true,

  execute({ interaction }) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });

    if (!queue.connection.paused)
      return interaction.reply({
        content: `❌ | The track is already running, ${interaction.member}`,
        ephemeral: true,
      });

    const success = queue.setPaused(false);

    return interaction.reply({
      content: success
        ? `✅ | Current music ${queue.current.title} resumed ✅`
        : `❌ | Something went wrong ${interaction.member}`,
    });
  },
};
