const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "jump",
  description: "Jumps to particular track in queue",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the name/url of the track you want to jump to",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "number",
      description: "the place in the queue the song is in",
      type: ApplicationCommandOptionType.Number,
      required: false,
    },
  ],

  async execute({ interaction }) {
    const track = interaction.options.getString("song");
    const number = interaction.options.getNumber("number");

    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });
    if (!track && !number)
      interaction.reply({
        content: `❌ | You have to use one of the options to jump to a song ${interaction.member}`,
        ephemeral: true,
      });

    if (track) {
      for (let song of queue.tracks) {
        if (song.title === track || song.url === track) {
          queue.skipTo(song);
          return interaction.reply({ content: `✅ | Skiped to ${track}` });
        }
      }
      return interaction.reply({
        content: `❌ | Could not find ${track} ${interaction.member}\nTry using the url or the full name of the song?`,
        ephemeral: true,
      });
    }
    if (number) {
      const index = number - 1;
      const trackname = queue.tracks[index].title;
      if (!trackname)
        return interaction.reply({
          content: `❌ | This track dose not seem to exist ${interaction.member}`,
          ephemeral: true,
        });
      queue.skipTo(index);
      return interaction.reply({ content: `✅ | Jumped to ${trackname} ` });
    }
  },
};
