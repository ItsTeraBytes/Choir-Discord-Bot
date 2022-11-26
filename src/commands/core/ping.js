//const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
  //data: new SlashCommandBuilder()
  name: 'ping',
  description: "Returns my ping",

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
