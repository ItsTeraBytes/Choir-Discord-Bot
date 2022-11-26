module.exports = {
  name: "skip",
  description: "stop the track",
  voiceChannel: true,

  execute({ interaction }) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });

    const success = queue.skip();

    return interaction.reply({
      content: success
        ? `✅ | Current music ${queue.current.title} skipped`
        : `❌ | Something went wrong ${interaction.member}`,
    });
  },
};
