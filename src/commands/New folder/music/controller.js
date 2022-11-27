const {
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder
} = require("discord.js");

  module.exports = {
    voiceChannel: false,
    data: new SlashCommandBuilder()
      .setName(`controller`)
      .setDescription(`Set controller channel`)
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .addChannelOption(option =>
        option
          .setName('channel')
          .setDescription('The channel you want to send to')
          .setRequired(true)),

  async execute({ interaction, client }) {
    let Channel = interaction.options.getChannel("channel");
    if (Channel.type !== 0)
      return interaction.reply({
        content: `❌ | You have to send it to a text channel`,
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setTitle("control your music from the buttons below")
      .setImage(interaction.guild.iconURL({ size: 4096, dynamic: true }))
      .setColor("#36393e");

    interaction.reply({
      content: `✅ | Sending controller to ${Channel}`,
      ephemeral: true,
    });

    const back = new ButtonBuilder()
      .setLabel("Back")
      .setCustomId(JSON.stringify({ ffb: "back" }))
      .setStyle("Primary");

    const skip = new ButtonBuilder()
      .setLabel("Skip")
      .setCustomId(JSON.stringify({ ffb: "skip" }))
      .setStyle("Primary");

    const resumepause = new ButtonBuilder()
      .setLabel("Resume & Pause")
      .setCustomId(JSON.stringify({ ffb: "resume&pause" }))
      .setStyle("Danger");

    const save = new ButtonBuilder()
      .setLabel("Save")
      .setCustomId(JSON.stringify({ ffb: "savetrack" }))
      .setStyle("Success");

    const volumeup = new ButtonBuilder()
      .setLabel("Volume up")
      .setCustomId(JSON.stringify({ ffb: "volumeup" }))
      .setStyle("Primary");

    const volumedown = new ButtonBuilder()
      .setLabel("Volume Down")
      .setCustomId(JSON.stringify({ ffb: "volumedown" }))
      .setStyle("Primary");

    const loop = new ButtonBuilder()
      .setLabel("Loop")
      .setCustomId(JSON.stringify({ ffb: "loop" }))
      .setStyle("Danger");

    const np = new ButtonBuilder()
      .setLabel("Now Playing")
      .setCustomId(JSON.stringify({ ffb: "nowplaying" }))
      .setStyle("Secondary");

    const queuebutton = new ButtonBuilder()
      .setLabel("Queue")
      .setCustomId(JSON.stringify({ ffb: "queue" }))
      .setStyle("Secondary");

    const row1 = new ActionRowBuilder().addComponents(
      back,
      queuebutton,
      resumepause,
      np,
      skip
    );
    const row2 = new ActionRowBuilder().addComponents(
      volumedown,
      loop,
      save,
      volumeup
    );

    Channel.send({ embeds: [embed], components: [row1, row2] });
  },
};
