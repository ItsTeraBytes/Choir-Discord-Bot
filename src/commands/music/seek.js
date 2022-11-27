const ms = require("ms");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`seek`)
    .setDescription(`Skip back or forward in a song`)
    .addStringOption((option) =>
      option
        .setName(`time`)
        .setDescription(`Time you want to skip to`)
        .setRequired(true)
    ),

  async execute({ interaction }) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.reply}`,
        ephemeral: true,
      });

    const timeToMS = ms(interaction.options.getString("time"));

    if (timeToMS >= queue.current.durationMS)
      return interaction.reply({
        content: `❌ | The indicated time is higher than the total time of the current song ${interaction.member}\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`,
        ephemeral: true,
      });

    await queue.seek(timeToMS);

    interaction.reply({
      content: `✅ | Time set on the current song **${ms(timeToMS, {
        long: true,
      })}**`,
    });
  },
};
