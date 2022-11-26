const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
  name: "search",
  description: "search a track",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the song you want to search",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async execute({ client, interaction }) {
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

    const queue = await player.createQueue(interaction.guild, {
      metadata: interaction.channel,
      leaveOnEnd: client.config.opt.leaveOnEnd,
    });
    const maxTracks = res.tracks.slice(0, 10);

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `Results for ${song}`,
        iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
      })
      .setDescription(
        `${maxTracks
          .map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`)
          .join("\n")}\n\nSelect choice between **1** and **${
          maxTracks.length
        }** or **cancel** ⬇️`
      )
      .setTimestamp();

    interaction.reply({ embeds: [embed] });

    const collector = interaction.channel.createMessageCollector({
      time: 15000,
      max: 1,
      errors: ["time"],
      filter: (m) => m.author.id === interaction.member.id,
    });

    collector.on("collect", async (query) => {
      if (query.content.toLowerCase() === "cancel")
        return (
          interaction.followUp({
            content: `✅ | Search cancelled`,
            ephemeral: true,
          }),
          collector.stop()
        );

      const value = parseInt(query);
      if (!value || value <= 0 || value > maxTracks.length)
        return interaction.followUp({
          content: `❌ | Invalid response, try a value between **1** and **${maxTracks.length}** or **cancel**`,
          ephemeral: true,
        });

      collector.stop();

      try {
        if (!queue.connection)
          await queue.connect(interaction.member.voice.channel);
      } catch {
        await player.deleteQueue(interaction.guildId);
        return interaction.followUp({
          content: `❌ | I can't join the voice channel ${interaction.member}`,
          ephemeral: true,
        });
      }

      await interaction.followUp(`✅ | Loading your search...`);

      queue.addTrack(res.tracks[query.content - 1]);

      if (!queue.playing) await queue.play();
    });

    collector.on("end", (msg, reason) => {
      if (reason === "time")
        return interaction.followUp({
          content: `❌ | Search timed out ${interaction.member}`,
          ephemeral: true,
        });
    });
  },
};
