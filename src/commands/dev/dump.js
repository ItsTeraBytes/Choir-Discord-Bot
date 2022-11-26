const {
  ApplicationCommandOptionType,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  name: "dump",
  description: "Used for debugging",
  permissions: PermissionsBitField.Flags.Administrator,
  options: [
    {
      name: "target",
      description: "",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async execute(interaction, client) {
    const target = interaction.options.getString("target");
    const message = await interaction.deferReply({
        fetchReply: true
      });

    await interaction.editReply({
      content: target,
    });
  },
};
