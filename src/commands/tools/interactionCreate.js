module.exports = {
  name: `interactionCreate`,
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = command.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `
          Opps, something went wrong and connnot execute this command!\n
          If it persist, please contact the bot developer. Error code: CMD_INTERACTIONCREATE_FAIL
          `,
          ephemeral: true,
        });
      }
    }
  },
};
