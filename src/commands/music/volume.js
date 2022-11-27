const config = require(`../../config.json`);
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`volume`)
    .setDescription(`Adjust the volume`)
    .addNumberOption((option) =>
      option
        .setName(`volume`)
        .setDescription(`The desired volume`)
        .setRequired(false)
        .setMinValue(config.music.minVol)
        .setMaxValue(config.music.maxVol)
    ),

  async execute({ interaction }) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });
    const vol = interaction.options.getNumber("volume");

    if (queue.volume === vol)
      return interaction.reply({
        content: `❌ | The volume you want to change is already the current one ${interaction.member}`,
        ephemeral: true,
      });

    const success = queue.setVolume(vol);

    return interaction.reply({
      content: success
        ? `✅ | The volume has been modified to **${vol}**/**${maxVol}**%`
        : `❌ | Something went wrong ${interaction.member}`,
    });
  },
};
