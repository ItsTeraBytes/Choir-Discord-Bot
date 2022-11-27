const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  voiceChannel: true,
  data: new SlashCommandBuilder()
    .setName(`filter`)
    .setDescription(`Filter you want to add`)
    .addStringOption((option) =>
      option
        .setName(`filter`)
        .setDescription(`Filter you want to add`)
        .setRequired(true)
        .addChoices(
          ...Object.keys(require("discord-player").AudioFilters.filters)
            .map((m) => Object({ name: m, value: m }))
            .splice(0, 25)
        )
    ),

  async execute({ interaction, client }) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: `❌ | No music currently playing ${interaction.member}`,
        ephemeral: true,
      });

    const actualFilter = queue.getFiltersEnabled()[0];

    const infilter = interaction.options.getString("filter");

    const filters = [];

    queue.getFiltersEnabled().map((x) => filters.push(x));
    queue.getFiltersDisabled().map((x) => filters.push(x));

    const filter = filters.find(
      (x) => x.toLowerCase() === infilter.toLowerCase()
    );

    if (!filter)
      return interaction.reply({
        content: `❌ | This filter doesn't exist ${interaction.member}\n${
          actualFilter ? `Filter currently active ${actualFilter}.\n` : ""
        }List of available filters ${filters
          .map((x) => `**${x}**`)
          .join(", ")}.`,
        ephemeral: true,
      });

    const filtersUpdated = {};

    filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter)
      ? false
      : true;

    await queue.setFilters(filtersUpdated);

    interaction.reply({
      content: `✅ | The filter ${filter} is now **${
        queue.getFiltersEnabled().includes(filter) ? "enabled" : "disabled"
      }**\n*NOTE: The longer the music is, the longer this will take.*`,
    });
  },
};
