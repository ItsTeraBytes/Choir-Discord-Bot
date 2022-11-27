const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`skip`)
    .setDescription(`Skip to another track`),

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
