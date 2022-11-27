const config = require(`../../config.json`);
const { QueryType } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`play`)
    .setDescription(`Play a song!`)
    .addStringOption((option) =>
      option
        .setName(`song`)
        .setDescription(`The song you want to play now`)
        .setRequired(true)
    ),

  async execute(interaction) {
    const song = interaction.options.getString(`song`);
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
      spotifyBridge: config.music.spotifyBridge,
      initialVolume: config.music.defaultvolume,
      leaveOnEnd: config.music.leaveOnEnd,
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      await player.deleteQueue(interaction.guildId);
      return interaction.reply({
        content: `❌ | I can't join the voice channel ${interaction.member}`,
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: `✅ | Loading your ${res.playlist ? "playlist" : "track"}`,
    });

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
