const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`remove`)
    .setDescription(`Remove a song from queue`)
    .addStringOption(option =>
      option
        .setName(`song`)
        .setDescription(`The name/url of the track you want to remove`)
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName(`number`)
        .setDescription(`The place in the queue the song is in`)
        .setRequired(false)
    ),

  async execute({ interaction }) {
    const number = interaction.options.getNumber("number");
    const track = interaction.options.getString("song");

    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });
    if (!track && !number)
      interaction.reply({
        content: `❌ | You have to use one of the options to remove a song ${interaction.member}`,
        ephemeral: true,
      });

    if (track) {
      for (let song of queue.tracks) {
        if (song.title === track || song.url === track) {
          queue.remove(song);
          return interaction.reply({
            content: `✅ | Removed ${track} from the queue`,
          });
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
          content: `❌ | This track does not seem to exist ${interaction.member}`,
          ephemeral: true,
        });

      queue.remove(index);

      return interaction.reply({
        content: `✅ | Removed ${trackname} from the queue`,
      });
    }
  },
};
