module.exports = async ({ interaction, queue }) => {
  if (!queue || !queue.playing)
    return interaction.reply({
      content: `❌ | No music is currently playing`,
      ephemeral: true,
    });

  if (!queue.previousTracks[1])
    return interaction.reply({
      content: `❌ | There was no music played before ${interaction.member}`,
      ephemeral: true,
    });

  await queue.back();

  interaction.reply({
    content: `✅ | Playing the **previous** track`,
    ephemeral: true,
  });
};
