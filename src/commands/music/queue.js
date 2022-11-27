const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`queue`)
    .setDescription(`Get the list of songs in queue`),

  async execute({ client, interaction }) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });

    if (!queue.tracks[0])
      return interaction.reply({
        content: `❌ | No music in the queue after the current one ${interaction.member}`,
        ephemeral: true,
      });

    const methods = ["", "🔁", "🔂"];

    const songs = queue.tracks.length;

    const nextSongs =
      songs > 5
        ? `And **${songs - 5}** other song(s)...`
        : `In the playlist **${songs}** song(s)...`;

    const tracks = queue.tracks.map(
      (track, i) =>
        `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${
          track.requestedBy.username
        })`
    );

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }))
      .setAuthor({
        name: `Server queue - ${interaction.guild.name} ${
          methods[queue.repeatMode]
        }`,
        iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
      })
      .setDescription(
        `Current ${queue.current.title}\n\n${tracks
          .slice(0, 5)
          .join("\n")}\n\n${nextSongs}`
      )
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
