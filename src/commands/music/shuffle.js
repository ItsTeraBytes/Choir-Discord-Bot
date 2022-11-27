const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`shuffle`)
    .setDescription(`Shuffle the track`),

  async execute({ interaction }) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });

    if (!queue.tracks[0])
      return interaction.reply({
        content: `❌ | No music in the queue after the current one ${interaction.member}`,
        ephemeral: true,
      });

    await queue.shuffle();

    if (queue.tracks.length === 1) {
      const success_message =
        "✅ | Queue shuffled **${queue.tracks.length}** song";
    } else {
      const success_message =
        "✅ | Queue shuffled **${queue.tracks.length}** songs";
    }

    return interaction.reply({
      content: success_message,
    });
  },
};
