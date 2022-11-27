const { QueryType } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`playnext`)
    .setDescription(`Song you want to playnext`)
    .addStringOption((option) =>
      option
        .setName(`song`)
        .setDescription(`The song you want to playnext`)
        .setRequired(true)
    ),

  async execute({ interaction }) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });

    const song = interaction.options.getString("song");

    const res = await player.search(song, {
      requestedBy: interaction.member,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length)
      return interaction.reply({
        content: `❌ | No results found ${interaction.member}`,
        ephemeral: true,
      });

    if (res.playlist)
      return interaction.reply({
        content: `❌ | This command does not support playlist's ${interaction.member}`,
        ephemeral: true,
      });

    queue.insert(res.tracks[0], 0);

    await interaction.reply({
      content: `✅ | Track has been aded into the queue`,
    });
  },
};
