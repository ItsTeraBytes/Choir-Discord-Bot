const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription(`Returns my ping`),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = new EmbedBuilder()
    .setTitle(`My ping!`)
    .setDescription(`**__API Latency:__** **${client.ws.ping}**\n **__Client Ping:__** **${message.createdTimestamp - interaction.createdTimestamp}**`)    
    .setColor(0x18e1ee)
    .setTimestamp()

    await interaction.reply({
      embeds: [newMessage]
    });
  },
};
