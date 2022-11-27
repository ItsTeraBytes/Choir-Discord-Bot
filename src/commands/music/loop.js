const { QueueRepeatMode } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`loop`)
    .setDescription(`Enable or disable looping of song's or the whole queue`)
    .addStringOption(option =>
      option
        .setName(`action`)
        .setDescription(`What action you want to preform on the loop?`)
        .setRequired(true)
        .addChoices(
          { name: "Queue", value: "enable_loop_queue" },
          { name: "Disable", value: "disable_loop" },
          { name: "Song", value: "enable_loop_song" }
        )
    ),

  async execute({ interaction }) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });
    switch (
      interaction.options._hoistedOptions.map((x) => x.value).toString()
    ) {
      case "enable_loop_queue": {
        if (queue.repeatMode === 1)
          return interaction.reply({
            content: `❌ | You must first disable the current music in the loop mode (/loop Disable) ${interaction.member}`,
            ephemeral: true,
          });

        const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);

        return interaction.reply({
          content: success
            ? `✅ | The music queue will now loop forever`
            : `❌ | Something went wrong ${interaction.member}`,
        });
        break;
      }
      case "disable_loop": {
        const success = queue.setRepeatMode(QueueRepeatMode.OFF);

        return interaction.reply({
          content: success
            ? `✅ | The song will now not loop`
            : `❌ | Something went wrong ${interaction.member}`,
        });
        break;
      }
      case "enable_loop_song": {
        if (queue.repeatMode === 2)
          return interaction.reply({
            content: `❌ | You must first disable the current music in the loop mode (/loop Disable) ${interaction.member}`,
            ephemeral: true,
          });

        const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

        return interaction.reply({
          content: success
            ? `✅ | The song will now loop forever\nYou can stop it with /loop disable`
            : `❌ | Something went wrong ${interaction.member}`,
        });
        break;
      }
    }
  },
};
