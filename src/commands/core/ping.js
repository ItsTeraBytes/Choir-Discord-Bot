const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
  voiceChannel : false,
  data: new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription(`Returns my ping`),

  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true
    });
    
    const newMessage = `**__API Latency:__** **${client.ws.ping}**\n**__Client Ping:__** **${message.createdTimestamp - interaction.createdTimestamp}**`

    await interaction.editReply({
      content: newMessage
    });
  },
};