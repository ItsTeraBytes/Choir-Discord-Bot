const { EmbedBuilder, InteractionType } = require(`discord.js`);

module.exports = {
  name: `interactionCreate`,
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return/*
      interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("#ff0000")
              .setDescription(
                "Opps, I cannot find that command!\nIf it persist, please [report it here](https://github.com/ItsTeraBytes/Choir-Discord-Bot/issues)."
              ),
          ],
          ephemeral: true,
        });*/
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error); //If command found but failed to execute
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("#ff0000")
              .setDescription(
                "Uh-oh! Something went terribly wrong and connnot execute this command!\nIf it persist, please contact the bot developer."
              ),
          ],
          ephemeral: true,
        });
      }
      if (command.voiceChannel) {
        if (!interaction.member.voice.channel)
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor("#ff0000")
                .setDescription(
                  `❌ | Hold up! You are not in a Voice Channel.`
                ),
            ],
            ephemeral: true,
          });
        if (
          interaction.guild.members.me.voice.channel &&
          interaction.member.voice.channel.id !==
            interaction.guild.members.me.voice.channel.id
        )
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor("#ff0000")
                .setDescription(
                  `❌ | Hold up! You ned to be in the same Voice Channel to run that command.`
                ),
            ],
            ephemeral: true,
          });
      }
      /*await command.execute( interaction, client );
      if (interaction.type === InteractionType.MessageComponent) {
        const customId = JSON.parse(interaction.customId);
        const file_of_button = customId.ffb;
        const queue = player.getQueue(interaction.guildId);
        if (file_of_button) {
          delete require.cache[
            require.resolve(
              `../src/components/musicbuttons/${file_of_button}.js`
            )
          ];
          const button = require(`../src/components/musicbuttons/${file_of_button}.js`);
          if (button) return button({ client, interaction, customId, queue });
        }
      }*/
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customID } = interaction;
      const button = buttons.get(customID);
      if (!button) return new Error(`There is no code for this button!`);

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isSelectMenu()) {
      const { selectMenus } = client;
      const { customID } = interaction;
      const menu = selectMenus.get(customID);
      if (!menu) return new Error(`There is no code for this menu!`);

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customID } = interaction;
      const modal = modals.get(customID);
      if (!modal) return new Error(`There is no code for this modal!`);

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
